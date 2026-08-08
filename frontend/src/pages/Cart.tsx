import { useMemo, useState } from "react";
import { useCart } from "../CartContext";
import { ordersApi } from "../api";

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const orderItems = useMemo(
    () => items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    [items]
  );

  const handleCheckout = async () => {
    setMessage(null);
    setLoading(true);
    try {
      await ordersApi.create(orderItems);
      clearCart();
      setMessage("Order created successfully.");
    } catch (err: any) {
      setMessage(err.message || "Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="page cart-page">
      <h2>Your Cart</h2>
      {message && <p className="info">{message}</p>}
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.productId} className="cart-item">
            <div>
              <h3>{item.title}</h3>
              <p>{item.categoryName}</p>
            </div>
            <div className="cart-controls">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
              />
              <p>{item.price.toFixed(2)}</p>
              <button type="button" onClick={() => removeItem(item.productId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>
        <button type="button" className="button" onClick={handleCheckout} disabled={loading}>
          {loading ? "Placing order..." : "Checkout"}
        </button>
      </div>
    </section>
  );
}
