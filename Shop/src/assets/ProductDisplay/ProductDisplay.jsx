import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Components/Context/ShopContext';
import star_icon from '../star_icon.png';
import star_dull_icon from '../star_dull_icon.png';
import ReactImageMagnify from 'react-image-magnify';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const handleAddToCart = () => {
    addToCart(product.id);
    alert("Product is added to Cart");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>

        <div className="productdisplay-img">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: product.image,
              },
              largeImage: {
                src: product.image,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: '150%',
                height: '150%',
              },
            }}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, knitted, pullover shirt with a round neckline and short sleeves.
        </div>

        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-size-options">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button onClick={handleAddToCart}>Add to cart</button>

        <p className="productdisplay-right-category">
          <span>Category: </span>Women, T-shirt, Crop
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>Modern, Latest, Crop
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
