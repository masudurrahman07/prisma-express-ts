import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../api";
import { Product } from "../types";
import { useCart } from "../CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;
    productsApi
      .get(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

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
      <div className="page-heading">
        <div>
          <span className="eyebrow">Product details</span>
          <h2>{product.title}</h2>
        </div>
        <Link to="/products" className="button secondary small">
          Back to products
        </Link>
      </div>
      <div className="product-detail-card">
        <div className="product-image-large">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <div className="placeholder">No image</div>}
        </div>
        <div className="product-detail-body">
          <p className="category-chip">{product.category?.name ?? "Uncategorized"}</p>
          <p className="product-detail-description">{product.description ?? "No description available for this product."}</p>
          <div className="product-meta-detail">
            <span className="price large">{product.currency ?? "$"}{product.price.toFixed(2)}</span>
            <span>SKU: {product.sku ?? "n/a"}</span>
          </div>
          <div className="product-actions">
            <button
              type="button"
              className="button"
              onClick={() => addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl,
                categoryName: product.category?.name ?? null,
              })}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="button secondary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
