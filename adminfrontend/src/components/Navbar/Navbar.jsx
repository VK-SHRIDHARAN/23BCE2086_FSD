import React from 'react'
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets?.logo} alt="Logo" />
      <img src={assets?.profile_image} alt="Profile" className="profile" />
    </div>
  );
};

export default Navbar;
