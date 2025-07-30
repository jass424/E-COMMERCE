import React from 'react'
import './Footer.css'
import Insta from '../../instagram_icon.png'
import Whatsapp from '../../whatsapp_icon.png'
import Pint from '../../pintester_icon.png'
import logo from '../JLogo.png'


const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt="" />
            <p>MART</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={Insta} alt="" />
                </div>
                <div className="footer-icons-container">
                <img src={Whatsapp} alt="" />
                 </div>
                <div className="footer-icons-container">
                <img src={Pint} alt="" />
                 </div> </div>
                 <div className="footer-copyright"> <hr />
            <p>© 2023 J-Mart. All rights reserved.</p>
                 </div>
            </div>
  
  )
}

export default Footer
