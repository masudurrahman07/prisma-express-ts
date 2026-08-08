import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../services/categories.service";

const router = Router();

router.post("/", requireAuth, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.patch("/:id", requireAuth, updateCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
