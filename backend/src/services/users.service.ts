import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { User, UserRole } from "@prisma/client";

const safeUser = (user: User) => {
  const { password, ...safe } = user as any;
  return safe;
};

export async function createUser(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }

  const { name, email, password, role, age } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required", data: null });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already exists", data: null });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: role || UserRole.CUSTOMER,
      age,
    },
  });

  res.status(201).json({ success: true, message: "User created", data: safeUser(user) });
}

export async function getUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({ where: { isDeleted: false } });
  const safe = users.map((user) => safeUser(user));
  res.json({ success: true, message: "Users retrieved", data: safe });
}

export async function getUserById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.isDeleted) {
    return res.status(404).json({ success: false, message: "User not found", data: null });
  }

  res.json({ success: true, message: "User retrieved", data: safeUser(user) });
}

export async function updateUser(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }
  if (req.auth.id !== id && req.auth.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "User not found", data: null });
  }

  const updateData: any = { ...req.body };
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  delete updateData.email;

  const user = await prisma.user.update({ where: { id }, data: updateData });
  res.json({ success: true, message: "User updated", data: safeUser(user) });
}

export async function deleteUser(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }
  if (req.auth.id !== id && req.auth.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  const user = await prisma.user.update({ where: { id }, data: { isDeleted: true } });
  res.json({ success: true, message: "User soft deleted", data: safeUser(user) });
}
