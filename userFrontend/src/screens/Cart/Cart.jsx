import { StoreContext } from "../../context/storeContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Cart.css"; // If needed, make sure you have CSS to style cart

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <br />
      <hr />

      {food_list.map((food, index) => {
        if (cartItems[food._id] > 0) {
          return (
            <div className="cart-items-item" key={index}>
              <img src={food.image} alt={food.name} />
              <p>{food.name}</p>
              <p>₹{food.price}</p>
              <p>{cartItems[food._id]}</p>
              <p>₹{cartItems[food._id] * food.price}</p>
              <div className="food-item-counter cart-counter">
                <img
                  onClick={() => removeFromCart(food._id)}
                  src={assets.remove_icon_red}
                  alt="Remove"
                />
                <p>{cartItems[food._id]}</p>
                <img
                  onClick={() => addToCart(food._id)}
                  src={assets.add_icon_green}
                  alt="Add"
                />
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Bottom Section: Cart Totals (Left), Promo Code (Right) */}
      <div className="cart-bottom">
        {/* Cart Totals - LEFT */}
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</p>
          </div>
          <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
        </div>

        {/* Promo Code - RIGHT */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
