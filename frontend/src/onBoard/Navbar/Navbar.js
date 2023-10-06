// Navbar.js
import React from 'react';
import Logo from '../../assets/images/Logo.svg'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'


const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  console.log(location);

  return (
    <nav className='navBar'>
      <Link to='/'>
        <div className='navLeft'>
          <img
            className='navLogo' src={Logo} alt="Chaturang_Logo" />
          <h1>Chaturang</h1>
        </div>
      </Link>

      <div>

        {user ? <button onClick={logout}>Logout</button> :
          location.pathname === '/' ?
            <Link to='/signup'><button >Signup</button></Link>
            :
            <Link to=''><button >Login</button></Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;