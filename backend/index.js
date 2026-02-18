//     import express from 'express';
//     import cors from 'cors'
//     import {Pool} from 'pg';
//     import bcrypt from 'bcrypt';
//     import jwt from 'jsonwebtoken';
//     // const {Pool} = pkg;
//     const app = express();
//     app.use(express.urlencoded({extended:true}));
//     app.use(cors());
//     app.use(express.json());
//     const port = 3000;
//     const JWT_SECRET =  'dev_secret_change_me';
//         const pool = new Pool({
//         host:"localhost",
//         user:"postgres",
//         database:"Zomato_app",
//         password:"Sairam@@12",
//         port:"5432"
//         });
//         console.log("your data base is connected successfully");

//     // Simple auth middleware to extract user from Bearer token
//     const auth = (req, res, next) => {
//       try {
//         const header = req.headers['authorization'] || '';
//         const [scheme, token] = header.split(' ');
//         if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Unauthorized' });
//         const payload = jwt.verify(token, JWT_SECRET);
//         req.user = payload; // { id, name, email, role }
//         next();
//       } catch (err) {
//         console.error('Auth error:', err);
//         return res.status(401).json({ error: 'Invalid token' });
//       }
//     };

//     // Auth: Signup
//     app.post('/auth/signup', async (req, res) => {
//       // NOTE: frontend sends `imageUrl` (camelCase). We map it to DB column `image_url`.
//       const { name, email, password, role, imageUrl } = req.body || {};
//       if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
//       try {
//         const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
//         if (existing.rows.length) return res.status(409).json({ error: 'Email already registered' });
//         const hash = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//           'INSERT INTO users(name,email,password,role,image_url) VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,role,image_url,created_at,updated_at',
//           [name, email, hash, role || 'user', imageUrl || null]
//         );
//         const user = result.rows[0];
//         const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
//         res.status(201).json({ token, user });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Signup failed' });
//       }
//     });

//     // Auth: Login
//     app.post('/auth/login', async (req, res) => {
//       const { email, password } = req.body || {};
//       if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
//       try {
//         const result = await pool.query('SELECT id,name,email,password,role,image_url FROM users WHERE email=$1', [email]);
//         if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
//         const userRow = result.rows[0];
//         const ok = await bcrypt.compare(password, userRow.password);
//         if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
//         const user = {
//           id: userRow.id,
//           name: userRow.name,
//           email: userRow.email,
//           role: userRow.role,
//           image_url: userRow.image_url
//         };
//         const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
//         res.json({ token, user });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Login failed' });
//       }
//     });

//     // Cart: get current user items
//     app.get('/cart', auth, async (req, res) => {
//       try {
//         const result = await pool.query(
//           'SELECT id, item_name, quantity, price, created_at FROM user_items WHERE user_id=$1 ORDER BY id DESC',
//           [req.user.id]
//         );
//         res.json({ items: result.rows });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch cart' });
//       }
//     });

//     // Cart: add or increment an item
//     app.post('/cart/add', auth, async (req, res) => {
//       const { item_name, price, quantity } = req.body || {};
//       if (!item_name || typeof price === 'undefined') return res.status(400).json({ error: 'Missing item_name or price' });
//       const qty = Number(quantity || 1);
//       try {
//         const existing = await pool.query(
//           'SELECT id, quantity FROM user_items WHERE user_id=$1 AND item_name=$2',
//           [req.user.id, item_name]
//         );
//         let row;
//         if (existing.rows.length) {
//           const newQty = existing.rows[0].quantity + qty;
//           const upd = await pool.query(
//             'UPDATE user_items SET quantity=$1, price=$2 WHERE id=$3 RETURNING id, item_name, quantity, price',
//             [newQty, price, existing.rows[0].id]
//           );
//           row = upd.rows[0];
//         } else {
//           const ins = await pool.query(
//             'INSERT INTO user_items(user_id, item_name, quantity, price) VALUES($1,$2,$3,$4) RETURNING id, item_name, quantity, price',
//             [req.user.id, item_name, qty, price]
//           );
//           row = ins.rows[0];
//         }
//         res.status(201).json({ item: row });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to add to cart' });
//       }
//     });

