import { Request, Response } from "express";
import { Prisma, UserRole } from "@prisma/client";
import prisma from "../lib/prisma";

export async function createProduct(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }

  const { title, description, sku, price, currency, categoryId } = req.body;
  if (!title || price == null) {
    return res.status(400).json({ success: false, message: "Title and price are required", data: null });
  }

  const product = await prisma.product.create({
    data: {
      title,
      description,
      sku,
      price: new Prisma.Decimal(price),
      currency: currency || "USD",
      category: categoryId ? { connect: { id: categoryId } } : undefined,
    },
  });

  res.status(201).json({ success: true, message: "Product created", data: product });
}

export async function getProducts(_req: Request, res: Response) {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    include: { category: true },
  });
  res.json({ success: true, message: "Products retrieved", data: products });
}

export async function getProductById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, message: "Product not found", data: null });
  }
  res.json({ success: true, message: "Product retrieved", data: product });
}

export async function updateProduct(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Product not found", data: null });
  }

  const updateData: any = { ...req.body };
  if (updateData.categoryId !== undefined) {
    updateData.category = updateData.categoryId ? { connect: { id: updateData.categoryId } } : { disconnect: true };
    delete updateData.categoryId;
  }
  if (updateData.price != null) {
    updateData.price = new Prisma.Decimal(updateData.price);
  }

  const product = await prisma.product.update({ where: { id }, data: updateData });
  res.json({ success: true, message: "Product updated", data: product });
}

export async function deleteProduct(req: Request, res: Response) {
  if (req.auth?.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Admin access required", data: null });
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Product not found", data: null });
  }

  const product = await prisma.product.update({ where: { id }, data: { isDeleted: true } });
  res.json({ success: true, message: "Product soft deleted", data: product });
}
