import { Router } from "express";
import { register, login, logout, me } from "../services/auth/auth.service";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
