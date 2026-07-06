# Évolutions backend futures

Le backend Express existe déjà. Ce document ne décrit donc pas un backend à créer, mais les améliorations possibles après la version actuelle.

## État actuel

Le backend comprend :

- routes Express ;
- controllers ;
- repositories SQL ;
- connexion PostgreSQL ;
- authentification JWT ;
- hachage bcrypt ;
- route admin protégée ;
- validation backend des réservations ;
- sécurité Express avec Helmet et rate limit.

## Améliorations possibles

### Réservations

- Ajouter un champ téléphone.
- Lier les réservations aux utilisateurs via `user_id`.
- Ajouter la modification du statut d'une réservation.
- Ajouter l'annulation d'une réservation.

### Administration

- Créer des routes dédiées `/api/admin/...`.
- Ajouter une interface pour gérer les rôles.
- Ajouter la gestion des plats, menus et horaires.

### Base de données

- Remplacer `CREATE TABLE IF NOT EXISTS` par des migrations versionnées.
- Ajouter des contraintes sur `role` et `status`.
- Ajouter des index si le volume de données augmente.

### Qualité

- Ajouter des tests automatisés.
- Ajouter des tests d'API pour les routes protégées.
- Ajouter une documentation OpenAPI ou Swagger.

## Intérêt pour le DWWM

Ce document montre que le projet actuel est fonctionnel, tout en identifiant des axes d'amélioration réalistes et professionnels.
