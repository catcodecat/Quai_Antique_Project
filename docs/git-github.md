# Git et GitHub - Quai Antique

Ce document explique l'utilisation de Git dans le projet et les points à vérifier avant la remise.

## Objectifs

Git permet de :

- suivre l'évolution du projet ;
- conserver un historique des changements ;
- montrer une démarche professionnelle ;
- faciliter le déploiement depuis un dépôt distant.

## Fichiers sensibles

Le fichier `.gitignore` doit exclure :

```text
node_modules/
.env
.env.*
dist/
build/
coverage/
*.log
```

Le fichier `.env.example` peut être versionné car il ne contient pas de secret réel.

## Commandes utiles

```bash
git status
git add .
git commit -m "docs: update DWWM documentation"
git log --oneline
```

## Vérifications avant remise

- Le dépôt ne contient pas de `.env`.
- Les documents utiles sont versionnés.
- Les fichiers générés inutiles ne polluent pas le dépôt.
- Le `git status` est compréhensible.
- Le README explique comment lancer le projet.

## Intérêt pour le DWWM

Git montre la capacité à travailler avec un outil professionnel de versioning. Pendant l'oral, il est utile d'expliquer :

- les étapes principales du projet ;
- les corrections réalisées ;
- les choix techniques ;
- la façon dont le projet a évolué.
