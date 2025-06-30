// day 4 completed
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Cart from './screens/Cart/Cart'
import Home from './screens/Home/Home'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import './App.css'
import { useState } from 'react'


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
