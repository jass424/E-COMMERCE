import { useEffect, useState } from "react";
import "./Orderx.css";

const ViewOrders = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="view-orders-container">
        <h2>My Orders</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="view-orders-container">
      <h2>My Orders</h2>
      <div className="order-card">
        <div className="order-header">
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
    </div>
  );
};

export default ViewOrders;
