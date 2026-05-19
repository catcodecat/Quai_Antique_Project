# Backend futur - Quai Antique

## Objectif

Pour cette première remise, je garde le projet en HTML, CSS et JavaScript simple. Le backend n'est donc pas encore développé.

Je prépare quand même cette documentation pour montrer comment je compte continuer le projet. L'objectif sera d'ajouter une API qui permettra de rendre les formulaires vraiment fonctionnels.

## Technologie prévue

Je prévois d'utiliser :

- **Node.js** pour exécuter le serveur ;
- **Express** pour créer les routes API ;
- une base de données pour enregistrer les utilisateurs, les réservations, les plats et les horaires ;
- `bcrypt` pour protéger les mots de passe ;
- JWT ou session pour gérer la connexion.

## Structure prévue

```text
backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── server.js
├── package.json
└── .env.example
```

Cette structure me permettra de séparer les responsabilités :

- les `routes` recevront les requêtes ;
- les `controllers` traiteront les actions ;
- les `middlewares` serviront pour la sécurité et l'authentification ;
- les `models` représenteront les données ;
- `server.js` lancera l'application Express.

## Routes API prévues

### Authentification

- `POST /api/auth/register` : créer un compte utilisateur.
- `POST /api/auth/login` : connecter un utilisateur.
- `GET /api/auth/me` : récupérer les informations de l'utilisateur connecté.

### Réservations

- `POST /api/reservations` : créer une réservation.
- `GET /api/reservations/me` : voir mes réservations.
- `GET /api/admin/reservations` : voir toutes les réservations côté administrateur.
- `PUT /api/admin/reservations/:id` : modifier l'état d'une réservation.

### Menu et plats

- `GET /api/menus` : afficher les menus.
- `GET /api/plats` : afficher les plats.
- `POST /api/admin/plats` : ajouter un plat.
- `PUT /api/admin/plats/:id` : modifier un plat.
- `DELETE /api/admin/plats/:id` : supprimer un plat.

### Horaires

- `GET /api/horaires` : afficher les horaires.
- `PUT /api/admin/horaires/:id` : modifier les horaires côté administrateur.

## Base de données prévue

Les tables prévues sont :

- `utilisateurs`
- `reservations`
- `menus`
- `plats`
- `horaires`
- `avis`

## Relations prévues

- un utilisateur peut avoir plusieurs réservations ;
- une réservation peut être liée à un utilisateur ;
- un menu peut contenir plusieurs plats ;
- un plat appartient à une catégorie ;
- un avis peut être lié à un utilisateur ;
- les horaires servent à limiter les créneaux de réservation.

## État actuel

Pour le moment, les formulaires existent seulement côté frontend. Quand je cliquerai sur "Réserver", "Connexion" ou "Inscription", le site affiche un message, mais aucune donnée n'est encore enregistrée.

La prochaine étape sera donc de créer ce backend et de connecter les formulaires HTML à l'API.
