const reservationRepository = require('../repositories/reservation.repository');

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

  if (!Number.isInteger(guestCount) || guestCount <= 0) {
    return res.status(400).json({
      message: 'Le nombre de personnes doit etre un nombre entier positif',
    });
  }

  try {
    const reservation = await reservationRepository.createReservation({
      firstName,
      lastName,
      email,
      date,
      time,
      guests: guestCount,
      allergies,
    });

    return res.status(201).json({
      message: 'Reservation enregistree',
      reservation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erreur lors de l enregistrement de la reservation',
    });
  }
}

module.exports = {
  createReservation,
};
