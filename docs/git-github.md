# Git et GitHub - Quai Antique

## Objectif

J'utilise Git pour garder un historique de mon projet Quai Antique. Cela me permet de suivre les étapes de mon travail et de montrer au professeur comment le projet évolue.

GitHub servira ensuite à sauvegarder le projet en ligne et à le partager plus facilement.

## État actuel

Le dépôt Git est initialisé dans le dossier du projet. Un premier commit a été créé pour préparer la première remise.

## Fichiers ignorés

J'ai ajouté un fichier `.gitignore` pour éviter d'envoyer certains fichiers inutiles ou sensibles :

- `node_modules/`
- `.env`
- fichiers de logs ;
- dossiers de build ;
- fichiers temporaires ;
- fichiers propres à l'éditeur ou au système.

## Commandes utilisées

```bash
git init
git add .
git commit -m "Preparation premiere remise Quai Antique"
```

## Utilisation prévue de GitHub

Pour la suite, je prévois de créer un dépôt GitHub, puis d'envoyer mon projet avec :

```bash
git remote add origin URL_DU_DEPOT
git branch -M main
git push -u origin main
```

## Explication pour la remise

Pour cette première correction, je peux expliquer que Git me sert à garder une trace propre de mon travail. Le fichier `.gitignore` montre aussi que je fais attention à ne pas envoyer les fichiers sensibles comme `.env`.
