
# DataView - Simplifier l'accès aux informations démographiques

## Table des Matières
- [Aperçu](#aperçu)
- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [Captures d'Écran](#captures-décran)


## Aperçu
DataView est une application conçue pour faciliter l'accès aux informations démographiques. Elle permet aux utilisateurs de consulter et d'analyser des données sur la population à partir d'une interface intuitive.

## Technologies Utilisées
### Frontend
- **React.js**
- **Tailwind CSS**
- **Vite (template)**

### Backend
- **Node.js**
- **Express.js**
- **SQL**

## Prérequis
- **Node.js** 
- **npm** 
- **SQL**

## Installation
1. **Cloner le dépôt :**
   \```bash
   git clone https://github.com/votre-depot-github/DataView.git
   cd op-app-V4
   \```

2. **Installer les dépendances pour le frontend :**
   \```bash
 cd op-app-V4/client
   npm install
   \```

3. **Installer les dépendances pour le backend :**
   \```bash
 cd op-app-V4/server
   npm install
   \```

## Utilisation
1. **Configurer la base de données :**
   - Assurez-vous que votre serveur SQL est en cours d'exécution.
   - Créez une base de données et configurez les variables d'environnement dans le fichier `.env` situé dans le répertoire `backend` :
     \```
     DB_HOST=localhost
     DB_USER=votre_nom_utilisateur
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=nom_de_votre_base_de_données
     \```

2. **Démarrer le backend :**
   \```bash
   cd op-app-V4/server/projet/
   node app.js
   \```

3. **Démarrer le frontend :**
   \```bash
   cd ../client
   npm run dev
   \```

4. **Accéder à l'application :**
   - Ouvrez votre navigateur et allez à `http://localhost:5173`

## Fonctionnalités
- Accès rapide et intuitif aux données démographiques
- Visualisation interactive des statistiques
- Filtrage avancé pour des analyses personnalisées
- Exportation de rapports en divers formats

## Captures d'Écran
### Tableau de Bord Principal
![Tableau de Bord Principal](./op-app-v4/image/screen-shoot.png)

