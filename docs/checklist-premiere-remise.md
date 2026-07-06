# Checklist avant remise DWWM

Cette checklist sert à vérifier le projet avant l'envoi ou la démonstration.

## Projet

- [ ] Les fichiers de travail sont à la racine du projet.
- [ ] `backend/` est présent.
- [ ] `docs/` est à jour.
- [ ] `dossier-professionel/` contient uniquement les documents DP.
- [ ] Le projet s'ouvre correctement côté frontend.

## Backend

- [ ] `npm install` exécuté dans `backend/`.
- [ ] `npm run dev` démarre le serveur.
- [ ] `GET /api/health` répond.
- [ ] `POST /api/auth/register` fonctionne.
- [ ] `POST /api/auth/login` fonctionne.
- [ ] `POST /api/reservations` fonctionne.
- [ ] `GET /api/reservations` refuse les visiteurs non authentifiés.
- [ ] `GET /api/reservations` refuse les utilisateurs non admin.
- [ ] `GET /api/reservations` répond pour un admin.

## Sécurité

- [ ] `.env` n'est pas versionné.
- [ ] `JWT_SECRET` existe en environnement.
- [ ] Aucun secret réel n'est dans le code.
- [ ] Les mots de passe sont hachés.
- [ ] Les routes admin sont protégées.
- [ ] Les requêtes SQL sont paramétrées.
- [ ] Helmet et rate limit sont activés.

## Documentation

- [ ] `api-routes.md` correspond au code.
- [ ] `architecture.md` correspond au projet.
- [ ] `auth-flow.md` explique JWT et admin.
- [ ] `erd.md` correspond aux tables actuelles.
- [ ] `mvc.md` correspond à la structure backend.
- [ ] `security.md` est prêt pour l'oral.

## Soutenance

- [ ] Une démonstration utilisateur est prête.
- [ ] Une démonstration admin est prête.
- [ ] Un compte admin existe dans la base.
- [ ] Les captures d'écran importantes sont prêtes.
- [ ] Le Dossier Professionnel est rempli avec des exemples du projet.

## Points à ne pas modifier juste avant l'examen

- Ne pas changer la structure des routes.
- Ne pas changer le secret JWT si une démonstration est déjà préparée.
- Ne pas modifier la base sans sauvegarde.
- Ne pas refactorer le frontend au dernier moment.
- Ne pas ajouter de framework sans nécessité.
