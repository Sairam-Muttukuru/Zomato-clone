import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use(express.static('public'));
app.use("/cart", cartRoutes);
app.use("/", restaurantRoutes);
app.use("/admin", menuRoutes);

export default app;
