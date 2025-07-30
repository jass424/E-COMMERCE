import React, { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './OrderPlaced.css';

const OrderPlaced = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);
  const hasSaved = useRef(false); // ✅ Prevent double-save

  const {
    formData,
    cartItems,
    total,
    shipping,
    discount,
    grandTotal,
    paymentMethod,
    taxes = [],
    taxAmount = 0
  } = state || {};

  useEffect(() => {
    const saveOrderToBackend = async () => {
      if (hasSaved.current || !formData || !cartItems || !all_product?.length) return;
      hasSaved.current = true; // ✅ mark as saved

      const orderedItems = all_product
        .filter((p) => cartItems[p.id] > 0)
        .map((p) => ({
          title: p.name,
          price: p.new_price,
          image: p.image,
          quantity: cartItems[p.id],
          total: p.new_price * cartItems[p.id],
        }));

      const orderPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pinCode: formData.pinCode,
        shippingMethod: formData.shippingMethod,
        paymentMethod,
        products: orderedItems,
        subtotal: total,
        shipping,
        discount,
        taxes,
        taxAmount,
        totalAmount: grandTotal,
        orderDate: new Date(),
        shippingDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      };

      try {
        const res = await fetch("http://localhost:5000/placeorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();
        if (data.success) {
          localStorage.setItem("lastOrder", JSON.stringify(orderPayload));
        } else {
          console.error("❌ Order not saved:", data.message);
        }
      } catch (err) {
        console.error("❌ Error saving order:", err);
      }
    };

    saveOrderToBackend();
  }, [formData, cartItems, all_product, total, grandTotal, paymentMethod, shipping, discount, taxes, taxAmount]);

  return (
    <div className="order-placed-container">
      <h2>Thank You! Your Order Has Been Placed</h2>

      <div className="order-section">
        <h3>Shipping Details</h3>
        <p><strong>Name:</strong> {formData?.name}</p>
        <p><strong>Email:</strong> {formData?.email}</p>
        <p><strong>Address:</strong> {formData?.address}, {formData?.city}, {formData?.state}, {formData?.country} - {formData?.pinCode}</p>
        <p><strong>Phone:</strong> {formData?.number}</p>
        <p><strong>Shipping Method:</strong> {formData?.shippingMethod}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
      </div>

      <div className="order-products">
        <h3>Ordered Products</h3>
        {all_product.map((product) => {
          const quantity = cartItems?.[product.id] || 0;
          if (quantity > 0) {
            return (
              <div className="ordered-product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Total: ₹{product.new_price * quantity}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{total?.toFixed(2)}</p>
        <p>Shipping: ₹{shipping?.toFixed(2)}</p>

        {taxes.map((tax, i) => (
          <p key={i}>
            {tax.name} ({tax.type === 'percentage' ? `${tax.percentage ?? tax.value}%` : `₹${tax.value}`}): ₹
            {tax.type === 'percentage'
              ? ((total * (tax.percentage ?? tax.value)) / 100).toFixed(2)
              : tax.value.toFixed(2)}
          </p>
        ))}

        <p>Discount: ₹{discount?.toFixed(2)}</p>
        <p><strong>Total: ₹{grandTotal?.toFixed(2)}</strong></p>
      </div>

      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default OrderPlaced;
