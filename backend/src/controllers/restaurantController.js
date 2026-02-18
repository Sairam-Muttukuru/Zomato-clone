import * as Restaurant from "../models/restaurantModel.js";
import * as Food from "../models/foodModel.js";

export const getHomeData = async (req, res) => {
  const restaurants = await Restaurant.getAllRestaurants();
  const foods = await Food.getAllFood();
  res.json({ restaurant: restaurants.rows, food: foods.rows });
};

export const getSingleRestaurant = async (req, res) => {
  const result = await Restaurant.getRestaurantById(req.params.id);
  if (!result.rows.length)
    return res.status(404).json({ error: "Not found" });
  res.json(result.rows[0]);
};

export const createRestaurant = async (req, res) => {
  const result = await Restaurant.createRestaurant(Object.values(req.body));
  res.status(201).json(result.rows[0]);
};

export const updateRestaurant = async (req, res) => {
  const result = await Restaurant.updateRestaurant([
    ...Object.values(req.body),
    req.params.id
  ]);
  res.json(result.rows[0]);
};

export const deleteRestaurant = async (req, res) => {
  await Restaurant.deleteRestaurant(req.params.id);
  res.send("Deleted successfully");
};
