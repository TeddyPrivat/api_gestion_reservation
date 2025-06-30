// Etape 1: Importer les dépendances
const express = require('express');

// Attention: le chemin d'import pour PrismaClient dépend de votre configuration.
// D'après votre schéma, il devrait être celui-ci.
const { PrismaClient } = require('./generated/prisma');

// Etape 2: Initialiser Express et Prisma
const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Etape 3: Middleware pour permettre à Express de lire le JSON des requêtes
app.use(express.json());

// Etape 4: Définir une première route "test"
app.get('/', (req, res) => {
    res.send('Hello World! Mon API fonctionne dans Docker !');
});

// Etape 5: Créer la route pour ajouter une nouvelle salle (Room)
// Correspond à POST /rooms dans le cahier des charges
app.post('/rooms', async (req, res) => {
    try {
        // On récupère les données envoyées dans le corps de la requête
        const { name, capacity, features, rules } = req.body;

        // On utilise Prisma pour créer une nouvelle "Room" dans la base de données
        const newRoom = await prisma.room.create({
            data: {
                name,
                capacity,
                features, // Sera une chaîne de caractères, ex: "TV,Tableau blanc"
                rules,    // Doit être un objet JSON, ex: { "allowWeekends": false }
            },
        });

        // On renvoie la nouvelle salle créée avec un statut 201 (Created)
        res.status(201).json(newRoom);
    } catch (error) {
        console.error("Erreur lors de la création de la salle :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de la salle." });
    }
});


// Etape 6: Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré et à l'écoute sur http://localhost:${port}`);
});