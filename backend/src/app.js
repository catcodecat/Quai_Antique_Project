const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const reservationRoutes = require('./routes/reservation.routes');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
}));

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route non trouvee',
  });
});

module.exports = app;
