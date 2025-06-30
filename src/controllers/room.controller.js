import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const roomSchema = z.object({
  name: z.string().min(1),
  capacity: z.number().int().positive(),
  features: z.string().optional(),
  rules: z.object({
    maxDurationMinutes: z.number().int().positive(),
    allowWeekends: z.boolean(),
    minAdvanceHours: z.number().int().nonnegative(),
  }),
});

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const validatedData = roomSchema.parse(req.body);

    const newRoom = await prisma.room.create({
      data: validatedData,
    });

    res.status(201).json({
      message: "Room created",
      room: newRoom,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
