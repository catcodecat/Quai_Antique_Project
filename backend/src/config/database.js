const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  : null;

function query(text, params) {
  if (!pool) {
    throw new Error('DATABASE_URL est manquant. La base de donnees n est pas configuree.');
  }

  return pool.query(text, params);
}

module.exports = {
  query,
  pool,
};
