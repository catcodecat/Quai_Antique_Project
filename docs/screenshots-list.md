# Liste des captures d'écran - Présentation DWWM

Ce document aide à préparer les captures utiles pour la soutenance et le Dossier Professionnel.

## Captures fonctionnelles à préparer

| Code | Page | Objectif |
|---|---|---|
| D01 | Accueil | Montrer l'identité du restaurant |
| D02 | Galerie | Montrer les images et le responsive |
| D03 | Carte | Montrer les onglets JavaScript |
| D04 | Réservation | Montrer le formulaire |
| D05 | Connexion | Montrer l'accès utilisateur |
| D06 | Inscription | Montrer la création de compte |
| D07 | Navigation connectée | Montrer l'état connecté |
| D08 | Administration | Montrer le tableau des réservations |

## Captures techniques à préparer

| Code | Fichier | Élément à montrer |
|---|---|---|
| C01 | `backend/src/controllers/auth.controller.js` | bcrypt + JWT |
| C02 | `backend/src/middlewares/auth.middleware.js` | `authenticateToken` et `requireAdmin` |
| C03 | `backend/src/routes/reservation.routes.js` | Route admin protégée |
| C04 | `backend/src/repositories/user.repository.js` | Requête SQL paramétrée |
| C05 | `backend/src/controllers/reservation.controller.js` | Validation backend |
| C06 | `backend/src/app.js` | Helmet, rate limit, CORS |
| C07 | `admin.html` | Envoi du token Bearer |

## Diagrammes utiles

| Code | Sujet |
|---|---|
| G01 | Architecture globale |
| G02 | ERD PostgreSQL |
| G03 | Flux d'authentification JWT |
| G04 | Flux admin protégé |
| G05 | Architecture MVC backend |

## Priorité pour l'oral

Indispensables :

- accueil ;
- réservation ;
- connexion ;
- administration ;
- auth controller ;
- middleware admin ;
- ERD ;
- architecture globale.

Bonus :

- captures mobile ;
- captures de déploiement ;
- captures Git/GitHub ;
- timeline d'évolution du projet.

## Dossier de destination conseillé

```text
presentation/screenshots/
```

Les captures utilisées dans le Dossier Professionnel doivent être lisibles, récentes et cohérentes avec l'état actuel du code.
