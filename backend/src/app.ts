import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authMiddleware } from "./middleware/auth.middleware";
import { register, login } from "./modules/auth/auth.controller";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Family Safety System API Running"
  });
});

app.post("/auth/register", register);
app.post("/auth/login", login);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile route accessed"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