//     // Cart: clear all items (e.g., after Buy Now)
//     app.delete('/cart', auth, async (req, res) => {
//       try {
//         await pool.query('DELETE FROM user_items WHERE user_id=$1', [req.user.id]);
//         res.json({ success: true });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to clear cart' });
//       }
//     });
//     // app.get("/admin/foods", async (req, res) => {
//     //      try {
//     //         const data = await pool.query("SELECT * FROM food_list"); // no condition
//     //         const data1 = await pool.query("SELECT * FROM restaurant");
//     //         console.log(data.rows);
//     //         console.log(data1.rows);
//     //         console.log(data);
//     //         res.json({
//     //           food: data.rows,
//     //           restaurant: data1.rows
//     //         });
//     //     } catch (err) {
//     //         console.log(err);
//     //         res.status(500).send("Error fetching data from database");
//     //     }
//     // });
//     app.get("/admin/foods/restaurants", async (req, res) => {
//         try {
//             const data = await pool.query("SELECT * FROM food_list"); // no condition
//             const data1 = await pool.query("SELECT * FROM restaurants");
//             console.log(data.rows);
//             console.log(data1.rows);
//             console.log(data);
//             res.json({
//               food: data.rows,
//               restaurant: data1.rows
//             });
//         } catch (err) {
//             console.log(err);
//             res.status(500).send("Error fetching data from database");
//         }
//     });
//      app.get("/home/restaurants", async (req, res) => {
//          try {
//             const data = await pool.query("SELECT * FROM food_list"); // no condition
//             const data1 = await pool.query("SELECT * FROM restaurants");
//             // console.log("=== BACKEND DEBUG ===");
//             // console.log("Food data rows:", data.rows);
//             // console.log("Restaurant data rows:", data1.rows);
//             // console.log("First restaurant object:", data1.rows[0]);
//             // console.log("First restaurant keys:", data1.rows[0] ? Object.keys(data1.rows[0]) : "No restaurants");
//             // console.log("===================");
//             res.json({
//               food: data.rows,
//               restaurant: data1.rows
//             });
//         } catch (err) {
//             console.log(err);
//             res.status(500).send("Error fetching data from database");
//         }
//     });
//     //used to get data of single restaurant to update restaurant..
//     app.get("/restaurants/:id",async(req,res)=>{
//       try {
//         const restaurantId = req.params.id;
//         console.log("Fetching restaurant with ID:", restaurantId);
//         const data = await pool.query("select * from restaurants where id=$1",[restaurantId]);
//         console.log("Query result:", data.rows);
        
//         if (data.rows.length === 0) {
//           return res.status(404).json({ error: "Restaurant not found" });
//         }
        
//         res.json(data.rows);
//       } catch (error) {
//         console.error("Database error:", error);
//         res.status(500).json({ error: "Unable to get restaurant data" });
//       }
//     });
//     //update the restaurant based on the id...
//     app.put("/admin/update/:id",async(req,res)=>{
//       const id = req.params.id;
//       const {name,rating,img1,img2,address,phone,category,offer,price_starts,minutes,img} = req.body;
//       try{
//         const data = await pool.query("update restaurants set name=$1,rating=$2,img1=$3,img2=$4,address=$5,phone=$6,category=$7,offer=$8,price_starts=$9,minutes=$10,img=$11 where id = $12 returning*",[name,rating,img1,img2,address,phone,category,offer,price_starts,minutes,img,id]);
//         console.log(data);
//         res.json(data.rows[0]);
//       }
//       catch(err){
//         console.error(err);
//         res.status(500).send("unabel to update the restaurant");
//       }
//     });
//     //delete the restaurant based on the id...
//     app.delete("/delete/restaurant/:id",async(req,res)=>{
//       const id = req.params.id;
//       try {
//         const data = await pool.query("delete from restaurants where id=$1 ",[id]);
//         console.log(data);
//         res.status(200).send("restaurant was deleted successfully"); 
//       } catch (error) {
//         console.error(error);
//         res.status(500).send("unable to delete this restaurant");
//       }
//     });
//     // app.get("/admin/restaurants", async (req, res) => {
//     //     try {
//     //         const data = await pool.query("SELECT * FROM restaurant"); 
//     //         console.log(data.rows);
//     //         res.json(data.rows); // send all rows as JSON
//     //     } catch (err) {
//     //         console.log(err);
//     //         res.status(500).send("Error fetching data from database");
//     //     }
//     // });

//     // app.get("/all/url", async (req, res) => {
//     //     try {
//     //         const data = await pool.query("SELECT * FROM url"); 
//     //         console.log(data.rows);
//     //         res.json(data.rows); // send all rows as JSON
//     //     } catch (err) {
//     //         console.log(err);
//     //         res.status(500).send("Error fetching data from database");
//     //     }
//     // });
// //    app.post("/foods", async (req, res) => {
// //   const { name, url,vegnonveg } = req.body;
// //   try {
// //     const result = await pool.query(
// //       "INSERT INTO food_list(name, url,vegnonveg) VALUES($1, $2,$3) RETURNING *",
// //       [name, url,vegnonveg]
// //     );
// //     console.log(result.rows[0]);
// //     res.status(201).json(result.rows[0]);  // ✅ send response to frontend
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).send("Unable to add the data to the table");
// //   }
// // });
//     app.post("/admin/foods/restaurants", async (req, res) => {
//   try {
//     let result;

