import pool from "../config/db.js";

export const getMenu = (restaurantId) =>
  pool.query("SELECT * FROM menu_items WHERE restaurant_id=$1", [restaurantId]);

export const getAllMenuItems = () =>
  pool.query("SELECT * FROM menu_items");

export const addMenuItem = (data) =>
  pool.query(
    `INSERT INTO menu_items(restaurant_id,category,name,description,price,img,veg_or_nonveg)
     VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    data
  );

export const updateMenuItem = (data) =>
  pool.query(
    `UPDATE menu_items SET category=$1,name=$2,description=$3,price=$4,img=$5,veg_or_nonveg=$6
     WHERE id=$7 RETURNING *`,
    data
  );

export const deleteMenuItem = (id) =>
  pool.query("DELETE FROM menu_items WHERE id=$1", [id]);
