# Quai Antique

## Présentation du projet

Je réalise ce projet dans le cadre de ma formation. L'objectif est de créer le site web du restaurant fictif **Quai Antique**, avec une première version visible par le professeur et une base claire pour continuer le développement.

Pour le moment, le projet est surtout une maquette fonctionnelle en HTML, CSS et JavaScript. Il présente les pages principales du site : accueil, galerie, carte, réservation, connexion et inscription.

## Contexte pédagogique

Ce projet me permet de travailler plusieurs points importants :

- organiser un petit projet web ;
- créer des pages HTML structurées ;
- mettre en place un style responsive avec CSS ;
- ajouter un peu d'interactivité avec JavaScript ;
- préparer une documentation simple pour expliquer mon travail ;
- réfléchir à la suite du projet avec un backend, une base de données, Docker et la sécurité.

## Objectifs

Les objectifs du site sont :

- présenter le restaurant Quai Antique ;
- afficher une galerie d'images ;
- afficher une carte avec entrées, plats et desserts ;
- proposer un formulaire de réservation ;
- préparer un espace utilisateur avec connexion et inscription ;
- prévoir plus tard un espace administrateur.

## Technologies utilisées

Pour cette première version, j'utilise :

- **HTML5** pour la structure des pages ;
- **CSS3** pour le style, les grilles, les flexbox et l'adaptation mobile ;
- **JavaScript** pour les onglets du menu et les messages après les formulaires ;
- **Docker** avec Nginx pour pouvoir lancer le site statique dans un conteneur ;
- **Node.js** uniquement pour les scripts de génération de présentation déjà présents dans le projet.

Le frontend n'est pas encore en React/Vite. Pour la suite, je prévois de migrer progressivement vers React + Vite pour mieux organiser les composants et les pages.

## Structure du projet

```text
Quai_Antique_Project/
├── assets/
│   └── images/
├── presentation/
│   ├── screenshots/
│   ├── explanation.md
│   └── fichiers de présentation
├── docs/
│   └── audit-premiere-remise.md
├── app.js
├── gallery.html
├── index.html
├── login.html
├── menu.html
├── register.html
├── reservation.html
├── styles.css
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Installation

Pour ouvrir le projet sans Docker, il suffit de cloner ou télécharger le dossier, puis d'ouvrir le fichier `index.html` dans un navigateur.

Si les dépendances Node sont nécessaires pour les fichiers de présentation :

```bash
npm install
```

## Lancement du frontend

Version simple :

```text
Ouvrir index.html dans le navigateur.
```

Les autres pages sont accessibles depuis le menu de navigation.

## Lancement du backend

Le backend n'est pas encore développé dans cette première version.

Pour la suite du projet, je prévois une architecture simple avec **Node.js** et **Express** :

- routes API pour les réservations ;
- routes API pour les menus et les plats ;
- inscription et connexion utilisateur ;
- authentification avec JWT ou session ;
- espace administrateur pour gérer les menus, horaires et réservations.

## Lancement avec Docker

Docker sert ici à lancer le site statique dans un environnement plus propre, avec un serveur Nginx.

```bash
docker compose up --build
```

Le site sera disponible sur :

```text
http://localhost:8080
```

Pour arrêter :

```bash
docker compose down
```

## Base de données prévue

La base de données n'est pas encore créée. Pour la suite, je prévois les tables suivantes :

- `utilisateurs` : informations des clients et administrateurs ;
- `reservations` : date, heure, nombre de personnes, allergies, utilisateur lié ;
- `menus` : menus proposés par le restaurant ;
- `plats` : entrées, plats, desserts, prix et description ;
- `horaires` : jours et heures d'ouverture ;
- `avis` : avis laissés par les clients.

Relations prévues :

- un utilisateur peut avoir plusieurs réservations ;
- un menu peut contenir plusieurs plats ;
- un avis peut être lié à un utilisateur ;
- les horaires peuvent être utilisés pour contrôler les créneaux de réservation.

## Sécurité prévue

La sécurité n'est pas encore complète car le backend n'est pas encore présent. Pour la suite, je dois prévoir :

- hash des mots de passe avec `bcrypt` ;
- authentification avec JWT ou session ;
- variables d'environnement avec un fichier `.env` non envoyé sur GitHub ;
- validation des formulaires côté frontend et backend ;
- configuration CORS ;
- protection contre les injections SQL ou NoSQL ;
- gestion des rôles utilisateur et administrateur ;
- vérification que les données sensibles ne sont pas dans le dépôt GitHub.

J'ai aussi préparé un document plus détaillé ici : `docs/securite-prevue.md`.

## Backend futur

Le backend n'est pas encore codé pour cette première remise. J'ai préparé une documentation séparée pour expliquer l'architecture prévue, les routes API et l'organisation future : `docs/backend-futur.md`.

## GitHub

Le projet doit être versionné avec Git. J'ai ajouté un fichier `.gitignore` pour éviter d'envoyer les fichiers inutiles ou sensibles, comme `node_modules`, `.env` ou les dossiers de build.

Pour initialiser le dépôt :

```bash
git init
git add .
git commit -m "Initialisation du projet Quai Antique"
```

Ensuite, je pourrai créer un dépôt GitHub et pousser le projet dessus.

## État actuel du projet

Actuellement, j'ai développé la partie visible du site avec les pages principales. La navigation fonctionne, les pages sont reliées entre elles, la carte utilise des onglets en JavaScript et les formulaires affichent un message après l'envoi.

Ce qui fonctionne :

- page d'accueil ;
- galerie ;
- carte avec catégories ;
- formulaire de réservation ;
- pages connexion et inscription ;
- responsive de base ;
- captures d'écran et fichiers de présentation.

Ce qui reste à terminer :

- créer un vrai frontend React/Vite ;
- créer le backend Express ;
- brancher les formulaires sur une API ;
- créer la base de données ;
- ajouter l'authentification ;
- créer l'espace administrateur ;
- améliorer la validation des formulaires ;
- préparer le déploiement final.

## Difficultés rencontrées

La principale difficulté est de bien organiser le projet pour qu'il puisse évoluer. La première version statique permet de montrer l'interface, mais il faut maintenant ajouter une vraie logique côté serveur et une base de données.

## Améliorations futures

Les prochaines étapes sont :

- migrer le frontend vers React + Vite ;
- découper l'interface en composants ;
- ajouter un backend Node.js/Express ;
- créer la base de données ;
- sécuriser les comptes utilisateurs ;
- ajouter un tableau de bord administrateur ;
- préparer un vrai déploiement.

## Déploiement

Le projet n'est pas encore déployé en ligne. Pour l'instant, il peut être lancé localement avec les fichiers HTML ou avec Docker.
