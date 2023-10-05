// Navbar.js
import React from 'react';
import Logo from '../../assets/images/Logo.svg'
import './Navbar.css'


const Navbar = ({ onLogout }) => {
  return (
    <nav className='navBar'>
      <div className='navLeft'>
      <img
   className='navLogo' src={Logo} alt="Chaturang_Logo" />
   <h1>Chaturang</h1>
      </div>
      <div>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;