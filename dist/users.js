"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("./prisma"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const data = await prisma_1.default.user.create({ data: req.body });
    res.status(201).json(data);
});
router.get("/", async (_req, res) => {
    const users = await prisma_1.default.user.findMany();
    res.json(users);
});
router.get("/:id", async (req, res) => {
    const user = await prisma_1.default.user.findUnique({ where: { id: req.params.id } });
    res.json(user);
});
router.patch("/:id", async (req, res) => {
    const user = await prisma_1.default.user.update({
        where: { id: req.params.id },
        data: req.body,
    });
    res.json(user);
});
router.delete("/:id", async (req, res) => {
    await prisma_1.default.user.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
});
exports.default = router;
