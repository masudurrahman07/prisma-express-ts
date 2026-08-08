import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);
app.use("/api/auth", authRoutes);

export default app;
