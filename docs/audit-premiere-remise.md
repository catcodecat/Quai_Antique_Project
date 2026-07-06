# Audit de remise - Quai Antique

Ce document synthétise l'état actuel du projet pour préparer la soutenance DWWM.

## État actuel

Le projet contient :

- un frontend HTML/CSS/JavaScript ;
- un backend Node.js/Express ;
- une base PostgreSQL ;
- une authentification JWT ;
- une page d'administration ;
- une documentation technique.

## Points forts

- Projet complet frontend + backend.
- Architecture backend organisée en routes, controllers, repositories et middlewares.
- Mots de passe hachés avec bcrypt.
- JWT signé avec un secret d'environnement.
- Route de liste des réservations protégée par rôle admin.
- Requêtes SQL paramétrées.
- Documentation technique exploitable pour l'oral.

## Points d'attention

- Les réservations ne sont pas reliées à `users` par une clé étrangère.
- Le rôle admin doit être préparé en base avant la démonstration.
- Il n'y a pas de tests automatisés.
- La configuration Docker Compose doit être vérifiée avant utilisation.

## Priorités avant soutenance

1. Vérifier le lancement du frontend.
2. Vérifier le lancement du backend.
3. Vérifier une inscription.
4. Vérifier une connexion.
5. Vérifier une réservation.
6. Vérifier l'accès admin.
7. Vérifier que `.env` n'est pas dans Git.

## Utilisation pour le Dossier Professionnel

Ce projet permet d'illustrer :

- la création d'une interface web ;
- la création d'une API ;
- la gestion d'une base relationnelle ;
- l'authentification ;
- la sécurisation d'une route ;
- la documentation technique.
