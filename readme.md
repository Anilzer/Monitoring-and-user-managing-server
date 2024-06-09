Application de monitoring de température et d'humidité dans une salle de serveur

    Description
        - Ce projet est une application de surveillance en temps réel construite avec Node.js, Express, Socket.IO et MongoDB. Elle permet aux utilisateurs de s'inscrire, de se connecter et de surveiller en temps réel les données provenant de divers capteurs.

    Fonctionnalités
        - Inscription et authentification des utilisateurs,
        - Surveillance en temps réel des données,
        - Alertes en cas de lectures anormales des capteurs,
        - Authentification sécurisée des utilisateurs basée sur des jetons à l'aide de JWT signés avec RSA
        - Intégration de MongoDB pour le stockage des données comme le mot de passe qui est hashé et salée avant don enregistrement dans la DB ;

    Fonctionnement
        - Pour la configuration initiale, il faut initialiser le projet en créant le dossier de travail ici appelé Node_TP. Ensuite j'ai créé un dossier class dans lequel se fera la configuration du serveur pour la gestion des accès utilisateur .
        - Installations des dépendances
            npm install express mongoose socket.io bcryptjs express-validator jsonwebtoken dotenv
            npm install --save-dev nodemon

        - Configurer nodemon pour le développement :
            // package.json
            "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js"
            }
        - Création du server.js, des modèles, des routes & services.
    Pour lancer l'application, faire node server.js tout en vérifiant si on es bien dans le répertoire qu'il faut

    Contributions
    Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request pour toute amélioration ou nouvelle fonctionnalité que vous jugerez utile
