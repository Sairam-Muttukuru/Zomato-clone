/* eslint-disable no-undef */
// // server.js
// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";

// const app = express();
// const PORT = 5000;

// app.use(cors());

// app.get("/api/restaurants", async (req, res) => {
//   const { lat, lng } = req.query;

//   try {
//     const response = await fetch(
//       `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`
//     );
//     const data = await response.json();

//     const cards = data?.data?.cards;

//     const restaurantDataCard = cards?.find(
//       (card) => card?.cardType === "seeAllRestaurants"
//     );

//     const restaurants = restaurantDataCard?.data?.data?.cards?.map((r) => ({
//       id: r.data.id,
//       name: r.data.name,
//       image: `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${r.data.cloudinaryImageId}`,
//       rating: r.data.avgRating,
//     }));

//     res.json({ restaurants });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch restaurants" });
//     res.send(error);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

// Use PORT from environment, or fall back to 3000 so it matches the frontend
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
