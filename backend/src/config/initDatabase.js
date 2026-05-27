const db = require('./database');

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function createTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      guests INTEGER NOT NULL CHECK (guests > 0),
      allergies TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function initDatabase(retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await createTables();
      console.log('Base de donnees initialisee');
      return;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      console.log(`Base de donnees indisponible, nouvel essai ${attempt}/${retries}`);
      await wait(2000);
    }
  }
}

module.exports = initDatabase;
