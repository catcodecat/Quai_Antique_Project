const express = require('express');

const {
  listReservations,
  createReservation,
} = require('../controllers/reservation.controller');
const {
  authenticateToken,
  requireAdmin,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, listReservations);
router.post('/', createReservation);

module.exports = router;
