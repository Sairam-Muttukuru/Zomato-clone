import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getCartItems, addToCart, clearCartItems } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", auth, getCartItems);
router.post("/add", auth, addToCart);
router.delete("/", auth, clearCartItems);

export default router;
