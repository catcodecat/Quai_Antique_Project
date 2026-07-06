# Sécurité du projet - Synthèse DWWM

Ce document remplace l'ancienne note de sécurité prévue. Il décrit l'état actuel du projet.

Pour le détail complet, voir aussi : [security.md](security.md).

## Mesures déjà mises en place

- Mots de passe hachés avec `bcryptjs`.
- JWT signé avec `JWT_SECRET`.
- Absence de secret JWT codé en dur dans le backend.
- Route `GET /api/reservations` protégée par JWT et rôle `admin`.
- Middlewares `authenticateToken` et `requireAdmin`.
- Validation backend des réservations.
- Requêtes SQL paramétrées avec PostgreSQL.
- `helmet` activé.
- `express-rate-limit` activé.
- Limite JSON à `10kb`.
- `.env` ignoré par Git.
- Tableau admin rendu avec DOM API et `textContent` pour réduire le risque XSS.

## Points à expliquer à l'examen

Le projet distingue deux notions :

- authentification : vérifier qu'un utilisateur possède un JWT valide ;
- autorisation : vérifier que cet utilisateur possède le rôle `admin`.

La liste des réservations contient des données personnelles. Elle est donc accessible uniquement à un admin.

## Limites connues

- Le token est stocké dans `localStorage`, ce qui impose de rester vigilant contre les failles XSS.
- Il n'existe pas encore d'interface métier pour attribuer le rôle admin.
- Il n'y a pas encore de tests automatisés de sécurité.

## Améliorations futures

- Politique de mot de passe plus stricte.
- Tests automatisés pour les routes protégées.
- Gestion des rôles depuis une interface admin sécurisée.
- Cookies `HttpOnly` dans une version plus avancée.
