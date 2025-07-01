import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState('');
  const url = 'https://backend-ozpo.onrender.com';

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error.message);
    }
  };

  // Load cart data from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error('Failed to load cart data:', error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Failed to add to cart:', error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, {
          headers: { token },
        });
      } catch (error) {
        console.error('Failed to remove from cart:', error.message);
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const item = food_list.find(f => f._id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;