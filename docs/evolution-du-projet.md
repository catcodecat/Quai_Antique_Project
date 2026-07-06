# Évolution du projet Quai Antique

Ce document présente l'évolution fonctionnelle et technique du projet. Il sert de support pour expliquer la démarche de développement pendant la soutenance DWWM.

## Vue d'ensemble

Le projet a évolué en plusieurs étapes :

1. Création d'un site vitrine statique.
2. Ajout d'un backend Express.
3. Connexion à PostgreSQL.
4. Connexion du formulaire de réservation à l'API.
5. Ajout de l'authentification.
6. Ajout du tableau d'administration.
7. Renforcement de la sécurité.
8. Organisation de la documentation et des supports de présentation.

## Phase 1 - Site vitrine statique

Première version :

- pages HTML principales ;
- feuille de style globale ;
- navigation ;
- galerie ;
- carte du restaurant ;
- formulaire de réservation statique ;
- Dockerfile frontend avec Nginx.

Objectif pédagogique :

- poser la structure du site ;
- travailler le responsive ;
- préparer une première version visible du projet.

## Phase 2 - Backend Express

Ajout d'un backend Node.js / Express dans `backend/`.

Structure mise en place :

```text
backend/src/
├── app.js
├── server.js
├── config/
├── controllers/
├── repositories/
└── routes/
```

Premières routes :

- `GET /api/health`
- `POST /api/reservations`
- `GET /api/reservations`

Objectif pédagogique :

- séparer frontend et backend ;
- créer une API REST ;
- organiser le code selon une architecture MVC.

## Phase 3 - Base de données PostgreSQL

Ajout d'une connexion PostgreSQL avec le package `pg`.

Composants :

- `database.js` pour le pool de connexion ;
- `initDatabase.js` pour créer les tables ;
- repositories pour centraliser les requêtes SQL.

Tables actuelles :

- `users`
- `reservations`

Objectif pédagogique :

- manipuler une base relationnelle ;
- utiliser des requêtes SQL paramétrées ;
- conserver les données de réservation.

## Phase 4 - Connexion frontend/backend

Le fichier `app.js` du frontend envoie les formulaires vers l'API via `fetch`.

Le fichier `config.js` définit :

```js
const API_BASE_URL = 'https://quaiantiqueproject-production.up.railway.app';
```

Objectif pédagogique :

- connecter une interface utilisateur à une API ;
- gérer les réponses et erreurs côté navigateur ;
- remplacer les interactions purement statiques par une logique applicative.

## Phase 5 - Authentification

Fonctionnalités ajoutées :

- inscription ;
- connexion ;
- hash du mot de passe avec bcrypt ;
- génération d'un JWT ;
- stockage du token et de l'utilisateur dans `localStorage`.

Fichiers concernés :

- `auth.controller.js`
- `user.repository.js`
- `auth.routes.js`
- `app.js` frontend

Objectif pédagogique :

- comprendre l'authentification ;
- ne jamais stocker de mot de passe en clair ;
- manipuler un token JWT.

## Phase 6 - Administration

Ajout d'une page `admin.html` pour visualiser les réservations.

Évolution récente :

- la page envoie désormais le JWT dans l'en-tête `Authorization` ;
- la route `GET /api/reservations` est protégée côté backend ;
- seul un utilisateur avec le rôle `admin` peut obtenir la liste.

Objectif pédagogique :

- comprendre la différence entre authentification et autorisation ;
- utiliser un rôle utilisateur ;
- protéger les données personnelles des réservations.

## Phase 7 - Renforcement de la sécurité

Mesures ajoutées :

- suppression du secret JWT par défaut ;
- `JWT_SECRET` obligatoire dans l'environnement ;
- middleware `authenticateToken` ;
- middleware `requireAdmin` ;
- Helmet ;
- Express Rate Limit ;
- limite de taille JSON ;
- validation backend des réservations ;
- suppression de l'utilisation active de `innerHTML` pour les données de l'admin ;
- requêtes SQL paramétrées.

Objectif pédagogique :

- montrer une prise en compte concrète de la sécurité ;
- répondre aux attentes du référentiel DWWM sur la sécurisation d'une application web.

## Phase 8 - Documentation et dossier professionnel

Documents créés ou mis à jour :

- documentation API ;
- architecture globale ;
- flux d'authentification ;
- ERD ;
- documentation MVC ;
- documentation sécurité ;
- liste des captures d'écran ;
- notes pour la soutenance.

Objectif pédagogique :

- préparer la soutenance ;
- faciliter le remplissage du Dossier Professionnel ;
- expliquer clairement les choix techniques.

## Points forts à présenter

- Progression itérative du projet.
- Séparation frontend/backend.
- Architecture MVC.
- PostgreSQL avec requêtes paramétrées.
- Authentification JWT.
- Autorisation par rôle admin.
- Sécurité renforcée avant la remise.
- Documentation technique complète.

## Limites connues à assumer

- Pas encore de tests automatisés.
- Pas encore de migrations versionnées.
- Pas de relation `user_id` entre `reservations` et `users`.
- Rôle admin attribué en base ou via un outil externe.

Ces limites peuvent être présentées comme des améliorations futures cohérentes.
