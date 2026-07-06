const reservationRepository = require('../repositories/reservation.repository');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_ALLERGIES_LENGTH = 500;

function isNonEmptyLimitedText(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

function isFutureDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const selectedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selectedDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate > today;
}

async function listReservations(req, res) {
  try {
    const reservations = await reservationRepository.findAllReservations();

    return res.json({
      message: 'Liste des reservations',
      reservations,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes('DATABASE_URL') || error.code === 'ECONNREFUSED') {
      return res.status(200).json({
        message: 'Route GET /api/reservations active, mais la base de donnees n est pas encore disponible',
        reservations: [],
      });
    }

    return res.status(500).json({
      message: 'Erreur lors de la recuperation des reservations',
    });
  }
}

async function createReservation(req, res) {
  const {
    firstName,
    lastName,
    email,
    date,
    time,
    guests,
    allergies,
  } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !guests) {
    return res.status(400).json({
      message: 'Tous les champs obligatoires doivent etre remplis',
      requiredFields: ['firstName', 'lastName', 'email', 'date', 'time', 'guests'],
    });
  }

  const guestCount = Number(guests);

  if (!isNonEmptyLimitedText(firstName, MAX_NAME_LENGTH) || !isNonEmptyLimitedText(lastName, MAX_NAME_LENGTH)) {
    return res.status(400).json({
      message: 'Le nom et le prenom doivent etre renseignes et limites a 100 caracteres',
    });
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim()) || email.trim().length > 255) {
    return res.status(400).json({
      message: 'Email invalide',
    });
  }

  if (!isFutureDate(date)) {
    return res.status(400).json({
      message: 'La date de reservation doit etre dans le futur',
    });
  }

  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5) {
    return res.status(400).json({
      message: 'Le nombre de personnes doit etre compris entre 1 et 5',
    });
  }

  if (allergies && (typeof allergies !== 'string' || allergies.length > MAX_ALLERGIES_LENGTH)) {
    return res.status(400).json({
      message: 'Le champ allergies doit etre limite a 500 caracteres',
    });
  }

  try {
    const reservation = await reservationRepository.createReservation({
      firstName,
      lastName,
      email: email.trim(),
      date,
      time,
      guests: guestCount,
      allergies: allergies ? allergies.trim() : allergies,
    });

    return res.status(201).json({
      message: 'Reservation enregistree',
      reservation,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes('DATABASE_URL') || error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        message: 'La base de donnees n est pas disponible pour le moment',
      });
    }

    return res.status(500).json({
      message: 'Erreur lors de l enregistrement de la reservation',
    });
  }
}

module.exports = {
  listReservations,
  createReservation,
};
