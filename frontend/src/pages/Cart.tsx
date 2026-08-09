import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { ordersApi } from "../api";
import Swal from "sweetalert2";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    [items]
  );

  const tax = total * 0.06;
  const grandTotal = total + tax;

  const handleCheckout = async () => {
    setLoading(true);

    try {
      await ordersApi.create(orderItems);
      clearCart();

      Swal.fire({
        icon: "success",
        title: "Order placed!",
        text: "Your order has been created successfully.",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Checkout failed",
        text: err.message || "Failed to create order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string, title: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove item?",
      text: `Remove "${title}" from your cart?`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      removeItem(productId);
    }
  };

  /* ───────────────── Empty Cart ───────────────── */

  if (items.length === 0) {
    return (
      <main className="page cart-page cart-page--empty">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={34} strokeWidth={1.5} />
          </div>

          <span className="eyebrow">Your shopping bag</span>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet. Explore our collection
            and find something you'll love.
          </p>

          <Link
            to="/products"
            className="btn btn--primary btn--lg cart-empty-btn"
          >
            Start Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  /* ───────────────── Cart ───────────────── */

  return (
    <main className="page cart-page">
      {/* Header */}
      <header className="cart-page-header">
        <div className="cart-heading-content">
          <span className="eyebrow">Shopping Bag</span>

          <h1>Your Cart</h1>

          <p>
            Review your selected products and complete your purchase when
            you're ready.
          </p>
        </div>

        <Link to="/products" className="btn btn--outline btn--md">
          Continue Shopping
          <ArrowRight size={15} />
        </Link>
      </header>

      {/* Cart Content */}
      <div className="cart-layout">
        {/* ───────────── Items ───────────── */}
        <section className="cart-items-section">
          <div className="cart-section-heading">
            <div>
              <h2>Your Items</h2>

              <span>
                {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="cart-secure-label">
              <ShieldCheck size={15} />
              Secure checkout
            </div>
          </div>

          <div className="cart-list">
            {items.map((item) => (
              <article key={item.productId} className="cart-item-card">
                {/* Product image */}
                <Link
                  to={`/products/${item.productId}`}
                  className="cart-item-thumb"
                  aria-label={`View ${item.title}`}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="cart-item-placeholder">
                      <Package size={30} strokeWidth={1.4} />
                    </div>
                  )}
                </Link>

                {/* Product information */}
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div className="cart-item-details">
                      {item.categoryName && (
                        <span className="cart-item-cat">
                          {item.categoryName}
                        </span>
                      )}

                      <Link
                        to={`/products/${item.productId}`}
                        className="cart-item-title"
                      >
                        {item.title}
                      </Link>

                      <span className="cart-item-unit-price">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>

                    {/* Desktop remove */}
                    <button
                      type="button"
                      className="cart-remove-btn cart-remove-btn--desktop"
                      onClick={() =>
                        handleRemove(item.productId, item.title)
                      }
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={16} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    {/* Quantity */}
                    <div className="cart-item-control">
                      <span className="cart-control-label">Quantity</span>

                      <div className="cart-qty-stepper">
                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>

                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          aria-label="Quantity"
                          className="cart-qty-input"
                        />

                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {/* Item subtotal */}
                    <div className="cart-item-price">
                      <span className="cart-control-label">Subtotal</span>

                      <strong className="cart-item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>

                    {/* Mobile remove */}
                    <button
                      type="button"
                      className="cart-remove-btn cart-remove-btn--mobile"
                      onClick={() =>
                        handleRemove(item.productId, item.title)
                      }
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={15} strokeWidth={1.8} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Delivery reassurance */}
          <div className="cart-benefits">
            <div className="cart-benefit">
              <div className="cart-benefit-icon">
                <Truck size={18} />
              </div>

              <div>
                <strong>Reliable delivery</strong>
                <span>Your order will be carefully prepared.</span>
              </div>
            </div>

            <div className="cart-benefit">
              <div className="cart-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Secure checkout</strong>
                <span>Your account and order information are protected.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Summary ───────────── */}
        <aside className="cart-summary">
          <div className="cart-summary-header">
            <div>
              <span className="eyebrow">Checkout</span>
              <h2>Order Summary</h2>
            </div>

            <div className="cart-summary-bag">
              <ShoppingBag size={18} />
            </div>
          </div>

          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>
                Subtotal
                <small>{items.length} items</small>
              </span>

              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Estimated tax</span>

              <strong>${tax.toFixed(2)}</strong>
            </div>
          </div>

          <div className="cart-summary-divider" />

          <div className="cart-summary-total">
            <div>
              <span>Total</span>
              <small>Including estimated tax</small>
            </div>

            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            className="btn btn--primary btn--lg cart-checkout-btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                Processing...
              </>
            ) : (
              <>
                Place Order
                <ArrowRight size={17} strokeWidth={2} />
              </>
            )}
          </button>

          <p className="cart-summary-note">
            By placing your order, your selected items will be submitted and
            your cart will be cleared after successful checkout.
          </p>

          <Link to="/products" className="cart-summary-continue">
            Continue shopping
            <ArrowRight size={14} />
          </Link>
        </aside>
      </div>
    </main>
  );
}