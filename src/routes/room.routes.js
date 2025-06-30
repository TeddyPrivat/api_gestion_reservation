import {authenticateToken} from "../middlewares/auth.middleware.js";
import {isAdmin} from "../middlewares/isAdmin.middleware.js";
import {createRoom, getAllRooms} from "../controllers/room.controller.js";
import express from "express";

const router = express.Router();

router.post("/", authenticateToken, isAdmin, createRoom);
router.get("/", authenticateToken, getAllRooms);

export default router;
