# Sécurité - Quai Antique

Ce document explique les mesures de sécurité appliquées dans le projet Quai Antique. Il est destiné à la préparation de la soutenance DWWM et au remplissage du Dossier Professionnel.

## Objectifs de sécurité

Le projet manipule des comptes utilisateurs et des données de réservation. Les objectifs principaux sont :

- protéger les mots de passe ;
- contrôler l'accès aux données d'administration ;
- éviter les injections SQL ;
- limiter les abus sur l'API ;
- ne pas exposer les secrets dans le code source ;
- valider les données reçues côté backend.

## bcrypt

Les mots de passe ne sont jamais enregistrés en clair.

Lors de l'inscription :

```js
const passwordHash = await bcrypt.hash(password, 10);
```

Le hash est stocké dans la colonne `users.password_hash`.

Lors de la connexion :

```js
const valid = await bcrypt.compare(password, user.passwordHash);
```

Cette approche permet de vérifier un mot de passe sans connaître ni stocker sa valeur originale.

## JWT Authentication

Après une inscription ou une connexion réussie, le backend génère un JWT :

```js
jwt.sign(
  { userId: user.id, email: user.email, role: user.role },
  getJwtSecret(),
  { expiresIn: '7d' },
);
```

Le token contient :

- `userId` ;
- `email` ;
- `role` ;
- une date d'émission ;
- une date d'expiration.

Le frontend stocke le token dans `localStorage` sous la clé `qaToken`.

## JWT_SECRET

`JWT_SECRET` est la clé privée utilisée pour signer et vérifier les JWT.

Bonnes pratiques appliquées :

- la valeur est lue depuis les variables d'environnement ;
- aucun secret réel n'est écrit dans le code source ;
- le backend ne fournit pas de secret faible par défaut ;
- si `JWT_SECRET` est absent, l'authentification échoue explicitement.

## Authorization admin/user

Le rôle utilisateur est stocké dans la table `users`, colonne `role`.

Valeurs utilisées par l'application :

- `user` : rôle par défaut ;
- `admin` : accès à la liste des réservations.

La route `GET /api/reservations` est protégée par :

```js
router.get('/', authenticateToken, requireAdmin, listReservations);
```

Cela signifie :

1. l'utilisateur doit fournir un JWT ;
2. le JWT doit être valide ;
3. le rôle contenu dans le JWT doit être `admin`.

## Middleware JWT

`authenticateToken` :

- lit l'en-tête `Authorization` ;
- attend le format `Bearer <token>` ;
- vérifie le token avec `jwt.verify` ;
- place le payload dans `req.user`.

`requireAdmin` :

- vérifie `req.user.role`;
- refuse l'accès si le rôle n'est pas `admin`.

Codes possibles :

| Cas | Code |
|---|---|
| Token absent | 401 |
| Token invalide | 403 |
| Rôle non admin | 403 |

## Validation côté backend

Le formulaire de réservation est validé côté serveur, pas seulement côté navigateur.

Règles appliquées :

- `firstName` et `lastName` obligatoires, non vides, maximum 100 caractères ;
- `email` obligatoire, format email simple, maximum 255 caractères ;
- `date` obligatoire, au format `YYYY-MM-DD`, dans le futur ;
- `time` obligatoire ;
- `guests` entier entre 1 et 5 ;
- `allergies` optionnel, maximum 500 caractères.

Cette validation réduit les erreurs, les abus et les données incohérentes en base.

## Helmet

Le backend utilise :

```js
app.use(helmet());
```

Helmet ajoute plusieurs en-têtes HTTP de sécurité. Cela renforce la protection générale de l'application Express.

## Express Rate Limit

Le backend limite le nombre de requêtes :

```js
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
```

Cette mesure aide à limiter les abus simples, comme les appels répétés ou les tentatives automatisées.

## Limite de taille JSON

Le backend limite la taille du body JSON :

```js
app.use(express.json({ limit: '10kb' }));
```

Cela évite d'accepter des payloads trop volumineux sur une API qui n'en a pas besoin.

## Protection contre XSS

Sur la page `admin.html`, les données reçues depuis l'API sont insérées avec des APIs DOM comme `createElement` et `textContent`, et non par concaténation HTML active.

Cela réduit le risque qu'une donnée saisie dans une réservation soit interprétée comme du HTML ou du JavaScript dans le tableau d'administration.

Le JWT est stocké dans `localStorage`, ce qui reste sensible en cas de faille XSS. La réduction du risque XSS côté affichage est donc importante.

## Prepared Statements / Parameterized Queries

Les repositories utilisent des requêtes paramétrées avec PostgreSQL :

```js
db.query(
  'SELECT ... WHERE email = $1',
  [email],
);
```

Les valeurs utilisateur ne sont pas concaténées directement dans les requêtes SQL. Cela protège contre les injections SQL.

## Variables d'environnement

Les informations sensibles sont stockées dans `.env` :

- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `PORT`

Le fichier `.env` est ignoré par Git. Le fichier `.env.example` sert seulement de modèle.

## Gestion sécurisée des secrets

Bonnes pratiques appliquées :

- ne pas afficher les secrets dans la documentation ;
- ne pas commiter `.env` ;
- utiliser un secret JWT long et aléatoire ;
- documenter les variables nécessaires sans exposer les valeurs réelles.

## Bonnes pratiques appliquées

- Mots de passe hachés avec bcrypt.
- JWT signé avec un secret d'environnement.
- Route admin protégée par JWT et rôle.
- Validation backend des entrées.
- Helmet activé.
- Rate limit activé.
- Body JSON limité.
- SQL paramétré.
- `.env` ignoré par Git.
- Données admin rendues avec DOM API plutôt que `innerHTML`.

## Limites et améliorations futures

Améliorations possibles :

- ajouter des tests automatisés de sécurité ;
- ajouter une politique de mot de passe plus stricte ;
- utiliser des cookies `HttpOnly` pour le token dans une version plus avancée ;
- ajouter des migrations versionnées ;
- créer une interface contrôlée pour gérer les rôles admin.

Ces points ne remettent pas en cause le fonctionnement actuel, mais constituent des axes d'amélioration professionnels.
