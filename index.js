import authRoutes from "./src/routes/auth.routes.js";
import roomRoutes from "./src/routes/room.routes.js";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! Mon API fonctionne dans Docker !");
});

// Etape 5: Créer la route pour ajouter une nouvelle salle (Room)
// Correspond à POST /rooms dans le cahier des charges
// app.post("/rooms", async (req, res) => {
//   try {
//     // On récupère les données envoyées dans le corps de la requête
//     const { name, capacity, features, rules } = req.body;
//
//     // On utilise Prisma pour créer une nouvelle "Room" dans la base de données
//     const newRoom = await prisma.room.create({
//       data: {
//         name,
//         capacity,
//         features,
//         rules,
//       },
//     });
//
//     // On renvoie la nouvelle salle créée avec un statut 201 (Created)
//     res.status(201).json(newRoom);
//   } catch (error) {
//     console.error("Erreur lors de la création de la salle :", error);
//     res.status(500).json({
//       error: "Une erreur est survenue lors de la création de la salle.",
//     });
//   }
// });

app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
// Etape 6: Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré et à l'écoute sur http://localhost:${port}`);
});
