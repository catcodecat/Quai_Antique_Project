# Architecture globale - Quai Antique

Ce document présente l'architecture réelle du projet Quai Antique dans son état actuel.

## Vue d'ensemble

```text
Utilisateur / Navigateur
  |
  | HTML, CSS, JavaScript
  v
Frontend statique
  |
  | fetch(API_BASE_URL)
  v
Backend Express
  |
  | pg, requêtes SQL paramétrées
  v
PostgreSQL
```

## Frontend

Le frontend est composé de fichiers statiques placés à la racine du projet.

```text
index.html
gallery.html
menu.html
reservation.html
login.html
register.html
admin.html
styles.css
app.js
config.js
assets/
```

Rôles principaux :

- `index.html` : page d'accueil.
- `gallery.html` : galerie du restaurant.
- `menu.html` : carte avec onglets.
- `reservation.html` : formulaire de réservation.
- `login.html` et `register.html` : authentification.
- `admin.html` : consultation des réservations pour un administrateur.
- `app.js` : interactions frontend, formulaires, auth, navigation.
- `config.js` : définit `API_BASE_URL`.

## Backend

Le backend se trouve dans le dossier `backend/`.

```text
backend/
├── package.json
├── railway.json
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── repositories/
    └── routes/
```

Le backend utilise Express et suit une organisation MVC :

```text
Routes -> Middlewares -> Controllers -> Repositories -> PostgreSQL
```

Composants principaux :

- `server.js` charge les variables d'environnement, initialise la base et démarre le serveur.
- `app.js` configure Express, CORS, Helmet, rate limit, JSON body limit et les routes.
- `database.js` crée le pool PostgreSQL.
- `initDatabase.js` crée les tables `users` et `reservations` si nécessaire.
- `auth.middleware.js` protège les routes nécessitant JWT et rôle admin.

## Base de données

Le projet utilise PostgreSQL via le package `pg`.

Tables actuellement créées par le code :

- `users`
- `reservations`

Les requêtes SQL sont placées dans les repositories et utilisent des paramètres (`$1`, `$2`, etc.).

## Authentification et autorisation

Flux simplifié :

```text
Browser
  |
  | POST /api/auth/login
  v
auth.controller.js
  |
  | bcrypt.compare()
  | jwt.sign()
  v
Réponse { token, user }
  |
  v
localStorage qaToken / qaUser
```

Pour l'administration :

```text
admin.html
  |
  | GET /api/reservations
  | Authorization: Bearer <token>
  v
authenticateToken
  |
  v
requireAdmin
  |
  v
listReservations
```

La route `GET /api/reservations` est accessible uniquement aux utilisateurs dont le JWT contient `role: "admin"`.

## Sécurité Express

Mesures en place :

- `helmet()` pour les en-têtes de sécurité.
- `express-rate-limit` avec 100 requêtes par fenêtre de 15 minutes.
- `express.json({ limit: '10kb' })`.
- CORS limité aux origines définies dans `CORS_ORIGIN`.
- JWT signé avec `JWT_SECRET`.
- Mot de passe haché avec bcrypt.
- Requêtes SQL paramétrées.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NODE_ENV` | Environnement d'exécution |
| `PORT` | Port du serveur Express |
| `CORS_ORIGIN` | Origines autorisées par CORS |
| `DATABASE_URL` | Connexion PostgreSQL |
| `JWT_SECRET` | Secret de signature des JWT |

Le fichier `.env` réel est ignoré par Git. Le fichier `.env.example` sert de modèle.

## Déploiement

Le projet contient :

- un `Dockerfile` frontend ;
- un `docker-compose.yml` ;
- un `backend/Dockerfile` ;
- un `backend/railway.json`.

La documentation de déploiement doit rester alignée avec l'environnement réellement utilisé pendant la démonstration : local, Docker, Railway, Netlify ou autre.

## Points à expliquer à l'examen

- Séparation frontend/backend.
- Architecture MVC côté backend.
- Utilisation de PostgreSQL.
- Sécurité des mots de passe avec bcrypt.
- Authentification JWT.
- Autorisation par rôle admin.
- Protection contre les injections SQL avec requêtes paramétrées.
- Gestion des variables d'environnement.
