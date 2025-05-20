const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/noticias", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, titulo, descricao, url, publicado_em FROM noticias_vikings ORDER BY publicado_em DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error.message);
    res.status(500).json({ erro: "Erro interno ao buscar notícias" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}/api/noticias`);
});
