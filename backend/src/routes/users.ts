import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../services/users.service";

const router = Router();

router.post("/", requireAuth, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

export default router;
