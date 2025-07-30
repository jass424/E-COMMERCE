import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProceedToPayment.css';
import { ShopContext } from '../Context/ShopContext';

const ProceedToPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};
  const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);

  const total = getTotalCartAmount();
  const shipping = formData.shippingMethod === 'express' ? 20 : 0;

  const [taxes, setTaxes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const res = await fetch('http://localhost:5000/taxes');
        const data = await res.json();
        if (data.success) setTaxes(data.taxes);
      } catch (err) {
        console.error('❌ Failed to fetch taxes:', err);
      }
    };
    fetchTaxes();
  }, []);

  // ✅ Calculate discount from all products in cart
  const discount = all_product.reduce((acc, product) => {
    const quantity = cartItems[product.id] || 0;
    if (quantity > 0) {
      const originalTotal = product.old_price * quantity;
      const discountedTotal = product.new_price * quantity;
      return acc + (originalTotal - discountedTotal);
    }
    return acc;
  }, 0);

  // ✅ Tax amount from backend taxes
  const taxAmount = taxes.reduce((acc, tax) => {
    const val = tax.percentage ?? tax.value;
    if (tax.type === 'percentage') {
      return acc + (total * val) / 100;
    } else {
      return acc + val;
    }
  }, 0);

  const grandTotal = total + shipping + taxAmount - discount;

  const handlePlaceOrder = () => {
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter a valid UPI ID');
      return;
    }
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please fill in all card details');
      return;
    }

    navigate('/orderplaced', {
      state: {
        formData,
        cartItems,
        paymentMethod,
        upiId,
        cardDetails,
        total,
        shipping,
        discount,
        taxes,
        taxAmount,
        grandTotal,
      },
    });
  };

  return (
    <div className="proceed-payment-container">
      <h2>Review Your Order</h2>

      <div className="user-info">
        <h3>Shipping Information</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Phone:</strong> {formData.number}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}, {formData.country} - {formData.pinCode}</p>
        <p><strong>Shipping Method:</strong> {formData.shippingMethod}</p>
        <p><strong>Referral Code:</strong> {formData.referralCode || 'N/A'}</p>
      </div>

      <div className="product-review">
        <h3>Products</h3>
        {all_product.map((product) => {
          const quantity = cartItems[product.id] || 0;
          if (quantity > 0) {
            return (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ₹{product.new_price} x {quantity} = ₹{product.new_price * quantity}</p>
                  <p style={{ color: 'gray', fontSize: '14px' }}>
                    (₹{product.old_price} - {product.discount || 0}% OFF)
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{total.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        {taxes.map((tax) => (
          <p key={tax._id}>
            {tax.name}: ₹
            {tax.type === 'percentage'
              ? ((total * (tax.percentage ?? tax.value)) / 100).toFixed(2)
              : (tax.value).toFixed(2)}
          </p>
        ))}
        <p>Discount: ₹{discount.toFixed(2)}</p>
        <h4>Total: ₹{grandTotal.toFixed(2)}</h4>
      </div>

      <div className="payment-methods">
        <h3>Choose Payment Method</h3>
        <label>
          <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
          Cash on Delivery
        </label>

        <label>
          <input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
          UPI
        </label>
        {paymentMethod === 'upi' && (
          <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        )}

        <label>
          <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
          Debit / Credit Card
        </label>
        {paymentMethod === 'card' && (
          <div className="card-inputs">
            <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
            <input type="text" placeholder="Expiry (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
            <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
          </div>
        )}
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default ProceedToPayment;
