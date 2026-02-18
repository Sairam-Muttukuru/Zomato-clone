import pool from "../config/db.js";

export const getAllRestaurants = () =>
  pool.query("SELECT * FROM restaurants");

export const getRestaurantById = (id) =>
  pool.query("SELECT * FROM restaurants WHERE id=$1", [id]);

export const createRestaurant = (data) =>
  pool.query(
    `INSERT INTO restaurants(name,rating,img1,img2,address,phone,category,offer,price_starts,minutes,img)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    data
  );

export const updateRestaurant = (data) =>
  pool.query(
    `UPDATE restaurants SET
     name=$1,rating=$2,img1=$3,img2=$4,address=$5,phone=$6,
     category=$7,offer=$8,price_starts=$9,minutes=$10,img=$11
     WHERE id=$12 RETURNING *`,
    data
  );

export const deleteRestaurant = (id) =>
  pool.query("DELETE FROM restaurants WHERE id=$1", [id]);
