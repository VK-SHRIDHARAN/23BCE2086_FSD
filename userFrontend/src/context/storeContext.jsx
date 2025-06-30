import { useState, createContext } from 'react'
import { food_list } from '../assets/assets.js'

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: 1 });
    }
  };

  const removeFromCart = (itemId) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 1) {
      const updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(food => food._id === itemId);
        if (itemInfo) {
          total += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
