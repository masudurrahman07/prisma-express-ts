import { useEffect, useState } from "react";
import { ordersApi } from "../api";
import { Order } from "../types";
import { Link } from "react-router-dom";
import { ClipboardList, ShoppingBag, Calendar, CreditCard, Package } from "lucide-react";

function OrderSkeleton() {
  return (
    <div className="order-skeleton">
      <div className="order-skeleton-header" />
      <div className="order-skeleton-row" />
      <div className="order-skeleton-row order-skeleton-row--short" />
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    ordersApi
      .list()
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="page orders-page">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Orders</span>
            <h2>Order History</h2>
          </div>
        </div>
        <div className="orders-list">
          {Array.from({ length: 3 }).map((_, i) => <OrderSkeleton key={i} />)}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page orders-page">
        <div className="empty-state">
          <Package size={48} strokeWidth={1.2} />
          <h2>Could not load orders</h2>
          <p>{error}</p>
          <button type="button" className="btn btn--outline btn--md" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="page orders-page">
        <div className="empty-state">
          <ClipboardList size={52} strokeWidth={1.2} />
          <h2>No orders yet</h2>
          <p>Once you place orders they will appear here with full details and status.</p>
          <Link to="/products" className="btn btn--primary btn--md">
            <ShoppingBag size={16} strokeWidth={2} /> Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page orders-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h2>Order History</h2>
          <p className="section-subtitle">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>
        <Link to="/products" className="btn btn--outline btn--sm">Continue shopping</Link>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-card-id-row">
                <h3 className="order-id">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-meta">
                <span className="order-meta-item">
                  <Calendar size={13} strokeWidth={2} />
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </span>
                <span className="order-meta-item">
                  <CreditCard size={13} strokeWidth={2} />
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="order-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="order-line-item">
                  <div className="order-line-thumb" aria-hidden="true">
                    {item.product.imageUrl ? (
                      <img src={item.product.imageUrl} alt="" />
                    ) : (
                      <Package size={16} strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="order-line-title">{item.product.title}</span>
                  <span className="order-line-qty">×{item.quantity}</span>
                  <span className="order-line-price">${item.priceAtPurchase.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-card-total">
              <span>Order Total</span>
              <strong>${order.total.toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
