# Routes API - Quai Antique Backend

Base URL de production : `https://quaiantiqueproject-production.up.railway.app`

Le backend est une API REST Express. Les routes sont montées dans `backend/src/app.js` :

- `/api/health`
- `/api/auth`
- `/api/reservations`

## Récapitulatif des routes

| Méthode | Route | Authentification | Rôle requis | Description |
|---|---|---|---|---|
| GET | `/api/health` | Non | Aucun | Vérifier que l'API répond |
| POST | `/api/auth/register` | Non | Aucun | Créer un compte utilisateur |
| POST | `/api/auth/login` | Non | Aucun | Se connecter et recevoir un JWT |
| POST | `/api/reservations` | Non | Aucun | Créer une réservation |
| GET | `/api/reservations` | Oui, JWT Bearer | `admin` | Lister toutes les réservations |

## Sécurité des routes

La route `GET /api/reservations` est protégée par deux middlewares :

```js
router.get('/', authenticateToken, requireAdmin, listReservations);
```

- `authenticateToken` vérifie la présence et la validité du JWT dans l'en-tête `Authorization`.
- `requireAdmin` vérifie que le payload JWT contient `role: "admin"`.

Format attendu :

```http
Authorization: Bearer <token>
```

## Détail des routes

### GET /api/health

Vérifie que le serveur Express est démarré.

Réponse 200 :

```json
{
  "status": "ok",
  "message": "API Quai Antique active"
}
```

### POST /api/auth/register

Crée un compte utilisateur. Le mot de passe est haché avec `bcryptjs` avant l'enregistrement en base. La réponse contient un JWT signé avec `JWT_SECRET`.

Corps de requête :

```json
{
  "firstName": "Marie",
  "lastName": "Dupont",
  "email": "marie@example.com",
  "password": "motdepasse123"
}
```

Réponse 201 :

```json
{
  "message": "Compte créé avec succès",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "Marie",
    "lastName": "Dupont",
    "email": "marie@example.com",
    "role": "user"
  }
}
```

Codes possibles :

| Code | Cause |
|---|---|
| 201 | Compte créé |
| 400 | Champ obligatoire manquant |
| 400 | Mot de passe de moins de 6 caractères |
| 400 | Email déjà utilisé |
| 500 | Erreur serveur ou base de données |

### POST /api/auth/login

Vérifie les identifiants, compare le mot de passe avec le hash stocké en base, puis retourne un JWT.

Corps de requête :

```json
{
  "email": "marie@example.com",
  "password": "motdepasse123"
}
```

Réponse 200 :

```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "Marie",
    "lastName": "Dupont",
    "email": "marie@example.com",
    "role": "user"
  }
}
```

Codes possibles :

| Code | Cause |
|---|---|
| 200 | Connexion réussie |
| 400 | Email ou mot de passe manquant |
| 401 | Email ou mot de passe incorrect |
| 500 | Erreur serveur ou base de données |

### POST /api/reservations

Crée une réservation avec le statut initial `pending`. Cette route reste publique afin de permettre à un visiteur de réserver une table.

Validations côté backend :

- `firstName` et `lastName` obligatoires, non vides, maximum 100 caractères.
- `email` obligatoire, format email simple, maximum 255 caractères.
- `date` obligatoire, format `YYYY-MM-DD`, strictement dans le futur.
- `time` obligatoire.
- `guests` entier entre 1 et 5.
- `allergies` optionnel, maximum 500 caractères.

Corps de requête :

```json
{
  "firstName": "Jean",
  "lastName": "Martin",
  "email": "jean@example.com",
  "date": "2026-06-15",
  "time": "19:30",
  "guests": 2,
  "allergies": "Gluten"
}
```

Réponse 201 :

```json
{
  "message": "Reservation enregistree",
  "reservation": {
    "id": 1,
    "firstName": "Jean",
    "lastName": "Martin",
    "email": "jean@example.com",
    "date": "2026-06-15",
    "time": "19:30:00",
    "guests": 2,
    "allergies": "Gluten",
    "status": "pending",
    "createdAt": "2026-06-02T10:00:00.000Z"
  }
}
```

Codes possibles :

| Code | Cause |
|---|---|
| 201 | Réservation créée |
| 400 | Champ obligatoire manquant |
| 400 | Email invalide |
| 400 | Date non future |
| 400 | Nombre de personnes hors limite |
| 400 | Nom, prénom ou allergies trop longs |
| 503 | Base de données indisponible |
| 500 | Erreur serveur |

### GET /api/reservations

Retourne toutes les réservations, triées par date de création décroissante. Cette route alimente le tableau d'administration.

Authentification obligatoire :

```http
Authorization: Bearer <token-admin>
```

Réponse 200 :

```json
{
  "message": "Liste des reservations",
  "reservations": [
    {
      "id": 1,
      "firstName": "Jean",
      "lastName": "Martin",
      "email": "jean@example.com",
      "date": "2026-06-15",
      "time": "19:30:00",
      "guests": 2,
      "allergies": null,
      "status": "pending",
      "createdAt": "2026-06-02T10:00:00.000Z"
    }
  ]
}
```

Codes possibles :

| Code | Cause |
|---|---|
| 200 | Liste retournée pour un admin |
| 401 | Token manquant |
| 403 | Token invalide |
| 403 | Utilisateur connecté mais non admin |
| 500 | Erreur serveur |

## Routes non présentes dans le code actuel

Le projet ne contient pas actuellement de routes pour créer, modifier ou supprimer des plats, menus ou horaires. Ces fonctionnalités peuvent être citées comme améliorations futures, mais elles ne doivent pas être présentées comme implémentées.
