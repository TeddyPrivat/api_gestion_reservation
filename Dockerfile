FROM node:lts-alpine

WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Ajoute la génération du client Prisma
RUN npx prisma generate

# Expose le port (ajuste si besoin)
EXPOSE 3000

# Lancement de l'app en mode dev (ou prod si tu préfères)
CMD [ "npm", "run", "dev" ]
