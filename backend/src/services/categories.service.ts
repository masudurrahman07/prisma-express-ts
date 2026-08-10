import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { UserRole } from "@prisma/client";

export async function createCategory(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }


  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required", data: null });
  }

  const category = await prisma.category.create({ data: { name, description } });
  res.status(201).json({ success: true, message: "Category created", data: category });
}

export async function getCategories(_req: Request, res: Response) {
  const categories = await prisma.category.findMany({ where: { isDeleted: false } });
  res.json({ success: true, message: "Categories retrieved", data: categories });
}


export async function getCategoryById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category || category.isDeleted) {
    return res.status(404).json({ success: false, message: "Category not found", data: null });
  }

  res.json({ success: true, message: "Category retrieved", data: category });
}


export async function updateCategory(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Category not found", data: null });
  }

  const category = await prisma.category.update({ where: { id }, data: req.body });
  res.json({ success: true, message: "Category updated", data: category });
}


export async function deleteCategory(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Category not found", data: null });
  }

  const category = await prisma.category.update({ where: { id }, data: { isDeleted: true } });
  res.json({ success: true, message: "Category soft deleted", data: category });
}
