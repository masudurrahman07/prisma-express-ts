import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { UserRole } from "@prisma/client";

export async function createReview(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }

  const { productId, content, rating } = req.body;
  if (!productId || !content || rating == null) {
    return res.status(400).json({ success: false, message: "productId, content, and rating are required", data: null });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5", data: null });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, message: "Product not found", data: null });
  }

  const review = await prisma.review.create({
    data: {
      content,
      rating,
      user: { connect: { id: req.auth.id } },
      product: { connect: { id: productId } },
    },
    include: { user: true, product: true },
  });

  res.status(201).json({ success: true, message: "Review created", data: review });
}

export async function getReviews(_req: Request, res: Response) {
  const reviews = await prisma.review.findMany({
    where: { isDeleted: false },
    include: { user: { select: { id: true, name: true, email: true, role: true } }, product: true },
  });
  res.json({ success: true, message: "Reviews retrieved", data: reviews });
}

export async function getReviewById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const review = await prisma.review.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true, role: true } }, product: true },
  });
  if (!review || review.isDeleted) {
    return res.status(404).json({ success: false, message: "Review not found", data: null });
  }
  res.json({ success: true, message: "Review retrieved", data: review });
}

export async function updateReview(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Review not found", data: null });
  }
  if (req.auth.id !== existing.userId && req.auth.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  const { content, rating } = req.body;
  const data: any = {};
  if (content !== undefined) data.content = content;
  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5", data: null });
    }
    data.rating = rating;
  }

  const review = await prisma.review.update({
    where: { id },
    data,
    include: { user: { select: { id: true, name: true, email: true, role: true } }, product: true },
  });
  res.json({ success: true, message: "Review updated", data: review });
}

export async function deleteReview(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Review not found", data: null });
  }
  if (req.auth.id !== existing.userId && req.auth.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  const review = await prisma.review.update({ where: { id }, data: { isDeleted: true } });
  res.json({ success: true, message: "Review soft deleted", data: review });
}
