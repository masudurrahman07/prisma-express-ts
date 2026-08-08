import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { ordersApi } from "../api";
import Swal from "sweetalert2";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const orderItems = useMemo(
    () => items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    [items]
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await ordersApi.create(orderItems);
      clearCart();
      Swal.fire({ icon: "success", title: "Order placed", text: "Your order has been created.", timer: 1500, showConfirmButton: false });
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Checkout failed", text: err.message || "Failed to create order." });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string, title: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove item?",
      text: `Remove ${title} from your cart?`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
    });

    if (result.isConfirmed) {
      removeItem(productId);
      Swal.fire({ icon: "success", title: "Removed", text: "Item removed from your cart.", timer: 1200, showConfirmButton: false });
    }
  };

  if (items.length === 0) {
    return (
      <section className="page cart-page empty-page">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add products to your cart and return here to checkout.</p>
          <Link to="/products" className="button">
            Start shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page cart-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Cart</span>
          <h2>Your shopping bag</h2>
        </div>
        <Link to="/products" className="button small secondary">
          Continue shopping
        </Link>
      </div>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article key={item.productId} className="cart-item card-item">
              <div className="cart-item-info">
                <div className="cart-item-title">
                  <strong>{item.title}</strong>
                  <span>{item.categoryName ?? "Item"}</span>
                </div>
                <div className="cart-controls">
                  <div className="quantity-stepper">
                    <button type="button" className="stepper-button" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                      <FiMinus size={16} />
                    </button>
                    <input type="number" min={1} value={item.quantity} onChange={(event) => updateQuantity(item.productId, Number(event.target.value))} />
                    <button type="button" className="stepper-button" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <button type="button" className="button small secondary remove-button" onClick={() => handleRemove(item.productId, item.title)}>
                    <FiTrash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary card-item">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Items total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Estimated tax</span>
            <strong>${(total * 0.06).toFixed(2)}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${(total * 1.06).toFixed(2)}</strong>
          </div>
          <button type="button" className="button" onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Checkout"}
          </button>
          <div className="summary-note">Orders are created using backend order support and cleared from the cart after checkout.</div>
        </aside>
      </div>
    </section>
  );
}