//     // it's restaurant data
//     if (req.body.category) {
//       const { name, rating, img1, img2, address, phone, category, offer, price_starts, minutes, img} = req.body;

//       result = await pool.query(
//         "INSERT INTO restaurants(name, rating,img1, img2, address, phone, category, offer, price_starts, minutes, img ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
//         [name, rating, img1, img2, address, phone, category, offer, price_starts, minutes, img]
//       );
//     } 
//     // it's food_list data
//     else if (req.body.vegnonveg) {
//       const { name, url, vegnonveg } = req.body;

//       result = await pool.query(
//         "INSERT INTO food_list(name, url, vegnonveg) VALUES($1, $2, $3) RETURNING *",
//         [name, url, vegnonveg]
//       );
//     } 
//     else {
//       return res.status(400).json({ error: "Invalid request body" });
//     }

//     console.log(result.rows[0]);
//     res.status(201).json(result.rows[0]);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Unable to add the data to the table");
//   }
// });
// //getting the details of the menu items based on the restaurant id...
// app.get("/admin/menu/:restaurant_id", async (req, res) => {
//   try {
//     const restaurantId = req.params.restaurant_id;
//     const menuResult = await pool.query(
//       "SELECT * FROM menu_items WHERE restaurant_id=$1",
//       [restaurantId]
//     );
//     const restaurantResult = await pool.query(
//       "SELECT * FROM restaurants WHERE id=$1",
//       [restaurantId]
//     );
//     console.log(menuResult.rows);
//     console.log(restaurantResult.rows);
//     if (restaurantResult.rows.length === 0) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     res.json({
//       restaurant: restaurantResult.rows[0],
//       menu: menuResult.rows                
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data from database");
//   }
// });
// //posting the menu items to the menu_items table...
// app.post("/admin/menu",async(req,res)=>{
//   const {restaurant_id,category,name,description,price,img,veg_or_nonveg} = req.body;
//   try{
//     const result = await pool.query("insert into menu_items(restaurant_id,category,name,description,price,img,veg_or_nonveg) values($1,$2,$3,$4,$5,$6,$7) returning*",[restaurant_id,category,name,description,price,img,veg_or_nonveg]);
//     console.log("data from menu_items:  => "+result);
//     console.log(result.rows[0]);
//     res.status(200).json(result.rows[0]);
//   }
//   catch(err){
//     console.error(err);
//     res.status(500).send("unable to add the data to the Menu table");
//   }
// });
// //update the menu item based on the id...
// app.put("/admin/menu/update/:id",async(req,res)=>{
//   const id = req.params.id;
//   const {category,name,description,price,img,veg_or_nonveg} = req.body;
//   try{
//     const data = await pool.query("update menu_items set category=$1,name=$2,description=$3,price=$4,img=$5,veg_or_nonveg=$6 where id = $7 returning*",[category,name,description,price,img,veg_or_nonveg,id]);
//     console.log(data);
//     res.status(200).json({ message: "Menu updated successfully", menu: data.rows[0] });
//   }
//   catch(err){
//     console.error(err);
//     res.status(500).send("unable to update the menu item");
//   }
// });
// //delete the menu item based on the id...
// app.delete("/admin/menu/delete/:id",async(req,res)=>{
//   const id = req.params.id;
//   try{
//     const data = await pool.query("delete from menu_items where id=$1",[id]);
//     if (data.rowCount === 0) {
//       return res.status(404).json({ message: "Menu item not found 😢" });
//     }
//     console.log(data);
//     res.status(200).send("menu is successfully deleted mawa😁😁");
//   }
//   catch(err)
//   {
//     console.log(err);
//     res.status(500).send("unable to delete the menu item ra 🫠🫠🫠");
//   }
// });

//     // app.post("/all/url",async(req,res)=>{
//     //     const {url} = req.body;
//     //    try{
//     //      const result = await pool.query("insert into url(url) values($1) returning *",[url]);
//     //      console.log(result.rows[0]);
//     //    }
//     //    catch(err){
//     //     console.error(err);
//     //     res.status(500).send("unabele to add the data to the table");
//     //    }
//     // });

//     app.listen(port,()=>{
//         console.log(`your port is running on http://localhost:${port}`);
//     })


   