import { useEffect, useState } from "react";
import "./Allstocks.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      });
  }, []);

  return (
    <div className="view-orders-container">
      <h2>📦 Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <h3>{order.name}</h3>
              <p>{order.email} | 📞 {order.phone}</p>
              <p>{order.address}, {order.city}, {order.state}, {order.country} - {order.pinCode}</p>
              <p>📦 Shipping Method: <strong>{order.shippingMethod}</strong></p>
              <p>💳 Payment: <strong>{order.paymentMethod}</strong></p>
              <p>🕒 Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>🚚 Shipping Date: {new Date(order.shippingDate).toLocaleString()}</p>
            </div>

            <div className="order-products">
              <h4>Ordered Products:</h4>
              {order.products.map((item, i) => (
                <div className="order-product" key={i}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Total: ₹{item.total}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
              <p>Shipping: ₹{order.shipping.toFixed(2)}</p>
              <p>Discount: ₹{order.discount.toFixed(2)}</p>
              <p><strong>Total Amount: ₹{order.totalAmount.toFixed(2)}</strong></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewOrders;
