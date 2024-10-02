# Standards pour l'Intégration des Tests

## Introduction
Le standard en terme des tests et de suivre la pyramide des tests.
Elle se décline selon le fait de suivre cet ordre dans l'implémentation des tests :

## Types de Tests
Pour ma part, je privilégie toujours l'intégration des tests du plus fondamental aux plus fin des tests

### 1. Tests Unitaires
- **Les schémas**: vérifié que les schémas mongoose sont adapté aux usages avec des cas de données corrects et incorréctés
- **Les services**: des scénarios pour chaque fonction public d'un service
- **Fonctions utilitaires**: vérifier le bon fonctionnement des utilitaires, comme le hash des MDP, la génération des tokens, ...

### 2. Tests d'Intégration
Vérifier que les fonctionnalités adjacentes fournissent les résultats souhaités

- **Création d'une ressource**: le statut de réponse HTTP (201). la réponse contient les données souhaité.
- **Récupération d'une ressource**: le statut de réponse HTTP (200). Les données de l'utilisateur sont correctes et complètes.
- **Mise à jour d'une ressource**: le statut de réponse HTTP (200/204). Les modifications sont correctement reflétées lors de la récupération de l'utilisateur mis à jour.
- **Suppression d'une ressource**: le statut de réponse HTTP (204). Les modifications sont correctement reflétées lors de la récupération de l'utilisateur mis à jour.
- **Ainsi de suite**: autres cas de scénario.

### 3. Tests de bout en bout (End-to-End)
Faire des tests de feature complétes, qui doit valider l'ensemble d'une opération depuis le front à la DB.

- **Création d'un utilisateur**
- **Récupération d'un utilisateur**
- **Mise à jour d'un utilisateur**
- **Suppression d'un utilisateur**
- **Ainsi de suite**