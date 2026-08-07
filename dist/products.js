"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("./prisma"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const data = await prisma_1.default.product.create({ data: req.body });
    res.status(201).json(data);
});
router.get("/", async (_req, res) => {
    const products = await prisma_1.default.product.findMany();
    res.json(products);
});
router.get("/:id", async (req, res) => {
    const product = await prisma_1.default.product.findUnique({ where: { id: req.params.id } });
    res.json(product);
});
router.patch("/:id", async (req, res) => {
    const product = await prisma_1.default.product.update({
        where: { id: req.params.id },
        data: req.body,
    });
    res.json(product);
});
router.delete("/:id", async (req, res) => {
    await prisma_1.default.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
});
exports.default = router;
