import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../api";
import { Product } from "../types";
import { useCart } from "../CartContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

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
    Swal.fire({ icon: "success", title: "Added to cart", text: `${product.title} has been added.`, timer: 1400, showConfirmButton: false });
  };

  if (loading) {
    return (
      <section className="page"><p>Loading product details...</p></section>
    );
  }

  if (error) {
    return (
      <section className="page error"><p>{error}</p></section>
    );
  }

  if (!product) {
    return (
      <section className="page"><p>Product not found.</p></section>
    );
  }

  return (
    <section className="page product-details-page">
      <div className="page-heading detail-header">
        <div>
          <span className="eyebrow">Product details</span>
          <h2>{product.title}</h2>
        </div>
        <Link to="/products" className="button secondary small">
          Back to products
        </Link>
      </div>
      <motion.div className="product-detail-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="product-image-large">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <div className="placeholder">No image</div>}
        </div>
        <div className="product-detail-body">
          <div className="detail-meta">
            <span className="category-chip">{product.category?.name ?? "Uncategorized"}</span>
            <span className="price large">{product.currency ?? "$"}{product.price.toFixed(2)}</span>
          </div>
          <p className="product-detail-description">{product.description ?? "No description available for this product."}</p>
          <div className="product-meta-detail">
            <span className="meta-item">SKU: {product.sku ?? "n/a"}</span>
            <span className="meta-item">Added: {new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="product-actions detail-actions">
            <div className="quantity-control">
              <label>
                Qty
                <input type="number" min={1} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
              </label>
            </div>
            <button type="button" className="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/cart" className="button secondary">
              View Cart
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
