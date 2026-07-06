# Pattern MVC - Architecture backend Quai Antique

Le backend suit une organisation MVC adaptée à une API REST. La vue n'est pas rendue par Express : elle correspond aux fichiers HTML/CSS/JS du frontend.

## Schéma général

```text
Requête HTTP
  |
  v
Routes
  |
  v
Middlewares
  |
  v
Controllers
  |
  v
Repositories
  |
  v
PostgreSQL
  |
  v
Réponse JSON
```

Toutes les couches ont une responsabilité limitée, ce qui rend le code plus lisible et plus simple à présenter à l'examen.

## Structure backend actuelle

```text
backend/src/
├── app.js
├── server.js
├── config/
│   ├── database.js
│   └── initDatabase.js
├── controllers/
│   ├── auth.controller.js
│   └── reservation.controller.js
├── middlewares/
│   └── auth.middleware.js
├── repositories/
│   ├── user.repository.js
│   └── reservation.repository.js
└── routes/
    ├── auth.routes.js
    ├── health.routes.js
    └── reservation.routes.js
```

## Routes

Les routes définissent les endpoints et délèguent aux controllers.

| Fichier | Endpoints | Rôle |
|---|---|---|
| `health.routes.js` | `GET /api/health` | Vérification de disponibilité |
| `auth.routes.js` | `POST /api/auth/register`, `POST /api/auth/login` | Authentification |
| `reservation.routes.js` | `GET /api/reservations`, `POST /api/reservations` | Réservations |

Exemple :

```js
router.get('/', authenticateToken, requireAdmin, listReservations);
router.post('/', createReservation);
```

## Middlewares

Le fichier `auth.middleware.js` est un composant implémenté, pas seulement prévu.

| Middleware | Rôle |
|---|---|
| `authenticateToken` | Vérifie l'en-tête `Authorization: Bearer <token>` et valide le JWT |
| `requireAdmin` | Vérifie que l'utilisateur authentifié possède le rôle `admin` |

Ces middlewares protègent actuellement la route `GET /api/reservations`.

## Controllers

Les controllers contiennent la logique métier HTTP : validation, appels repositories et réponses JSON.

| Fichier | Fonctions | Responsabilités |
|---|---|---|
| `auth.controller.js` | `register`, `login` | Validation simple, bcrypt, JWT |
| `reservation.controller.js` | `createReservation`, `listReservations` | Validation réservation, gestion des erreurs, réponses API |

Validations actuellement présentes pour les réservations :

- email valide ;
- nombre de personnes entre 1 et 5 ;
- date dans le futur ;
- nom et prénom non vides, limités à 100 caractères ;
- allergies limitées à 500 caractères.

## Repositories

Les repositories contiennent l'accès SQL. Les requêtes utilisent les paramètres `$1`, `$2`, etc. pour éviter les injections SQL.

| Fichier | Fonctions | Requêtes |
|---|---|---|
| `user.repository.js` | `findUserByEmail`, `createUser` | `SELECT`, `INSERT ... RETURNING` |
| `reservation.repository.js` | `createReservation`, `findAllReservations` | `INSERT ... RETURNING`, `SELECT ... ORDER BY` |

Exemple :

```js
await db.query(
  `SELECT id, email, password_hash AS "passwordHash"
   FROM users
   WHERE email = $1`,
  [email],
);
```

## Config

| Fichier | Rôle |
|---|---|
| `database.js` | Crée le pool PostgreSQL avec `DATABASE_URL` |
| `initDatabase.js` | Crée les tables `users` et `reservations` si elles n'existent pas |

## Point d'entrée

| Fichier | Rôle |
|---|---|
| `server.js` | Charge `.env`, initialise la base puis démarre Express |
| `app.js` | Configure CORS, Helmet, rate limit, JSON body limit et routes |

## Flux POST /api/reservations

```text
Browser
  |
  | POST /api/reservations
  v
reservation.routes.js
  |
  v
reservation.controller.createReservation
  |
  | validation backend
  v
reservation.repository.createReservation
  |
  | INSERT INTO reservations (...) VALUES ($1...$7)
  v
PostgreSQL
  |
  v
201 Reservation enregistree
```

## Flux GET /api/reservations

```text
Browser admin
  |
  | GET /api/reservations
  | Authorization: Bearer <token>
  v
reservation.routes.js
  |
  v
authenticateToken
  |
  v
requireAdmin
  |
  v
reservation.controller.listReservations
  |
  v
reservation.repository.findAllReservations
  |
  v
PostgreSQL
  |
  v
200 Liste des réservations
```
