# Docker - Quai Antique

Le projet contient une configuration Docker pour lancer le frontend, le backend et une base PostgreSQL locale.

## Fichiers présents

```text
Dockerfile
docker-compose.yml
backend/Dockerfile
```

## Frontend

Le `Dockerfile` racine utilise Nginx :

```dockerfile
FROM nginx:1.27-alpine
```

Il copie les pages HTML, `styles.css`, `app.js`, `config.js` et `assets/` dans le dossier servi par Nginx.

Port exposé :

```text
80
```

Dans Docker Compose, le frontend est publié sur :

```text
http://localhost:8080
```

## Backend

Le `backend/Dockerfile` utilise Node.js :

```dockerfile
FROM node:22-alpine
```

Il installe les dépendances avec :

```bash
npm ci --omit=dev
```

Puis lance :

```bash
node src/server.js
```

Dans `docker-compose.yml`, le backend est construit depuis le dossier réel du projet :

```yaml
backend:
  build: ./backend
```

## Base de données

Le service `database` utilise :

```text
postgres:16-alpine
```

Variables locales dans `docker-compose.yml` :

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

Un volume `postgres_data` conserve les données.

## Variables d'environnement

Pour Docker Compose, les variables de démonstration sont définies dans `docker-compose.yml`.

Pour l'exécution locale sans Docker, le backend utilise `backend/.env`, qui ne doit jamais être versionné.

## Commandes utiles

```bash
docker compose up --build
docker compose down
```

## Intérêt pour le DWWM

Docker montre la capacité à préparer un environnement reproductible. Même si la démonstration principale se fait avec Node.js et une base distante comme Supabase, cette configuration aide à expliquer l'industrialisation du projet.
