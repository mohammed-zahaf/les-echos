# TODO.md

## Améliorations des Bonnes Pratiques de Codage

### 1. Documentation
- [ ] Ajouter des commentaires explicatifs pour les fonctions complexes.
- [ ] Créer une documentation pour les APIs avec des outils comme Swagger.
- [ ] Documenter les grandes lignes de l'architecture du projet.

### 2. Tests
- [ ] Ajouter la couverture des tests unitaires.
- [ ] Intégrer des tests d'intégration.
- [ ] Ajouter des tests end-to-end pour les fonctionnalités critiques.

### 3. Gestion des Exceptions
- [ ] Mettre en place une gestion centralisée des erreurs.
- [ ] Ajouter des Logs appropriées pour les exceptions critiques.

## Améliorations d'Architecture

### 1. Modularisation
- [ ] Réorganiser le projet pour avoir une architecture plus modulaire.
- [ ] Isoler les différents modules pour faciliter la maintenance et l'évolution.

### 2. Performance
- [ ] Introduire du caching pour des ressources fréquemment accédées.

### 3. Sécurité
- [ ] Effectuer un audit de sécurité complet.
- [ ] Mettre en place des mécanismes de protection contre les attaques courantes (ex. XSS, CSRF).
- [ ] S'assurer que les données sensibles sont correctement chiffrées.

### 4. Scalabilité
- [ ] Analyser les points de contention et leur impact sur la performance.
- [ ] Mettre en place des mécanismes pour permettre la mise à l'échelle horizontale.
- [ ] Utiliser des services comme des queues ou des microservices pour améliorer la répartition de la charge.

## Refactoring

### 1. Code Legacy
- [ ] Identifier le code legacy à refactorer.
- [ ] Appliquer les principes SOLID sur les parties concernées.

### 2. Simplification du Code
- [ ] Simplifier les fonctions complexes en les divisant en sous-fonctions.
- [ ] Éliminer les redondances et les codes dupliqués.

## Test REST-API

### 1. Nommage
- [ ] Renommer les fichiers pour plus de clarté
- [ ] Supprimer les fichiers qui réalisent la meme chose
- [ ] Ajouter plus de cas de figure dans un meme fichier `.http`