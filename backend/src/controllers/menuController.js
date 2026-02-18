import * as Menu from "../models/menuModel.js";
import * as Restaurant from "../models/restaurantModel.js";

export const getMenuItems = async (req, res) => {
  try {
    const { restaurant_id } = req.params;

    // Fetch restaurant details
    const restaurantResult = await Restaurant.getRestaurantById(restaurant_id);
    const restaurant = restaurantResult.rows[0];

    // Fetch menu items
    const menuResult = await Menu.getMenu(restaurant_id);
    const menu = menuResult.rows;

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ restaurant, menu });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addMenu = async (req, res) => {
  const result = await Menu.addMenuItem(Object.values(req.body));
  res.status(201).json(result.rows[0]);
};

export const updateMenu = async (req, res) => {
  const result = await Menu.updateMenuItem([
    ...Object.values(req.body),
    req.params.id
  ]);
  res.json(result.rows[0]);
};

export const deleteMenu = async (req, res) => {
  await Menu.deleteMenuItem(req.params.id);
  res.send("Menu deleted");
};
