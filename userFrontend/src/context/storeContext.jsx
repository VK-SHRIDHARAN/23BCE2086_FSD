import { useState, createContext, useEffect } from 'react';
import { food_list } from '../assets/assets.js';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [coupon, setCoupon] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      if (updated[itemId] === 1) delete updated[itemId];
      else updated[itemId] -= 1;
      return updated;
    });
  };

  const clearCart = () => setCartItems({});

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((food) => food._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    if (upperCode === "SAVE10") {
      setCoupon({ code: "SAVE10", discount: 10 }); // 10% off
      return { success: true, message: "Coupon applied: 10% off" };
    } else {
      setCoupon(null);
      return { success: false, message: "Invalid coupon code" };
    }
  };

  const getDiscountAmount = () => {
    const subtotal = getTotalCartAmount();
    return coupon ? Math.floor((subtotal * coupon.discount) / 100) : 0;
  };

  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    applyCoupon,
    coupon,
    getDiscountAmount
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
