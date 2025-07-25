import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Cart from './screens/Cart/Cart';
import Home from './screens/Home/Home';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import OrderSuccess from './screens/OrderSuccess/OrderSuccess';
import Verify from './screens/Verify/Verify'; // ✅ Add this line
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import './App.css';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/verify" element={<Verify />} /> {/* ✅ Add this route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

