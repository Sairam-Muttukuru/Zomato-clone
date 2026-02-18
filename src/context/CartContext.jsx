import React, { createContext, useEffect, useState } from 'react';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    // Optional: load/save cart from localStorage (no auth)
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cart');
            if (saved) setCartItems(JSON.parse(saved));
        } catch {}
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch {}
    }, [cartItems]);

    const addToCart = async (item) => {
        // ensure price is numeric for reliable totals
        const priceNum = typeof item?.price === 'number'
            ? item.price
            : parseInt(String(item?.price ?? '').replace(/[^0-9]/g, ''), 10) || 0;
        // update UI optimistically
        setCartItems((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev.map((i) => i.id === item.id ? { ...i, count: i.count + 1 } : i);
            } else {
                return [...prev, { ...item, price: priceNum, count: 1 }];
            }
        });
    };
    const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};
    const incrementCount = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    };
    const decrementCount = (id) => {
        setCartItems((prev) =>
            prev.flatMap((item) => {
                if (item.id === id) {
                    if (item.count > 1) {
                        return [{ ...item, count: item.count - 1 }];
                    } else {
                        return [];
                    }
                }
                return [item];
            })
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, incrementCount, decrementCount, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};