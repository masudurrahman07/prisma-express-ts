import { Router } from "express";
import users from "./users";
import products from "./products";
import auth from "./auth";

const router = Router();

router.use("/users", users);
router.use("/products", products);
router.use("/auth", auth);

export default router;
