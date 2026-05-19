# Audit de première remise - Quai Antique

## 1. Résumé général du projet

J'ai vérifié l'état actuel du projet Quai Antique pour préparer une première remise au professeur. Le projet existe déjà sous forme de site statique avec plusieurs pages HTML, une feuille de style CSS, un fichier JavaScript, des images, des captures d'écran et une présentation.

Pour l'instant, le projet montre bien l'interface du restaurant, mais il n'a pas encore de backend, de base de données, d'authentification réelle ni d'espace administrateur. Il s'agit donc d'une première version de travail, encore en cours de développement.

## 2. Structure du projet

### Ce qui existe déjà

- `index.html` : page d'accueil.
- `gallery.html` : galerie.
- `menu.html` : carte du restaurant.
- `reservation.html` : formulaire de réservation.
- `login.html` : connexion.
- `register.html` : inscription.
- `styles.css` : styles du site.
- `app.js` : interactivité simple.
- `assets/images/` : images du site.
- `presentation/` : fichiers de présentation, PDF, PPTX, captures d'écran.
- `package.json` et `package-lock.json` : dépendances pour les scripts de présentation.
- `README.md` : documentation principale mise à jour.
- `.gitignore` : fichier ajouté pour protéger les fichiers inutiles ou sensibles.
- `Dockerfile` et `docker-compose.yml` : configuration Docker minimale ajoutée.

### Ce qui manque encore

- dossier `frontend/` séparé ;
- dossier `backend/` ;
- application React/Vite ;
- API Express ;
- base de données ;
- système d'authentification ;
- espace administrateur ;
- fichier `.env.example` ;
- tests.

## 3. Frontend

Le frontend actuel est construit avec HTML, CSS et JavaScript classique. Il n'utilise pas encore React ni Vite.

### Ce qui est déjà prêt

- les pages principales existent ;
- la navigation entre les pages fonctionne ;
- les styles sont regroupés dans `styles.css` ;
- le site possède une adaptation mobile avec une media query ;
- les images sont locales ;
- les onglets de la carte fonctionnent avec JavaScript ;
- les formulaires affichent un message après envoi.

### Ce qui reste à améliorer

- passer le frontend en React + Vite ;
- créer des composants réutilisables comme `Header`, `Footer`, `Button`, `MenuTabs`, `ReservationForm` ;
- créer une vraie organisation avec `src/pages`, `src/components`, `src/assets` ;
- ajouter React Router pour la navigation ;
- brancher les formulaires sur le backend ;
- améliorer la validation des champs ;
- vérifier le responsive sur plusieurs tailles d'écran.

### Proposition React/Vite

Pour la suite, je peux créer une structure comme ceci :

