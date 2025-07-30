import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

function Item(props) {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          src={props.image}
          alt={props.name}
        />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-prices-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
      </Link>
    </div>
  );
}

export default Item;
