import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { MdDeleteOutline } from "react-icons/md";
import "../styles/Cart.css";
import cart from '../assets/cart4.png';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, incrementCount, decrementCount, removeFromCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const raw = item?.price;
      const priceNum = typeof raw === 'number'
        ? raw
        : parseInt(String(raw).replace(/[^0-9]/g, ''), 10) || 0;
      return acc + (item.count * priceNum);
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const isEmpty = cartItems.length === 0;

  // Only show the empty-cart screen when there is no active payment
  // or order modal. This lets us show the popups even after clearing
  // the cart on successful payment.
  if (isEmpty && !showPaymentModal && !showOrderModal) {
    return(
        <div>
            <div className="cart-empty">
                <img
                src={cart}
                alt="Empty Cart"
                className="empty-cart-img"
                />
                <h2>Your cart is empty 🍴</h2>
                <p>Looks like you haven’t added anything yet. Go explore some food!</p>
                <button 
                    className="browse-btn" 
                    onClick={() => navigate("/home/restaurants")}>
                    Browse Restaurants 🍔
                </button>
            </div>
              {/* Button INSIDE empty card */}
        </div>
    )
  }

  const validate = () => {
    const e = {};
    // very light validation for demo
    const num = form.number.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(num)) e.number = 'Enter 16-digit card number';
    if (!/^[0-1]?\d\/(\d{2})$/.test(form.expiry)) e.expiry = 'Use MM/YY';
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3-4 digit CVV';
    if (!form.name.trim()) e.name = 'Name required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPay = async () => {
    if (!validate()) return;
    // Take a snapshot of current cart items and total before clearing the cart
    setOrderedItems(cartItems.map(item => ({ ...item })));
    setPaidTotal(total);
    setPaying(true);
    // fake processing
    setTimeout(async () => {
      await clearCart();
      setShowPaymentModal(false);
      setPaying(false);
      setShowOrderModal(true);
    }, 1200);
  };

  return (
    <div className="cart-container">
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => !paying && setShowPaymentModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Payment</h3>
            <div className="pay-form">
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e)=>setForm({...form, name:e.target.value})}
                  placeholder="Name on card"
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.number}
                  onChange={(e)=>setForm({...form, number:e.target.value.replace(/[^\d\s]/g,'')})}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.number && <div className="error-text">{errors.number}</div>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={form.expiry}
                    onChange={(e)=>setForm({...form, expiry:e.target.value})}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && <div className="error-text">{errors.expiry}</div>}
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={form.cvv}
                    onChange={(e)=>setForm({...form, cvv:e.target.value.replace(/[^\d]/g,'')})}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <div className="error-text">{errors.cvv}</div>}
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn" disabled={paying} onClick={()=>setShowPaymentModal(false)}>Cancel</button>
                <button className="modal-btn primary" onClick={onPay} disabled={paying}>
                  {paying ? 'Processing…' : `Pay ₹${total}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Order Placed 🎉</h3>
            <p>Your order was successfully placed.</p>
            {orderedItems.length > 0 && (
              <div className="ordered-items-list">
                <h4>Your Order</h4>
                {orderedItems.map((item) => {
                  const raw = item?.price;
                  const priceNum = typeof raw === 'number'
                    ? raw
                    : parseInt(String(raw).replace(/[^0-9]/g, ''), 10) || 0;
                  const lineTotal = priceNum * (item.count || 1);
                  return (
                    <div key={item.id} className="ordered-item-row">
                      <span className="ordered-item-name">{item.name}</span>
                      <span className="ordered-item-qty">x {item.count}</span>
                      <span className="ordered-item-price">₹{lineTotal}</span>
                    </div>
                  );
                })}
                <div className="ordered-items-total">
                  <span>Total Paid:</span>
                  <span>₹{paidTotal}</span>
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button className="modal-btn primary" onClick={() => setShowOrderModal(false)}>Close</button>
              <button className="modal-btn" onClick={() => { setShowOrderModal(false); navigate('/home/restaurants'); }}>Continue Browsing</button>
            </div>
          </div>
        </div>
      )}
      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img className="item-image" src={item.img} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">{`₹${item.price}`}</p>
              <p className="item-desc">{item.description}</p>
            </div>
            <div className="item-actions">
              <button className="qty-btn" onClick={() => decrementCount(item.id)}>-</button>
              <span className="qty-count">{` ${item.count} `}</span>
              <button className="qty-btn" onClick={() => incrementCount(item.id)}>+</button>
              <button className="delete-btn" title="Remove" onClick={() => removeFromCart(item.id)}>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Items:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
        <button
          className="buy-now-btn"
          onClick={() => setShowPaymentModal(true)}
        >
          Buy Now <span className="buy-cost">₹{total}</span>
        </button>
      </div>
    </div>
  );
}

export default Cart;
