require('dotenv').config();

const app = require('./app');
const initDatabase = require('./config/initDatabase');

const port = Number(process.env.PORT) || 3000;

function listenOnAvailablePort(portToUse, retries = 5) {
  const server = app.listen(portToUse, '0.0.0.0');

  server.on('listening', () => {
    console.log(`API Quai Antique lancee sur le port ${portToUse}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && retries > 0) {
      const nextPort = portToUse + 1;
      console.error(`Le port ${portToUse} est deja utilise. Nouvel essai sur le port ${nextPort}.`);
      listenOnAvailablePort(nextPort, retries - 1);
      return;
    }

    console.error('Erreur au demarrage du serveur', error);
    process.exit(1);
  });
}

async function startServer() {
  try {
    await initDatabase();
  } catch (error) {
    console.error('Base de donnees non initialisee pour le moment.');
    console.error(error.message);
  }

  listenOnAvailablePort(port);
}

startServer().catch((error) => {
  console.error('Erreur au demarrage du serveur', error);
  process.exit(1);
});
