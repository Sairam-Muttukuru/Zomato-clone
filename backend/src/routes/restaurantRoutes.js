import express from "express";
import {
  getHomeData,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/home/restaurants", getHomeData);
router.get("/restaurants/:id", getSingleRestaurant);
router.post("/admin/restaurants", createRestaurant);
router.put("/admin/update/:id", updateRestaurant);
router.delete("/delete/restaurant/:id", deleteRestaurant);

export default router;
