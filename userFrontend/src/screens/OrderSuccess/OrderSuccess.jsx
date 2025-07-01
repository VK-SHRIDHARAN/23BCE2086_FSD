import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <h2>🎉 Your order has been placed!</h2>
      <p>Thank you for ordering. We are preparing your food.</p>
      <Link to="/" className="home-button">Go back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
