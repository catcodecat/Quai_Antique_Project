const db = require('../config/database');

async function findUserByEmail(email) {
  const result = await db.query(
    `SELECT
      id,
      first_name AS "firstName",
      last_name  AS "lastName",
      email,
      password_hash AS "passwordHash",
      role,
      created_at AS "createdAt"
    FROM users
    WHERE email = $1`,
    [email],
  );
  return result.rows[0] || null;
}

async function createUser({ firstName, lastName, email, passwordHash }) {
  const result = await db.query(
    `INSERT INTO users (first_name, last_name, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING
       id,
       first_name AS "firstName",
       last_name  AS "lastName",
       email,
       role,
       created_at AS "createdAt"`,
    [firstName, lastName, email, passwordHash],
  );
  return result.rows[0];
}

module.exports = { findUserByEmail, createUser };
