const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");

const BOT_TOKEN = "7940481683:AAF0zUARALNXFAdne__gb6Djfqo9bott6cQ";
const NEWSAPI_KEY = "da6c787a3274432b976bf67fe287d967";
const bot = new Telegraf(BOT_TOKEN);
const db = require('./db');

let titulosEnviados = [];

async function buscarNoticiasNewsAPI() {
  const url = `https://newsapi.org/v2/everything?q="Minnesota Vikings"&sortBy=relevancy&language=en&domains=espn.com,cbssports.com,nfl.com&apiKey=${NEWSAPI_KEY}&pageSize=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || !data.articles.length) return [];

    const novasNoticias = data.articles.filter((noticia) => {
      return !titulosEnviados.includes(noticia.title);
    });

    novasNoticias.forEach((n) => titulosEnviados.push(n.title));
    titulosEnviados = titulosEnviados.slice(-20);
    const resultados = [];

    for (const noticia of novasNoticias) {
      await salvarNoticiaNoBanco(noticia);
      resultados.push(
        `📰 ${noticia.title}\n\n${noticia.description || ""}\n\nFonte: ${
          noticia.url
        }`
      );
    }

    return resultados;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error.message);
    return [];
  }
}

async function salvarNoticiaNoBanco(noticia) {
  try {
    await db.query(
      "INSERT INTO noticias_vikings (titulo, descricao, url) VALUES ($1, $2, $3) ON CONFLICT (titulo) DO NOTHING",
      [noticia.title, noticia.description, noticia.url]
    );
  } catch (error) {
    console.error("Erro ao salvar notícia no banco:", error.message);
  }
}

bot.command("vikings", async (ctx) => {
  ctx.reply("🔎 Buscando notícias recentes do Minnesota Vikings...");

  const noticias = await buscarNoticiasNewsAPI();

  if (noticias.length) {
    for (const noticiaTexto of noticias) {
      await ctx.reply(noticiaTexto);
    }
  } else {
    ctx.reply("⚠️ Nenhuma nova notícia encontrada.");
  }
});

setInterval(async () => {
  const noticias = await buscarNoticiasNewsAPI();
  if (noticias.length) {
    for (const noticiaTexto of noticias) {
      console.log("📢 Nova notícia encontrada:", noticiaTexto);
    }
  }
}, 10 * 60 * 1000);

bot.launch();
console.log("✅ Bot rodando com monitoramento automático dos Vikings");
