require('dotenv').config();

const app = require('./app');
const initDatabase = require('./config/initDatabase');

const port = process.env.PORT || 3000;

async function startServer() {
  await initDatabase();

  app.listen(port, () => {
    console.log(`API Quai Antique lancee sur le port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Erreur au demarrage du serveur', error);
  process.exit(1);
});
