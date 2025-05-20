# 📰 Vikings News

Um projeto full stack com frontend em React, backend em Node.js/Express, bot em Node.js para Telegram e banco de dados PostgreSQL. O sistema busca notícias sobre o time Minnesota Vikings via API pública e exibe no portal, além de notificar via bot no Telegram.

---

## 📦 Estrutura do Projeto

vikings-news/
├── bot/ # Bot Telegram em Node.js
├── api/ # API REST em Node.js/Express
├── vikings-news-portal/ # Frontend em React
├── docker-compose.yml # Orquestração dos containers
└── README.md


---

## 🚀 Tecnologias Utilizadas

- ⚛️ React (frontend)
- 🧠 Node.js + Express (API backend)
- 🤖 Node.js + Telegraf (bot Telegram)
- 🐘 PostgreSQL (banco de dados)
- 🐳 Docker + Docker Compose

---

## 🛠️ Requisitos

- Docker + Docker Compose
- Node.js 18+ (caso deseje rodar localmente sem Docker)

---

## 🐳 Como rodar com Docker


# Clone o projeto
```bash
git clone https://github.com/seu-usuario/vikings-news.git
cd vikings-news
```
# Inicie os containers
```bash
docker-compose up --build
```

O sistema subirá:

API em http://localhost:3001
Frontend em http://localhost:3000
Banco de dados PostgreSQL
Bot que envia notícias ao Telegram

Local: vikings-news-portal/
```bash
cd vikings-news-portal
npm install
npm start
```


Local: api/
```bash
cd api
npm install
npm start
```

A API expõe a rota:
GET /api/noticias

Local: bot/
```bash
cd bot
npm install
npm start
```

O bot consulta a NewsAPI e envia notícias para um canal ou grupo.

🛑 Variáveis de Ambiente
Configure as variáveis de ambiente nos serviços:

POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_HOST
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
NEWS_API_KEY


📌 To-Do
 Buscar notícias da NewsAPI
 Armazenar no PostgreSQL
 Servir via API REST
 Mostrar no portal React
 Enviar para Telegram via bot
 Deploy gratuito (Render, Vercel etc.)

👨‍💻 Autor
Desenvolvido por Micael (@ADev_HD) — apaixonado por TI, migrando da área de suporte para o desenvolvimento web com foco em back-end.
