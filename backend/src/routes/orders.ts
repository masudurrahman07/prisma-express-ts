import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../services/orders.service";

const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/", requireAuth, getOrders);
router.get("/:id", requireAuth, getOrderById);
router.patch("/:id", requireAuth, updateOrder);
router.delete("/:id", requireAuth, deleteOrder);

export default router;
