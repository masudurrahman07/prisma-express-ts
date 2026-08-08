import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from "../services/reviews.service";

const router = Router();

router.post("/", requireAuth, createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.patch("/:id", requireAuth, updateReview);
router.delete("/:id", requireAuth, deleteReview);

export default router;
