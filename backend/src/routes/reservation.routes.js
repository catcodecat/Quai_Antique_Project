const express = require('express');

const {
  listReservations,
  createReservation,
} = require('../controllers/reservation.controller');

const router = express.Router();

router.get('/', listReservations);
router.post('/', createReservation);

module.exports = router;
