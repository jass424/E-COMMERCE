import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../arrow.png'; //

const Breadcrum = ({ product }) => {
  return (
    <div className="breadcrum">
      Home<img src={arrow_icon} alt="arrow" />
      {product.category} <img src={arrow_icon} alt="arrow" />
      {product.name}
    </div>
  );
};

export default Breadcrum;
