import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

const app = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Shoply API server is running successfully.",
    status: "ok",
  });
});

app.use("/api/v1", routes);
app.use("/api/auth", authRoutes);

export default app;
