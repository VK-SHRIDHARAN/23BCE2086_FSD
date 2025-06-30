import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import './PlaceOrder.css'; // Make sure to style it

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="place-order">
      {/* Left: Delivery Form */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />

        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>

        <input type="text" placeholder="Phone" />
      </div>

      {/* Right: Order Summary */}
      <div className="place-order-right">
        <h2>Cart Totals</h2>

        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>

        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
        </div>

        <div className="cart-total-details">
          <p>Total</p>
          <p>
            ₹
            {getTotalCartAmount() === 0
              ? 0
              : getTotalCartAmount() + 20}
          </p>
        </div>

        <button>Proceed to Payment</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
