import * as Cart from "../models/cartModel.js";

export const getCartItems = async (req, res) => {
  const result = await Cart.getCart(req.user.id);
  res.json({ items: result.rows });
};

export const addToCart = async (req, res) => {
  const { item_name, price, quantity } = req.body;
  const qty = Number(quantity || 1);

  const existing = await Cart.findItem(req.user.id, item_name);

  let result;
  if (existing.rows.length) {
    result = await Cart.updateItem([
      existing.rows[0].quantity + qty,
      price,
      existing.rows[0].id
    ]);
  } else {
    result = await Cart.addItem([
      req.user.id, item_name, qty, price
    ]);
  }

  res.status(201).json({ item: result.rows[0] });
};

export const clearCartItems = async (req, res) => {
  await Cart.clearCart(req.user.id);
  res.json({ success: true });
};
