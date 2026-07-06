# README mis à jour - Quai Antique

Ce document sert de version de référence pour présenter l'état actuel du projet Quai Antique. Il peut être utilisé pour mettre à jour le `README.md` principal avant la remise.

# Quai Antique

Site web du restaurant gastronomique fictif Quai Antique, réalisé dans le cadre du Titre Professionnel Développeur Web et Web Mobile (DWWM - RNCP 37674).

## Présentation

Le projet comprend :

- un site vitrine multi-pages ;
- une carte de restaurant avec onglets JavaScript ;
- un formulaire de réservation connecté à une API ;
- une authentification par inscription/connexion ;
- un tableau d'administration pour consulter les réservations ;
- un backend Express connecté à PostgreSQL.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript vanilla
- Fichiers statiques : `index.html`, `gallery.html`, `menu.html`, `reservation.html`, `login.html`, `register.html`, `admin.html`

### Backend

- Node.js
- Express
- Architecture MVC : routes, controllers, repositories
- PostgreSQL via `pg`
- Variables d'environnement via `dotenv`

### Sécurité

- `bcryptjs` pour hacher les mots de passe ;
- `jsonwebtoken` pour signer et vérifier les JWT ;
- `JWT_SECRET` obligatoire dans l'environnement ;
- authorization par rôle `admin` pour la liste des réservations ;
- `helmet` pour ajouter des en-têtes HTTP de sécurité ;
- `express-rate-limit` pour limiter les abus ;
- `express.json({ limit: '10kb' })` pour limiter la taille des payloads ;
- validation côté backend des réservations ;
- requêtes SQL paramétrées ;
- `.env` ignoré par Git.

## Structure du projet

```text
Quai_Antique_Project/
├── index.html
├── gallery.html
├── menu.html
├── reservation.html
├── login.html
├── register.html
├── admin.html
├── app.js
├── config.js
├── styles.css
├── assets/
├── backend/
│   ├── package.json
│   ├── railway.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── repositories/
│       └── routes/
├── docs/
├── presentation/
├── screens/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Routes API

| Méthode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | Non | Vérifier que l'API répond |
| POST | `/api/auth/register` | Non | Créer un compte |
| POST | `/api/auth/login` | Non | Se connecter |
| POST | `/api/reservations` | Non | Créer une réservation |
| GET | `/api/reservations` | JWT + admin | Lister les réservations |

## Variables d'environnement backend

```text
NODE_ENV=development
PORT=3003
CORS_ORIGIN=http://localhost:8080
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

Le fichier `.env` réel ne doit pas être versionné. Le fichier `.env.example` sert uniquement de modèle.

## Installation locale

Frontend simple :

```text
Ouvrir index.html dans le navigateur
```

Backend :

```bash
cd backend
npm install
npm run dev
```

API locale attendue :

```text
http://localhost:3003
```

## Base de données

Le backend utilise PostgreSQL. Au démarrage, `initDatabase.js` crée les tables nécessaires si elles n'existent pas :

- `users`
- `reservations`

Les réservations ne sont pas encore liées à `users` par une clé étrangère. Cette amélioration est documentée comme piste future dans l'ERD.

## Fonctionnalités réalisées

- Site vitrine : accueil, galerie, carte, réservation, compte.
- Réservation enregistrée en base via l'API.
- Inscription avec mot de passe haché.
- Connexion avec vérification bcrypt.
- JWT retourné après connexion.
- Navigation adaptée si l'utilisateur est connecté.
- Préremplissage du formulaire de réservation avec les informations utilisateur.
- Tableau d'administration.
- Protection API de la liste des réservations par JWT et rôle admin.
- Sécurité Express : Helmet, rate limit, limite JSON.
- Documentation technique dans `docs/`.

## Limites connues

- Le rôle admin doit être attribué en base ou via un outil d'administration externe.
- Les réservations ne sont pas reliées à un `user_id`.
- Il n'y a pas encore de tests automatisés.
- Le projet reste en HTML/CSS/JavaScript vanilla, sans framework frontend.

## Intérêt pour le DWWM

Ce projet permet de démontrer :

- la création d'une interface web responsive ;
- la mise en place d'une API Express ;
- la connexion à une base PostgreSQL ;
- l'utilisation de requêtes SQL paramétrées ;
- l'authentification avec JWT ;
- la sécurisation de routes par rôle ;
- la gestion des variables d'environnement ;
- une documentation technique exploitable en soutenance.
