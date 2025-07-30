import React from 'react';
import './Navbar.css';
import logo from '../../assets/Jred.svg';


const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={logo} alt='' />
      <h1><span>𝙰𝚍𝚖𝚒𝚗 𝙿𝚊𝚗𝚎𝚕</span></h1>
    </div>
  );
};

export default Navbar;
