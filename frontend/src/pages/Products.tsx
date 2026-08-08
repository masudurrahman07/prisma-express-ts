import { useEffect, useState } from "react";
import { productsApi } from "../api";
import { Product } from "../types";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi
      .list()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page products-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Catalog</span>
          <h2>Explore store products</h2>
          <p className="section-subtitle">Browse all available items, filter by category, and add them to your cart.</p>
        </div>
        <Link to="/" className="button small secondary">Back to home</Link>
      </div>

      {loading && <p className="loading-text">Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && products.length === 0 ? (
        <div className="empty-state">
          <h3>No products available</h3>
          <p>We are currently restocking. Please check back soon.</p>
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
