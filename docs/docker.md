# Docker - Quai Antique

## Objectif

Pour cette première remise, le projet reste un site statique en HTML, CSS et JavaScript. J'ai quand même ajouté Docker pour pouvoir lancer le site avec un serveur web simple.

Docker me permet d'avoir une manière plus propre de démarrer le projet, sans dépendre uniquement de l'ouverture directe du fichier `index.html`.

## Fichiers ajoutés

- `Dockerfile` : prépare une image avec Nginx pour servir les fichiers du site.
- `docker-compose.yml` : lance le service frontend sur le port `8080`.
- `.dockerignore` : évite de copier des fichiers inutiles dans l'image Docker.

## Commande de lancement

```bash
docker compose up --build
```

Après le lancement, le site doit être accessible ici :

```text
http://localhost:8080
```

## Commande d'arrêt

```bash
docker compose down
```

## Limite actuelle

Docker n'est pas obligatoire pour visualiser le projet, car le site peut aussi être ouvert directement avec `index.html`.

Pour le moment, Docker sert surtout à montrer que je prépare une méthode de lancement plus professionnelle pour la suite du projet.

## Suite prévue

Quand le backend sera ajouté, je pourrai compléter Docker avec :

- un service `backend` ;
- un service de base de données ;
- des variables d'environnement ;
- une configuration plus proche du projet final.
