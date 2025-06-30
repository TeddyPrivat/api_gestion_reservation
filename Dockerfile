# Étape 1: Utiliser une image Node.js officielle comme base
# 'lts' signifie Long-Term Support, c'est une version stable.
FROM node:lts-alpine

# Étape 2: Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Étape 3: Copier les fichiers de dépendances
# On copie d'abord ces fichiers pour profiter du cache de Docker.
# Si ces fichiers ne changent pas, Docker n'exécutera pas l'étape `npm install` à chaque build.
COPY package*.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier le reste du code de l'application
COPY . .

# Étape 6: Exposer le port que votre application utilisera
# Assurez-vous que votre app Express écoute sur le port 3000
EXPOSE 3000

# Étape 7: La commande pour démarrer l'application
CMD [ "npm", "run", "dev" ]