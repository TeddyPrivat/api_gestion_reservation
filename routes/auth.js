import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../zodSchemas/userSchema.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      },
    });

    res.status(201).json({ message: "User created", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
