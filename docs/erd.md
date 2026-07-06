# ERD - Base de données Quai Antique

Ce document décrit la base de données réellement utilisée par le backend actuel.

## Tables actuelles

Le fichier `backend/src/config/initDatabase.js` crée deux tables si elles n'existent pas :

- `users`
- `reservations`

## Diagramme entité-relation

```text
users
-----
id              SERIAL PRIMARY KEY
first_name      VARCHAR(100) NOT NULL
last_name       VARCHAR(100) NOT NULL
email           VARCHAR(255) UNIQUE NOT NULL
password_hash   VARCHAR(255) NOT NULL
role            VARCHAR(20) NOT NULL DEFAULT 'user'
created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP


reservations
------------
id                SERIAL PRIMARY KEY
first_name        VARCHAR(100) NOT NULL
last_name         VARCHAR(100) NOT NULL
email             VARCHAR(255) NOT NULL
reservation_date  DATE NOT NULL
reservation_time  TIME NOT NULL
guests            INTEGER NOT NULL CHECK (guests > 0)
allergies         TEXT
status            VARCHAR(30) NOT NULL DEFAULT 'pending'
created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
```

## SQL actuel

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  allergies TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Contraintes et valeurs applicatives

| Élément | État actuel |
|---|---|
| `users.email` | Unique en base |
| `users.role` | Valeur par défaut `user`; le code vérifie aussi le rôle `admin` |
| `reservations.guests` | `CHECK (guests > 0)` en base ; validation backend entre 1 et 5 |
| `reservations.status` | Valeur par défaut `pending` |
| `password_hash` | Hash bcrypt, jamais mot de passe en clair |

## Relations actuelles

Il n'existe pas actuellement de clé étrangère entre `reservations` et `users`.

Une réservation stocke les informations de contact (`first_name`, `last_name`, `email`) directement dans la table `reservations`. Cela permet à un visiteur non connecté de réserver.

## Future improvements

Améliorations possibles, non présentes dans le code actuel :

- Ajouter `reservations.user_id` nullable.
- Créer une clé étrangère `reservations.user_id -> users.id`.
- Ajouter une contrainte stricte sur `users.role` (`user`, `admin`).
- Ajouter une contrainte stricte sur `reservations.status` (`pending`, `confirmed`, `cancelled`).
- Ajouter des migrations versionnées au lieu de `CREATE TABLE IF NOT EXISTS` au démarrage.

Ces éléments peuvent être présentés comme pistes d'amélioration, mais pas comme fonctionnalités déjà implémentées.
