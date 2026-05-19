# Sécurité prévue - Quai Antique

## État actuel

Pour cette première remise, le projet est encore un site statique en HTML, CSS et JavaScript. Il n'y a pas encore de backend, donc il n'y a pas encore de vraie gestion de comptes, de mots de passe ou de base de données.

Je prépare quand même cette documentation pour expliquer les mesures de sécurité que je devrai ajouter dans la suite du projet.

## Mots de passe

Quand l'inscription sera développée côté backend, je ne devrai jamais stocker les mots de passe en clair.

Je prévois d'utiliser `bcrypt` pour hasher les mots de passe avant de les enregistrer en base de données.

## Authentification

Pour la connexion, je prévois deux possibilités :

- utiliser un token JWT ;
- ou utiliser une session serveur.

Le choix final dépendra de l'organisation du backend. Dans les deux cas, l'objectif sera de vérifier qu'un utilisateur est bien connecté avant d'accéder à certaines routes.

## Rôles utilisateur et administrateur

Je prévois d'ajouter un rôle pour différencier :

- les clients ;
- l'administrateur du restaurant.

Les routes d'administration devront être protégées. Par exemple, seul l'administrateur pourra modifier les plats, les menus, les horaires et voir toutes les réservations.

## Variables d'environnement

Les informations sensibles ne doivent pas être écrites directement dans le code.

Je prévois d'utiliser un fichier `.env` pour stocker :

- l'URL de la base de données ;
- le secret JWT ;
- le port du serveur ;
- les paramètres liés à l'environnement.

Le fichier `.env` ne doit pas être envoyé sur GitHub. Pour expliquer les variables attendues, j'ai ajouté un fichier `.env.example`.

## Validation des formulaires

Je devrai vérifier les données envoyées par les formulaires :

- email valide ;
- mot de passe assez long ;
- date de réservation correcte ;
- nombre de personnes cohérent ;
- champs obligatoires remplis.

La validation devra être faite côté frontend pour aider l'utilisateur, mais aussi côté backend pour sécuriser réellement l'application.

## Protection CORS

Quand le backend sera créé, je devrai configurer CORS pour autoriser seulement le frontend à appeler l'API.

En développement, l'origine pourra être par exemple :

```text
http://localhost:5173
```

## Protection contre les injections

Pour éviter les injections SQL ou NoSQL, je devrai utiliser des requêtes préparées ou un ORM. Je devrai aussi éviter de construire des requêtes directement avec du texte venant des formulaires.

## Données sensibles sur GitHub

J'ai ajouté `.env` dans le fichier `.gitignore` pour éviter d'envoyer les vraies variables secrètes sur GitHub.

Le fichier `.env.example` sert seulement d'exemple et ne contient pas de vraie clé secrète.

## Prochaines étapes sécurité

1. Créer le backend Express.
2. Ajouter `bcrypt` pour les mots de passe.
3. Ajouter JWT ou session.
4. Protéger les routes administrateur.
5. Valider toutes les données reçues.
6. Tester les accès non autorisés.
