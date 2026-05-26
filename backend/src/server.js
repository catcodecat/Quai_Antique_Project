require('dotenv').config();

const app = require('./app');
const initDatabase = require('./config/initDatabase');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDatabase();
  } catch (error) {
    console.error('Base de donnees non initialisee pour le moment.');
    console.error(error.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Quai Antique lancee sur le port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Erreur au demarrage du serveur', error);
  process.exit(1);
});
