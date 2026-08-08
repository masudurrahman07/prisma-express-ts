import { useEffect, useState } from "react";
import { ordersApi } from "../api";
import { Order } from "../types";

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

  return (
    <section className="page orders-page">
      <h2>Your Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !loading ? <p>No orders found.</p> : null}
      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <h3>Order {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
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
