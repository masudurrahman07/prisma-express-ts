import { Request, Response } from "express";
import { Prisma, OrderStatus, UserRole } from "@prisma/client";
import prisma from "../lib/prisma";

export async function createOrder(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }

  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Order items are required", data: null });
  }

  const productIds = items.map((item: any) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, isDeleted: false } });
  if (products.length !== productIds.length) {
    return res.status(400).json({ success: false, message: "One or more products are invalid", data: null });
  }

  const orderItems = items.map((item: any) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      product: { connect: { id: product.id } },
      quantity: item.quantity || 1,
      priceAtPurchase: product.price,
    };
  });

  const total = orderItems.reduce((sum, item) => sum + Number(item.priceAtPurchase) * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      user: { connect: { id: req.auth.id } },
      status: OrderStatus.PENDING,
      total: new Prisma.Decimal(total.toFixed(2)),
      items: { create: orderItems },
    },
    include: { items: { include: { product: true } }, user: { select: { id: true, name: true, email: true, role: true } } },
  });

  res.status(201).json({ success: true, message: "Order created", data: order });
}

export async function getOrders(req: Request, res: Response) {
  const where: any = { isDeleted: false };
  if (req.auth?.role !== UserRole.ADMIN) {
    if (!req.auth) {
      return res.status(401).json({ success: false, message: "Authentication required", data: null });
    }
    where.userId = req.auth.id;
  }

  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { product: true } }, user: { select: { id: true, name: true, email: true, role: true } } },
  });
  res.json({ success: true, message: "Orders retrieved", data: orders });
}

export async function getOrderById(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: { select: { id: true, name: true, email: true, role: true } } },
  });
  if (!order || order.isDeleted) {
    return res.status(404).json({ success: false, message: "Order not found", data: null });
  }
  if (req.auth.role !== UserRole.ADMIN && req.auth.id !== order.userId) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  res.json({ success: true, message: "Order retrieved", data: order });
}

export async function updateOrder(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { status } = req.body;
  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Order not found", data: null });
  }
  if (req.auth.role !== UserRole.ADMIN) {
    return res.status(403).json({ success: false, message: "Only admins can update orders", data: null });
  }
  if (status && !(Object.values(OrderStatus) as string[]).includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid order status", data: null });
  }

  const order = await prisma.order.update({ where: { id }, data: { status } });
  res.json({ success: true, message: "Order updated", data: order });
}

export async function deleteOrder(req: Request, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ success: false, message: "Authentication required", data: null });
  }
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing || existing.isDeleted) {
    return res.status(404).json({ success: false, message: "Order not found", data: null });
  }
  if (req.auth.role !== UserRole.ADMIN && req.auth.id !== existing.userId) {
    return res.status(403).json({ success: false, message: "Forbidden", data: null });
  }

  const order = await prisma.order.update({ where: { id }, data: { isDeleted: true } });
  res.json({ success: true, message: "Order soft deleted", data: order });
}
