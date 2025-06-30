import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../zodSchemas/userSchema";

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

export const login = async (req, res) => {
  try {
    const validated = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: validated.email } });

    if (!user) return res.status(404).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(validated.password, user.password);
    if (!isValid) return res.status(403).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
