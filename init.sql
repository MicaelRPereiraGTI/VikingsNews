CREATE TABLE IF NOT EXISTS noticias_vikings (
  id SERIAL PRIMARY KEY,
  titulo TEXT UNIQUE NOT NULL,
  descricao TEXT,
  url TEXT,
  publicado_em TIMESTAMP DEFAULT NOW()
);