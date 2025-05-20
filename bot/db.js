// api/db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  database: process.env.POSTGRES_DB || 'noticias_vikings',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
