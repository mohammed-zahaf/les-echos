<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Les Echos

## Description
"Les Echos" est une application Node.js qui gère l'authentification et les autorisations des utilisateurs, avec des capacités d'intégration via API. Le projet utilise NestJS pour la structure du serveur et inclut des fonctionnalités telles que JWT pour la gestion des tokens et Redis pour le stockage temporaire des données.

## Table des Matières
- [Structure du Projet](#structure-du-projet)
- [Technologies Employées](#technologies-employées)
- [Configuration](#configuration)
- [Installation](#installation)
- [Désinstallation](#désinstallation)
- [Docker](#docker)
- [API Documentation](#api-documentation)

## Structure du Projet
Voici un aperçu des répertoires et des fichiers importants du projet :

- `src/`
    - `app.module.ts` : Point d'entrée principal du module de l'application.
    - `auth/`
        - `auth.controller.ts` : Contrôleur pour les opérations d'authentification.
        - `auth.module.ts` : Module d'authentification.
        - `auth.service.ts` : Service pour les opérations d'authentification.
        - `jwt-auth.guard.ts` : Guard pour la protection des routes en utilisant JWT.
        - `jwt.strategy.ts` : Stratégie JWT pour la gestion des tokens.
        - `roles/` : Garde et décorateurs pour les rôles des utilisateurs.
    - `user/`
        - `user.controller.ts` : Contrôleur pour les opérations utilisateur.
        - `user.module.ts` : Module utilisateur.
        - `user.service.ts` : Service pour les opérations utilisateur.
        - `schemas/` : Schémas de la base de données pour les utilisateurs.
        - `dto/` : Data Transfer Objects pour les utilisateurs.

- `Dockerfile` : Fichier de configuration Docker pour construire l'image du conteneur.
- `docker-compose.yml` : Fichier de configuration Docker Compose pour gérer les services conteneurisés.
- `package.json` : Dépendances du projet et scripts.
- `config.env` : Variables d'environnement pour la configuration locale.
- `docker.config.env` : Variables d'environnement pour la configuration Docker.

## Technologies Employées

Hormis les technolgies de base (Node, Nest, TypeScript), le projet "Les Echos" utilise un ensemble de technologies modernes pour fournir une application performante et sécurisée.
Voici un aperçu des principales technologies et bibliothèques employées :

### JWT (JSON Web Tokens)

- **Description**: JWT est une méthode de gestion de sessions par token, utilisée pour sécuriser les échanges entre client et serveur, notamment pour les authentifications.
- **Site Web**: [JWT](https://jwt.io/)

### Redis

- **Description**: Redis est une base de données en mémoire clé-valeur, utilisée principalement pour la mise en cache et la gestion de sessions temporaires.
- **Site Web**: [Redis](https://redis.io/)

### Docker

- **Description**: Docker permet de créer, déployer et exécuter des applications dans des conteneurs, assurant un environnement consistant du développement à la production.
- **Site Web**: [Docker](https://www.docker.com/)

### Docker Compose

- **Description**: Docker Compose est un outil qui permet de définir et de lancer des applications multi-conteneurs. Utilisé ici pour gérer les services Redis et Node.js ensemble.
- **Site Web**: [Docker Compose](https://docs.docker.com/compose/)

### Express

- **Description**: Express est un framework web pour Node.js, utilisé pour construire des API robustes et performantes. Intégré via NestJS pour gérer les requêtes HTTP.
- **Site Web**: [Express](https://expressjs.com/)

### Mongoose

- **Description**: Mongoose est une bibliothèque ODM (Object Data Modeling) pour MongoDB et Node.js, elle permet de gérer les relations entre données et de valider les schémas avec plus de flexibilité.
- **Site Web**: [Mongoose](https://mongoosejs.com/)

### Environnement de Développement (IDE)

- **IntelliJ IDEA 2024.2.3 Ultimate Edition**: Utilisé pour sa robustesse et ses fonctionnalités avancées, facilitant la navigation et la gestion des projets complexes.

### Autres Bibliothèques et Outils

- **bcryptjs**: Pour le hachage des mots de passe.
- **@nestjs/class-validator**: Pour la validation des DTOs.
- **@nestjs/passport** et **passport-jwt**: Pour l'intégration de la stratégie JWT avec NestJS.
- **Dotenv**: Pour la gestion des variables d'environnement.
- **depcheck**: Pour l'identification des dépendances non utilisées. Installé comme outil de développement.

## Configuration
- il faut s'assurer de configurer au besoin l'un des deux fichiers pour lancer le projet.
- à noté que le projet peux être lancé sans faire la configuration du fait d'utiliser les configurations par défaut.

### Local
- `config.env` : il s'agit du fichier de configuration pour l'execution du projet sur une machine local

> Si le choix est d'executer le projet localement, il faut penser à installer le serveur Redis et Mongodb.
>
> [Cf. la section installation](#installation)

### Container
- `docker.config.env` : il s'agit du fichier de configuration pour l'execution du projet sur une machine local

> c'est le choix le plus pratique tout est déjà automatisé, juste tester le projet.
>
> [Cf. la section Docker](#docker-1)

```env
# config.env

PORT=3000
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379

# docker.config.env

PORT=3000
JWT_SECRET=your_jwt_secret
REDIS_HOST=redis
REDIS_PORT=6379
```

## Installation
Pour installer les dépendances du projet localement, exécutez :
> Je recommande d'utiliser la version [Docker](#docker-1) pour la simplicité d'usage

```bash
npm install
```

## Désinstallation
Pour désinstaller le projet (version docker), exécutez :

```bash
docker-compose down --remove-orphans # arrêt des services et supprimer les conteneur
docker volume rm mongo-data # supprime le volume de donnée
docker ps # vérifier les conteneurs
```

## Docker
Pour construire et lancer les conteneurs Docker, exécutez :

```bash
sudo apt install docker-compose # Pour les distribution basé sur Debian
docker-compose up --build
```

## API Documentation
Pour simplifier l'utilisation de l'API, la route `/users#POST` est ouverte pour pouvoir créer les premiers utilisateurs.
Les REST-API peuvent être testées en utilisant les fichiers `.http` présents dans le projet.
Elles sont localisé dans le dossier `scratches` à la racine.
Voici quelques exemples de requêtes :

- Créer un utilisateur : `scratches/users/create-user-api.http`
- Se connecter : `scratches/auth/login-user-api.http`
- Se déconnecter : `scratches/auth/logout-api.http`
- [USER] Mettre à jour un utilisateur : `scratches/users/update-me-api.http`
- [ADMIN] Mettre à jour un utilisateur : `scratches/users/update-admin-api.http`
- Filtrage et tri des utilisateurs : `scratches/users/get-filtered-users-api.http`
- ...

## Contributeurs
- Mohammed ZAHAF.