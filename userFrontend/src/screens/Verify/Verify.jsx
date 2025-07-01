import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
import './Verify.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyOrder = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success, orderId })
      });

      const data = await response.json();
      if (success === 'true') {
        clearCart();
        navigate('/order-success');
      } else {
        navigate('/');
      }
    };

    verifyOrder();
  }, []);

  return (
    <div className="verify-page">
      <h2>Verifying your order...</h2>
    </div>
  );
};

export default Verify;
