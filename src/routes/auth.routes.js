import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Exemple de route protégée
router.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
