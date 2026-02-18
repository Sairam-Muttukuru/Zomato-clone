import express from "express";
import { getMenuItems, addMenu, updateMenu, deleteMenu } from "../controllers/menuController.js";

const router = express.Router();

router.get("/menu/:restaurant_id", getMenuItems);
router.post("/menu", addMenu);
router.put("/menu/update/:id", updateMenu);
router.delete("/menu/delete/:id", deleteMenu);

export default router;
