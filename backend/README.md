# Backend Quai Antique

Ce dossier contient le backend Node.js + Express du projet Quai Antique.

Pour l'instant, le backend est volontairement simple. Il sert seulement à vérifier que l'API fonctionne sans modifier le frontend existant.

## Installation

```bash
cd backend
npm install
```

## Lancement en développement

```bash
npm run dev
```

## Lancement simple

```bash
npm start
```

L'API sera disponible sur :

```text
http://localhost:3003
```

J'utilise le port `3003` en développement local pour éviter un conflit si le port `3000` est déjà utilisé sur mon ordinateur.

## Base de données

Le backend utilise PostgreSQL.

En local, la connexion est lue depuis la variable :

```text
DATABASE_URL
```

Avec Docker Compose, un service `database` est prévu automatiquement.

Au démarrage, le backend crée la table `reservations` si elle n'existe pas encore.

Si PostgreSQL n'est pas encore lancé, le serveur démarre quand même. La route de test reste disponible, et les routes qui ont besoin de la base de données renvoient un message clair.

## Route de test

```text
GET /api/health
```

Cette route permet de vérifier que le serveur répond correctement.

## Route de réservation

```text
POST /api/reservations
```

Exemple de données envoyées :

```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "date": "2026-06-15",
  "time": "19:30",
  "guests": 2,
  "allergies": "Arachides"
}
```

Cette route vérifie les champs obligatoires puis enregistre la réservation dans la table `reservations`.
