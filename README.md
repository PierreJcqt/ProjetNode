# Nom de votre projet

Projet Node

## Table des matières

- [Nom de votre projet](#nom-de-votre-projet)
  - [Table des matières](#table-des-matières)
  - [Installation et utilisation](#installation-et-utilisation)

## Installation et utilisation

1. Cloner le repository
2. Installer les dépendances avec "npm install"
3. Vous pouvez installer le package nodemon avec la commande  "npm install --dev".
4. Avant d'accéder à l'application, utilisez le fichier .env.example dans le répertoire racine.
  Dans ce nouveau fichier, ajoutez des variables spécifiques à l'environnement sur de nouvelles lignes sous la forme comme celle ci-dessous :

    DB_ADMIN_USERNAME='votre MongoDB id'
    DB_ADMIN_PASSWORD='votre mot de passe MongoDB pour accéder à votre cluster'
    SESSION_SECRET=VotreSecretDeSession
    
5. Lancer le serveur depuis le répertoire racine "ProjetNode" en utilisant "nodemon serve" ou "nodemon server.js".
6. Ouvrez votre navigateur à l'URL : http://localhost:3000/login pour accéder à l'appli et plus précisément la page de login.
