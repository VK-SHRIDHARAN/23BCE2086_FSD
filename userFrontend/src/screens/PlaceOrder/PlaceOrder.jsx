import { useContext, useState } from 'react';
import { StoreContext } from '../../context/storeContext';
import './PlaceOrder.css';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getDiscountAmount,
    clearCart,
    coupon
  } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const delivery = subtotal === 0 ? 0 : 20;
  const finalTotal = subtotal + delivery - discount;

  const handleOrder = (e) => {
    e.preventDefault();

    if (subtotal === 0) {
      toast.error("Your cart is empty");
    } else {
      setLoading(true);
      setTimeout(() => {
        toast.success("Order placed successfully");
        clearCart();
        setLoading(false);
        navigate('/order-success');
      }, 2000);
    }
  };

  return (
    <form className="place-order" onSubmit={handleOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>

        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" required />
          <input type="text" placeholder="Country" required />
        </div>

        <input type="text" placeholder="Phone" required />
      </div>

      <div className="place-order-right">
        <h2>Cart Totals</h2>

        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>

        {coupon && (
          <div className="cart-total-details">
            <p>Coupon ({coupon.code})</p>
            <p>- ₹{discount}</p>
          </div>
        )}

        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{delivery}</p>
        </div>

        <div className="cart-total-details total">
          <p>Total</p>
          <p>₹{finalTotal}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader size={20} color="#fff" /> : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
