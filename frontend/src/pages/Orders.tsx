import { useEffect, useState } from "react";
import { ordersApi } from "../api";
import { Order } from "../types";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ordersApi
      .list()
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="page orders-page"><p>Loading orders...</p></section>
    );
  }

  if (error) {
    return (
      <section className="page orders-page"><p className="error">{error}</p></section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="page orders-page empty-page">
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Once you place orders, they will appear here for easy access.</p>
          <Link to="/products" className="button">Shop products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page orders-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Orders</span>
          <h2>Order history</h2>
        </div>
        <Link to="/products" className="button small secondary">Continue shopping</Link>
      </div>
      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-card-header">
              <div>
                <h3>Order #{order.id.slice(0, 8)}</h3>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="order-summary-row">
              <span>Total</span>
              <strong>${order.total.toFixed(2)}</strong>
            </div>
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.product.title}</span>
                  <span>{item.quantity} x ${item.priceAtPurchase.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
