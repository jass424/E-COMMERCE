import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    updateCartItem, // make sure this exists in your context if using editable quantity
  } = useContext(ShopContext);

  const total = getTotalCartAmount();

  // Change this to `true` if you want to allow quantity editing in cart
  const editableQuantity = false;

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        const quantity = cartItems[product.id] || 0;

        if (quantity > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  alt={product.name}
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.new_price}</p>

                {editableQuantity ? (
                  <input
                    className="cartitems-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      updateCartItem(product.id, e.target.value)
                    }
                  />
                ) : (
                  <div className="cartitems-quantity">{quantity}</div>
                )}

                <p>${(product.new_price * quantity).toFixed(2)}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(product.id)}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }

        return null;
      })}

      {Object.values(cartItems).every((qty) => qty === 0) && (
        <p style={{ padding: '2rem', fontSize: '1.2rem' }}>
          Your cart is empty.
        </p>
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div className="cartitems-total-items">
            <p>Sub Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <h3>Total</h3>
            <h3>${total.toFixed(2)}</h3>
          </div>
          <Link to="/Checkout">
            <button>Proceed to checkout</button>
          </Link>
        </div>
      </div>

      <div className="cartitems-promocode">
        <p>If you have a promocode, enter it here:</p>
        <div className="cartitems-promobox">
          <input type="text" placeholder="Promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
