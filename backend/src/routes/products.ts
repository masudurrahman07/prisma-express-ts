import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../services/products.service";

const router = Router();

router.post("/", requireAuth, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
