const db = require('../config/database');

async function createReservation(reservationData) {
  const {
    firstName,
    lastName,
    email,
    date,
    time,
    guests,
    allergies,
  } = reservationData;

  const result = await db.query(
    `INSERT INTO reservations (
      first_name,
      last_name,
      email,
      reservation_date,
      reservation_time,
      guests,
      allergies
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      reservation_date AS "date",
      reservation_time AS "time",
      guests,
      allergies,
      status,
      created_at AS "createdAt"`,
    [firstName, lastName, email, date, time, guests, allergies || null],
  );

  return result.rows[0];
}

async function findAllReservations() {
  const result = await db.query(
    `SELECT
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      reservation_date AS "date",
      reservation_time AS "time",
      guests,
      allergies,
      status,
      created_at AS "createdAt"
    FROM reservations
    ORDER BY created_at DESC`,
  );

  return result.rows;
}

module.exports = {
  createReservation,
  findAllReservations,
};
