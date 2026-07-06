# Quai Antique

Site web du restaurant gastronomique fictif **Quai Antique**, réalisé dans le cadre du Titre Professionnel **Développeur Web et Web Mobile (DWWM - RNCP 37674)**.

Le projet présente une application web complète : site vitrine, formulaire de réservation connecté à une API, authentification utilisateur, tableau d'administration et base PostgreSQL.

## Fonctionnalités

- Page d'accueil du restaurant.
- Galerie d'images.
- Carte avec onglets JavaScript.
- Formulaire de réservation connecté au backend.
- Inscription et connexion utilisateur.
- Authentification par JWT.
- Préremplissage du formulaire de réservation pour un utilisateur connecté.
- Tableau d'administration pour consulter les réservations.
- Protection de la liste des réservations par rôle `admin`.
- Documentation technique dans le dossier `docs/`.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript vanilla
- Fichiers statiques : `index.html`, `gallery.html`, `menu.html`, `reservation.html`, `login.html`, `register.html`, `admin.html`

### Backend

- Node.js
- Express
- Architecture MVC : routes, middlewares, controllers, repositories
- PostgreSQL avec le package `pg`
- Variables d'environnement avec `dotenv`

### Sécurité

- Hachage des mots de passe avec `bcryptjs`.
- JWT signé avec `JWT_SECRET`.
- Middleware `authenticateToken`.
- Middleware `requireAdmin`.
- Protection de `GET /api/reservations` par JWT et rôle `admin`.
- Validation backend des réservations.
- Requêtes SQL paramétrées.
- Helmet pour les en-têtes HTTP de sécurité.
- Express Rate Limit.
- Limite du body JSON à `10kb`.
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
│   ├── package-lock.json
│   ├── railway.json
│   ├── Dockerfile
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
├── dossier-professionel/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Routes API

| Méthode | Route | Authentification | Description |
|---|---|---|---|
| GET | `/api/health` | Non | Vérifier que l'API répond |
| POST | `/api/auth/register` | Non | Créer un compte utilisateur |
| POST | `/api/auth/login` | Non | Se connecter et recevoir un JWT |
| POST | `/api/reservations` | Non | Créer une réservation |
| GET | `/api/reservations` | JWT + rôle `admin` | Lister les réservations |

## Base de données

Le projet utilise PostgreSQL. En local ou en production, la connexion est fournie par la variable d'environnement `DATABASE_URL`.

Le backend initialise deux tables si elles n'existent pas :

- `users`
- `reservations`

Les requêtes SQL sont centralisées dans les repositories et utilisent des paramètres (`$1`, `$2`, etc.) pour réduire le risque d'injection SQL.

## Variables d'environnement backend

Créer un fichier `backend/.env` à partir de `backend/.env.example`.

Exemple de variables attendues :

```text
NODE_ENV=development
PORT=3003
CORS_ORIGIN=http://localhost:8080
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

Le fichier `.env` réel ne doit jamais être versionné. Il contient les informations sensibles comme `DATABASE_URL` et `JWT_SECRET`.

## Installation et lancement

### Frontend

Le frontend est statique. Il peut être ouvert directement dans le navigateur :

```text
index.html
```

Il peut aussi être servi avec un serveur statique si nécessaire.

### Backend

```bash
cd backend
npm install
npm run dev
```

API locale :

```text
http://localhost:3003
```

### Base PostgreSQL

Le projet peut fonctionner avec une base distante comme Supabase. Il n'est pas obligatoire d'installer PostgreSQL localement si `DATABASE_URL` pointe vers une base distante accessible.

## Administration

La page `admin.html` utilise le token stocké côté navigateur pour appeler :

```text
GET /api/reservations
```

Cette route est protégée côté backend :

```js
router.get('/', authenticateToken, requireAdmin, listReservations);
```

Un utilisateur doit donc posséder le rôle `admin` pour consulter la liste des réservations.

## Documentation

Les documents techniques sont dans `docs/` :

- `architecture.md` : architecture globale.
- `api-routes.md` : documentation des routes API.
- `auth-flow.md` : flux d'authentification JWT.
- `mvc.md` : organisation backend.
- `erd.md` : modèle de base de données.
- `security.md` : mesures de sécurité.
- `evolution-du-projet.md` : évolution du projet.

Ces documents servent à préparer la soutenance DWWM et le Dossier Professionnel.

## Limites connues

- Le rôle `admin` doit être attribué en base ou via un outil d'administration externe.
- Les réservations ne sont pas encore reliées à `users` par une clé étrangère `user_id`.
- Il n'y a pas encore de tests automatisés.
- Le projet utilise HTML/CSS/JavaScript vanilla, sans framework frontend.
- Docker n'est pas nécessaire pour la démonstration si le backend Node.js et la base distante fonctionnent correctement.

## Améliorations futures

- Ajouter une interface de gestion des rôles.
- Ajouter des tests automatisés.
- Ajouter des migrations versionnées pour la base de données.
- Relier les réservations aux utilisateurs connectés avec un `user_id` nullable.
- Ajouter la modification du statut des réservations dans l'administration.

## Intérêt pour le DWWM

Ce projet permet de démontrer :

- la création d'une interface web responsive ;
- l'organisation d'un backend Express ;
- la connexion à PostgreSQL ;
- l'utilisation de requêtes SQL paramétrées ;
- l'authentification avec JWT ;
- l'autorisation par rôle `admin` ;
- la gestion sécurisée des variables d'environnement ;
- la documentation d'un projet professionnel.