```text
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Cette structure sera plus propre pour continuer le projet, surtout quand le backend sera ajouté.

## 4. Backend

Il n'y a pas encore de backend dans le projet.

### Proposition d'architecture

Je prévois d'utiliser Node.js avec Express :

```text
backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── package.json
└── .env.example
```

### Routes API prévues

- `POST /api/auth/register` : inscription.
- `POST /api/auth/login` : connexion.
- `GET /api/menus` : liste des menus.
- `GET /api/plats` : liste des plats.
- `POST /api/reservations` : création d'une réservation.
- `GET /api/admin/reservations` : liste des réservations côté admin.
- `POST /api/admin/plats` : ajout d'un plat côté admin.
- `PUT /api/admin/plats/:id` : modification d'un plat.
- `DELETE /api/admin/plats/:id` : suppression d'un plat.

## 5. Base de données

La base de données n'est pas encore présente.

### Tables prévues

- `utilisateurs`
- `reservations`
- `menus`
- `plats`
- `horaires`
- `avis`

### Relations prévues

- un utilisateur peut faire plusieurs réservations ;
- une réservation appartient à un utilisateur, sauf si je décide aussi d'autoriser les réservations invitées ;
- un menu peut contenir plusieurs plats ;
- un plat peut appartenir à une catégorie comme entrée, plat ou dessert ;
- un avis peut être lié à un utilisateur ;
- les horaires permettent de contrôler les créneaux disponibles.

## 6. Docker

Docker n'était pas présent au départ. J'ai ajouté une configuration minimale :

- `Dockerfile` pour servir le site statique avec Nginx ;
- `docker-compose.yml` pour lancer le site sur le port `8080`.

Commande :

```bash
docker compose up --build
```

Docker me permet de lancer le projet dans un environnement plus stable, sans dépendre uniquement de l'ouverture directe du fichier HTML.

## 7. Sécurité

La sécurité n'est pas encore vraiment mise en place, car il n'y a pas encore de backend.

### Points à ajouter

- utiliser `bcrypt` pour les mots de passe ;
- utiliser JWT ou des sessions pour la connexion ;
- créer un fichier `.env` pour les variables sensibles ;
- ne pas envoyer `.env` sur GitHub ;
- valider les formulaires côté client et côté serveur ;
- configurer CORS ;
- protéger les routes administrateur ;
- éviter les injections en utilisant un ORM ou des requêtes préparées ;
- vérifier les rôles utilisateur et administrateur.

## 8. Git / GitHub

La commande `git status` indique que le dossier actuel n'est pas encore un dépôt Git. Il faut donc initialiser Git avant la remise ou avant de pousser sur GitHub.

Commandes prévues :

```bash
git init
git add .
git commit -m "Initialisation du projet Quai Antique"
```

Ensuite, je pourrai relier le projet à un dépôt GitHub.

Le fichier `.gitignore` a été ajouté pour éviter d'envoyer `node_modules`, `.env`, les logs et les fichiers de build.

## 9. Documentation

Le README a été amélioré pour expliquer le projet comme un travail étudiant en cours de développement.

Il contient maintenant :

- présentation du projet ;
- contexte pédagogique ;
- objectifs ;
- technologies utilisées ;
- structure du projet ;
- installation ;
- lancement frontend ;
- lancement backend prévu ;
- lancement Docker ;
- état actuel du projet ;
- améliorations futures ;
- GitHub ;
- déploiement.

## 10. État actuel du projet

Actuellement, j'ai une première version visible du site Quai Antique. Les pages principales sont créées et reliées entre elles. L'accueil présente le restaurant, la galerie montre des images, la carte affiche les catégories de plats et la réservation contient un formulaire.

Ce qui fonctionne actuellement :

- la navigation entre les pages ;
- l'affichage des contenus ;
- les images locales ;
- les onglets de la carte ;
- les messages après envoi des formulaires ;
- l'adaptation mobile de base ;
- les fichiers de présentation.

Ce qui reste à terminer :

- migrer vers React/Vite ;
- développer le backend Express ;
- créer une base de données ;
- connecter les formulaires à l'API ;
- ajouter une vraie authentification ;
- créer l'espace administrateur ;
- ajouter la sécurité ;
- préparer un déploiement final.

### Difficultés rencontrées

La difficulté principale est que le projet a commencé comme un site statique. C'est utile pour montrer l'interface, mais il faut maintenant organiser le projet pour ajouter le backend, la base de données et la sécurité sans tout mélanger.

### Améliorations prévues

Je prévois de transformer progressivement le projet en application plus complète. Je veux garder les pages existantes comme base visuelle, puis les intégrer dans un frontend React/Vite et ajouter une API Express.

### Prochaines étapes

1. Initialiser Git.
2. Créer une branche de travail.
3. Mettre en place `frontend/` avec React/Vite.
4. Créer `backend/` avec Express.
5. Ajouter la base de données.
6. Brancher les formulaires.
7. Ajouter l'authentification.
8. Préparer une deuxième vérification avant la remise finale.

## 11. Problèmes détectés

- Le projet n'est pas encore un dépôt Git.
- Le frontend est encore statique.
- Il n'y a pas de backend.
- Il n'y a pas de base de données.
- Les formulaires ne sauvegardent pas encore les données.
- La connexion et l'inscription ne sont pas fonctionnelles côté serveur.
- Il n'y a pas encore de vraie sécurité.
- Il n'y a pas encore de tests.
- Le fichier `package.json` sert surtout aux fichiers de présentation et pas encore au lancement du site.

## 12. Fichiers à créer ensuite

- `frontend/`
- `backend/`
- `backend/src/server.js`
- `backend/src/routes/`
- `backend/src/controllers/`
- `backend/src/middlewares/`
- `backend/.env.example`
- `database/schema.sql` ou configuration ORM
- `docs/schema-base-de-donnees.md`
- `docs/securite.md`

## 13. Plan d'amélioration avant la remise

1. Corriger les détails de texte si nécessaire.
2. Initialiser Git et faire un premier commit propre.
3. Vérifier l'affichage dans le navigateur.
4. Tester le lancement Docker.
5. Préparer une courte explication orale du projet.
6. Ajouter ensuite React/Vite et Express pour la suite du développement.

## 14. README prêt à utiliser

Le fichier `README.md` a été préparé pour la première correction. Il explique clairement l'état actuel du projet et ce qui reste à faire, avec un ton d'étudiant.

## 15. Documentation prête pour la première correction professeur

Pour la première correction, je peux fournir :

- le code actuel du site ;
- le README ;
- ce rapport d'audit ;
- les captures d'écran dans `presentation/screenshots/` ;
- la présentation PDF/PPTX déjà présente dans `presentation/`.
