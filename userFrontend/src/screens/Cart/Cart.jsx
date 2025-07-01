import { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Cart.css";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    applyCoupon,
    coupon,
    getDiscountAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");

  const handleApplyCoupon = () => {
    const result = applyCoupon(promoInput);
    toast[result.success ? "success" : "error"](result.message);
  };

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

      <div className="cart-bottom">
        {/* Cart Totals - LEFT */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          {coupon && (
            <div className="cart-total-details">
              <p>Coupon ({coupon.code})</p>
              <p>- ₹{getDiscountAmount()}</p>
            </div>
          )}

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
          </div>

          <div className="cart-total-details">
            <p><strong>Total</strong></p>
            <p>
              ₹
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + 20 - getDiscountAmount()}
            </p>
          </div>

          <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
        </div>

        {/* Promo Code - RIGHT */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
            />
            <button type="button" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

