# Flux d'authentification et d'autorisation - Quai Antique

Ce document décrit le fonctionnement réel de l'authentification dans le projet : inscription, connexion, JWT, stockage côté navigateur et protection des routes administrateur.

## Vue d'ensemble

```text
Browser
  |
  | POST /api/auth/register ou POST /api/auth/login
  v
Route Express
  |
  v
auth.controller.js
  |
  v
user.repository.js
  |
  v
PostgreSQL
```

Pour les routes protégées :

```text
Browser
  |
  | GET /api/reservations
  | Authorization: Bearer <token>
  v
reservation.routes.js
  |
  v
auth.middleware.js
  |
  | authenticateToken()
  | requireAdmin()
  v
reservation.controller.js
  |
  v
reservation.repository.js
  |
  v
PostgreSQL
```

## Inscription

Le formulaire `register.html` envoie les informations au backend via `app.js`.

```text
register.html
  |
  | firstName, lastName, email, password
  v
POST /api/auth/register
  |
  v
auth.controller.register()
  |
  | Vérification des champs obligatoires
  | Vérification longueur password >= 6
  | Vérification email unique
  | bcrypt.hash(password, 10)
  v
user.repository.createUser()
  |
  | INSERT INTO users (...) VALUES ($1, $2, $3, $4)
  v
PostgreSQL
  |
  v
jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: "7d" })
  |
  v
Réponse JSON { token, user }
```

Le rôle par défaut en base est `user`.

## Connexion

```text
login.html
  |
  | email, password
  v
POST /api/auth/login
  |
  v
auth.controller.login()
  |
  | findUserByEmail(email)
  | bcrypt.compare(password, user.passwordHash)
  v
jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: "7d" })
  |
  v
Réponse JSON { token, user }
```

En cas d'identifiants incorrects, l'API renvoie `401`.

## Stockage côté navigateur

Après inscription ou connexion réussie, `app.js` stocke :

```js
localStorage.setItem("qaToken", payload.token);
localStorage.setItem("qaUser", JSON.stringify(payload.user));
```

Ces informations servent à :

- afficher le prénom dans la navigation ;
- gérer le bouton de déconnexion ;
- préremplir le formulaire de réservation ;
- envoyer le JWT sur la page d'administration.

## JWT_SECRET

`JWT_SECRET` est une variable d'environnement utilisée pour signer et vérifier les tokens JWT.

Le code ne fournit pas de secret par défaut. Si `JWT_SECRET` est absent, le backend lève une erreur. Cette décision évite de démarrer une authentification avec un secret faible ou public.

Variables attendues :

```text
JWT_SECRET=<secret long et aléatoire>
DATABASE_URL=<url PostgreSQL>
CORS_ORIGIN=<origines autorisées>
PORT=<port Express>
```

Le fichier `.env` réel ne doit jamais être commit. Le fichier `.env.example` documente seulement les variables nécessaires.

## Middleware JWT

Le fichier `backend/src/middlewares/auth.middleware.js` contient deux fonctions.

### authenticateToken

Responsabilités :

- lire l'en-tête `Authorization` ;
- vérifier le format `Bearer <token>` ;
- vérifier le token avec `jwt.verify(token, JWT_SECRET)` ;
- ajouter le payload dans `req.user`.

Réponses possibles :

| Cas | Code | Message |
|---|---|---|
| Aucun token | 401 | `Token manquant` |
| Token invalide ou expiré | 403 | `Token invalide` |

### requireAdmin

Responsabilités :

- vérifier que `req.user` existe ;
- vérifier que `req.user.role === "admin"` ;
- refuser l'accès aux utilisateurs non administrateurs.

Réponse possible :

| Cas | Code | Message |
|---|---|---|
| Utilisateur non admin | 403 | `Acces admin requis` |

## Protection administrative

La route suivante est protégée :

```js
router.get('/', authenticateToken, requireAdmin, listReservations);
```

Flux complet :

```text
admin.html
  |
  | localStorage.getItem("qaToken")
  | fetch /api/reservations
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
listReservations
  |
  v
reservation.repository.findAllReservations()
  |
  v
PostgreSQL
```

La page `admin.html` peut être ouverte dans le navigateur, mais les données sensibles ne sont retournées par l'API que si le token est valide et correspond à un utilisateur admin.

## Déconnexion

La déconnexion supprime les données locales :

```js
localStorage.removeItem("qaToken");
localStorage.removeItem("qaUser");
```

Puis l'utilisateur est redirigé vers `index.html`.
