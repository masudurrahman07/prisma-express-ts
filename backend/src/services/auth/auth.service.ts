import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "auth_token";

function signToken(payload: object) {
  // Casts are used to satisfy jsonwebtoken v9 typings in this project setup.
  return jwt.sign(payload as any, JWT_SECRET as any, { expiresIn: JWT_EXPIRES_IN } as any);
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });

  const token = signToken({ id: user.id, role: user.role });
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: false, sameSite: "lax" });

  const { password: _p, ...safe } = user as any;
  res.status(201).json(safe);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.isDeleted) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password || "");
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user.id, role: user.role });
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: false, sameSite: "lax" });

  const { password: _p, ...safe } = user as any;
  res.json(safe);
}

export async function logout(_req: Request, res: Response) {
  const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "auth_token";
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: "lax" });
  res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  const userId = (req as any).auth?.id;
  if (!userId) return res.status(401).json({ message: "Not authenticated" });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, role: true, age: true, createdAt: true } });
  res.json(user);
}
