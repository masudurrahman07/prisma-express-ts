import { Router } from "express";
import users from "./users";
import products from "./products";
import categories from "./categories";
import reviews from "./reviews";
import orders from "./orders";
import auth from "./auth";

const router = Router();

router.use("/users", users);
router.use("/products", products);
router.use("/categories", categories);
router.use("/reviews", reviews);
router.use("/orders", orders);
router.use("/auth", auth);

export default router;
