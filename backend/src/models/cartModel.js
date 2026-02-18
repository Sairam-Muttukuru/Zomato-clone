import pool from "../config/db.js";

export const getCart = (userId) =>
  pool.query(
    "SELECT * FROM user_items WHERE user_id=$1 ORDER BY id DESC",
    [userId]
  );

export const findItem = (userId, name) =>
  pool.query(
    "SELECT * FROM user_items WHERE user_id=$1 AND item_name=$2",
    [userId, name]
  );

export const addItem = (data) =>
  pool.query(
    "INSERT INTO user_items(user_id,item_name,quantity,price) VALUES($1,$2,$3,$4) RETURNING *",
    data
  );

export const updateItem = (data) =>
  pool.query(
    "UPDATE user_items SET quantity=$1,price=$2 WHERE id=$3 RETURNING *",
    data
  );

export const clearCart = (userId) =>
  pool.query("DELETE FROM user_items WHERE user_id=$1", [userId]);
