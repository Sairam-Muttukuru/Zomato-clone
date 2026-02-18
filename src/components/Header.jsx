import React, { useRef, useContext, useState, useEffect } from 'react'
import zomato from '../assets/zomato.png'
import { FcSearch } from "react-icons/fc";
import { GrFilter } from "react-icons/gr";
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [text, setText] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const reference = useRef(null);
  const boxRef = useRef(null);

  const handleclick = () => {
    if (reference.current) {
      reference.current.focus();
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:3000/home/restaurants');
        const list = res?.data?.restaurant || [];
        setRestaurants(list);
      } catch (e) {
        console.error('Failed to fetch restaurants for search', e);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (!value.trim()) {
      setResults([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    const q = value.toLowerCase();
    const filtered = restaurants
      .filter(r => (r.name || '').toLowerCase().includes(q))
      .slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
    setActiveIndex(filtered.length ? 0 : -1);
  };

  const handleSelect = (rest) => {
    setText(rest.name || '');
    setOpen(false);
    if (user?.role === 'admin') {
      navigate(`/admin/menu/${rest.id}/${encodeURIComponent(rest.name)}`);
    } else {
      navigate(`/restaurant/${rest.id}/${encodeURIComponent(rest.name)}`);
    }
  };

  const onKeyDown = (e) => {
    if (!open && e.key !== 'Escape') return;
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = Math.min((prev < 0 ? -1 : prev) + 1, results.length - 1);
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    }
  };

  // Cart + auth
  const { cartItems = [] } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const totalCount = cartItems.reduce((sum, it) => sum + (it.count || 0), 0);
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    if (totalCount > 0) {
      setCartPulse(true);
      const t = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [totalCount]);

  const isVegOn = new URLSearchParams(location.search).get('veg') === '1';

  // Completely hide header on auth pages
  if (isAuthPage) return null;

  return (
    <div>
      {/* TOP HEADER */}
      <header className="header">
        {/* Left: logo */}
        <div className="header-left">
          <img
            className="logo-img"
            src={zomato}
            alt="zomato"
          />
        </div>

        {/* Center: search (hidden on cart/auth pages if you want that behaviour) */}
        {!isCartPage && !isAuthPage && (
          <div className="header-center">
            <div className="input-container" onClick={handleclick} ref={boxRef}>
              <FcSearch className="search-icon" />
              <input
                className="input-bar"
                ref={reference}
                type="text"
                onChange={handleChange}
                onKeyDown={onKeyDown}
                value={text}
                placeholder="Search for a resturant, cuisine or dishes"
              />
              {open && (
                <div className="search-dropdown">
                  {results.length === 0 && (
                    <div className="search-empty">No results</div>
                  )}
                  {results.map((r, idx) => (
                    <div
                      key={r.id}
                      className={`search-item ${idx === activeIndex ? 'active' : ''}`}
                      onClick={() => handleSelect(r)}
                    >
                      <img className="search-thumb" src={r.img} alt={r.name} />
                      <div className="search-meta">
                        <div className="search-name">{r.name}</div>
                        <div className="search-sub">
                          ⭐ {r.rating} • {r.minutes} mins • ₹{r.price_starts}+
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right: cart + auth */}
        <div className="login-container">
          {user ? (
            <>
              <button
                onClick={() => navigate('/cart')}
                id="cart-icon"
                className={cartPulse ? 'cart-pulse' : ''}
                aria-label="Cart"
                title="Cart"
              >
                <FaShoppingCart />
                {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
              </button>

              <div className="user-chip" title={user.email}>
                <span className="user-avatar">
                  {user?.image_url || user?.imageUrl ? (
                    <img
                      src={user.image_url || user.imageUrl}
                      alt={user.name}
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    (user?.name || 'U').slice(0, 1).toUpperCase()
                  )}
                </span>
                <span className="user-name">{user.name}</span>
                <span className="user-email">({user.email})</span>
              </div>

              <button className="logout-button" onClick={logout}>
                <FiLogOut style={{ marginRight: 6 }} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/cart')}
                id="cart-icon"
                className={cartPulse ? 'cart-pulse' : ''}
                aria-label="Cart"
              >
                <FaShoppingCart width="200px" height="200px" />
                {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
              </button>

              <button
                className="login-button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              <button
                className="signup-button"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* BREADCRUMB + FILTERS */}
      {!isAuthPage && !isCartPage && (
        <div className="h2">
          <div className="loc">
            <p className="home-para">
              <span className="home">Home /</span>
              <span className="india">India </span>
              <span className="nellore">/ Nellore </span>
              <span>/ Nellore Bellary Bombay road, Auto Nagar, Proddatur restaurants</span>
            </p>
          </div>
          <div className="controls-row">
            <div className="filter">
              <button className="filter-btn">
                <GrFilter className="filter-logo" />
                <span
                  style={{
                    position: 'relative',
                    bottom: '12px',
                    fontSize: '15px'
                  }}
                >
                  Filter
                </span>
              </button>
            </div>
            <div className="pure-veg">
              <button
                className={`veg-btn ${isVegOn ? 'active' : ''}`}
                onClick={() => {
                  if (isVegOn) navigate('/home/restaurants');
                  else navigate({ pathname: '/home/restaurants', search: '?veg=1' });
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    marginRight: '2px',
                    bottom: '4px',
                    fontSize: '15px'
                  }}
                >
                  pure veg
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
