import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productsApi } from "../api";
import { Product } from "../types";
import { useCart } from "../CartContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  ArrowLeft, ShoppingCart, Minus, Plus, Tag, Hash, Calendar,
  CheckCircle, Trash2, Package,
} from "lucide-react";

function DetailSkeleton() {
  return (
    <div className="pd-skeleton">
      <div className="pd-skeleton-img" />
      <div className="pd-skeleton-body">
        {[60, 90, 100, 70, 50].map((w, i) => (
          <div key={i} className="pd-skeleton-line" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const { addItem, removeItem, updateQuantity, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const cartItem = product ? items.find((i) => i.productId === product.id) : undefined;
  const inCart   = !!cartItem;

  useEffect(() => {
    if (!id) return;
    productsApi
      .get(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
      categoryName: product.category?.name ?? null,
    });
    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.title} has been added.`,
      timer: 1300,
      showConfirmButton: false,
    });
  };

  const handleRemove = async () => {
    if (!product) return;
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove from cart?",
      text: `This will remove ${product.title} from your cart.`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
      confirmButtonColor: "#dc2626",
    });
    if (result.isConfirmed) removeItem(product.id);
  };

  if (loading) {
    return (
      <section className="page pd-page">
        <button type="button" className="pd-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} strokeWidth={2} /> Products
        </button>
        <DetailSkeleton />
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="page pd-page pd-error-state">
        <Package size={48} strokeWidth={1.2} />
        <h2>{error ? "Failed to load product" : "Product not found"}</h2>
        <p>{error ?? "This product may have been removed or the link is incorrect."}</p>
        <Link to="/products" className="btn btn--primary btn--md">
          Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="page pd-page">
   
      <button type="button" className="pd-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} strokeWidth={2} /> Back to Products
      </button>

      <motion.div
        className="pd-layout"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}>
        
        <div className="pd-image-col">
          <div className="pd-image-frame">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.title} />
            ) : (
              <div className="pd-image-placeholder">
                <Package size={60} strokeWidth={1} />
                <span>No image available</span>
              </div>
            )}
          </div>
         
          <div className="pd-image-chips">
            {product.sku && (
              <span className="pd-chip">
                <Hash size={13} strokeWidth={2} /> {product.sku}
              </span>
            )}
            <span className="pd-chip">
              <Calendar size={13} strokeWidth={2} />
              Added {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

      
        <div className="pd-detail-col">
       
          <div className="pd-category-row">
            <span className="category-chip">
              <Tag size={12} strokeWidth={2} /> {product.category?.name ?? "Uncategorized"}
            </span>
          </div>

          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-price-row">
            <span className="pd-price">
              {product.currency ?? "$"}{product.price.toFixed(2)}
            </span>
            <span className="pd-stock-badge">
              <CheckCircle size={14} strokeWidth={2} /> In Stock
            </span>
          </div>

          {product.description && (
            <p className="pd-description">{product.description}</p>
          )}

          <div className="pd-divider" />

       
          {inCart ? (
            <div className="pd-in-cart">
              <div className="pd-in-cart-label">
                <CheckCircle size={16} strokeWidth={2} className="pd-in-cart-check" />
                <strong>In your cart</strong>
                <span className="pd-in-cart-qty">({cartItem.quantity} added)</span>
              </div>
              <div className="pd-in-cart-controls">
                <div className="pd-stepper">
                  <button
                    type="button"
                    className="pd-stepper-btn"
                    onClick={() =>
                      cartItem.quantity > 1
                        ? updateQuantity(product.id, cartItem.quantity - 1)
                        : handleRemove()
                    }
                    aria-label="Decrease">
                    <Minus size={14} strokeWidth={2.5} />
                  </button>
                  <span className="pd-stepper-val">{cartItem.quantity}</span>
                  <button
                    type="button"
                    className="pd-stepper-btn"
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    aria-label="Increase" >
                    <Plus size={14} strokeWidth={2.5} />
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn--danger btn--md"
                  onClick={handleRemove}  >
                  <Trash2 size={15} strokeWidth={2} /> Remove from Cart
                </button>
                <Link to="/cart" className="btn btn--primary btn--md">
                  <ShoppingCart size={15} strokeWidth={2} /> View Cart
                </Link>
              </div>
            </div>
          ) : (
            <div className="pd-add-controls">
              <div className="pd-qty-row">
                <label className="pd-qty-label" htmlFor="pd-qty">Quantity</label>
                <div className="pd-stepper">
                  <button
                    type="button"
                    className="pd-stepper-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease" >
                    <Minus size={14} strokeWidth={2.5} />
                  </button>
                  <input
                    id="pd-qty"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="pd-stepper-input"
                    aria-label="Quantity" />
                  <button
                    type="button"
                    className="pd-stepper-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase" >
                    <Plus size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div className="pd-cta-row">
                <button
                  type="button"
                  className="btn btn--primary btn--lg pd-add-btn"
                  onClick={handleAddToCart}  >
                  <ShoppingCart size={17} strokeWidth={2} />
                  Add to Cart
                </button>
                <Link to="/cart" className="btn btn--outline btn--lg">
                  View Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
