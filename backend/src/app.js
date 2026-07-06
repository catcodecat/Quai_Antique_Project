const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const healthRoutes = require('./routes/health.routes');
const reservationRoutes = require('./routes/reservation.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:8080')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Autorise les requêtes sans origine (curl, Postman, fichiers locaux)
    // et les origines dans la liste blanche
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS : origine non autorisée — ${origin}`));
    }
  },
}));

app.use(express.json({ limit: '10kb' }));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route non trouvee',
  });
});

module.exports = app;
