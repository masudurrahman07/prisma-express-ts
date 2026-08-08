import { useEffect, useState } from "react";
import { productsApi } from "../api";
import { Product } from "../types";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

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
          <h2>Products</h2>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && products.length === 0 ? (
        <div className="empty-state">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 3h18v4H3z" fill="#eef2ff" />
            <path d="M5 9h14l-1.6 9.6a1 1 0 0 1-.99.8H7.59a1 1 0 0 1-.99-.8L5 9z" fill="#f8fbff" />
            <path d="M9 13h6v2H9z" fill="#c7d2fe" />
          </svg>
          <h3>No products yet</h3>
          <p>There are currently no products available. Check back later or add sample products to the backend database.</p>
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image">
                {product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <div className="placeholder">No image</div>}
              </div>
              <div className="product-body">
                <h3>{product.title}</h3>
                <p className="product-detail-description">{product.description ?? "No description"}</p>
                <p className="price"><strong>{product.currency ?? "$"}{(product.price ?? 0).toFixed(2)}</strong></p>
                <p className="muted"><strong>Category:</strong> {product.category?.name ?? "None"}</p>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="button small">
                    Details
                  </Link>
                  <button type="button" className="button secondary small" onClick={() => addItem({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.imageUrl,
                    categoryName: product.category?.name ?? null,
                  })}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
