import pool from "../config/db.js";

export const getAllFood = () =>
  pool.query("SELECT * FROM food_list ORDER BY id ASC");
