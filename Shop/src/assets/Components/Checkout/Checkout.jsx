import React, { useState } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    shippingMethod: 'standard',
    referralCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceed = () => {
    if (!formData.name || !formData.number || !formData.email || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    // Correct navigation route
    navigate('/payment', { state: formData });
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout Details</h2>
      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input name="number" type="tel" placeholder="Phone Number" value={formData.number} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
        <input name="state" type="text" placeholder="State" value={formData.state} onChange={handleChange} />
        <input name="country" type="text" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input name="pinCode" type="text" placeholder="PIN Code" value={formData.pinCode} onChange={handleChange} />

        <select name="shippingMethod" value={formData.shippingMethod} onChange={handleChange}>
          <option value="standard">Standard Shipping - Free</option>
          <option value="express">One day Shipping - $20</option>
          

        </select>

        <input name="referralCode" type="text" placeholder="Referral Code (Optional)" value={formData.referralCode} onChange={handleChange} />

        <button type="button" onClick={handleProceed}>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
