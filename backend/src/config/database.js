const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL est obligatoire pour connecter PostgreSQL');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  query,
  pool,
};
