import React, { useState } from 'react';
import logo from './JLogo.png';
  
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  
  return (
    <div className="navbar-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
        

      </Link> 
      
      <ul  className="nav-menu">
        <li onClick={() => {setMenu("shop")}}>
          <Link style={{textDecoration:'none'}} to="/" >Shop</Link>{menu === "shop" ? <hr/>:<></>}</li>
      
        <li onClick={() => {setMenu("men")}}>
          <Link style={{textDecoration:'none'}} to="/mens" >Mens</Link>{menu === "men" ? <hr/>:<></>}</li>
        
         <li onClick={() => {setMenu("women")}}>
          <Link style={{textDecoration:'none'}} to="/womens" >Women</Link>{menu === "women" ? <hr/>:<></>}</li>
        
         <li onClick={() => {setMenu("Kids")}}>
          <Link style={{textDecoration:'none'}} to="/Kids" >Kids</Link>{menu === "Kids" ? <hr/>:<></>}</li>
      </ul>

      <div className="nav-login-cart">
        <Link  to="/login">
          <button className="login-button">Login</button>
        </Link>

        <Link  to="/orderx">
          <button className="login-button">Orders</button>
        </Link>

        <Link to="/cart">
       <button className="login-button">Cart</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Navbar;
  