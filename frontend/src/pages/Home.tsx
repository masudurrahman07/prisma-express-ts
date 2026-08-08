import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShield, FiTruck, FiThumbsUp, FiRefreshCcw } from "react-icons/fi";
import { productsApi, categoriesApi } from "../api";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productsApi.list(), categoriesApi.list()])
      .then(([productsRes, categoriesRes]) => {
        setFeatured(productsRes.data.slice(0, 4));
        setCategories(categoriesRes.data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-copy">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">Discover better shopping</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Shop smarter, find favorites, and checkout in seconds.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Browse curated products across top categories, manage your cart securely, and keep your orders organized with a modern shopping experience.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hero-ctas">
            <Link to="/products" className="button hero-button">Shop Now</Link>
            <Link to="/login" className="button secondary hero-secondary">Sign In</Link>
          </motion.div>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <div className="hero-figure">
            <div className="hero-figure-card">
              <span>Featured</span>
              <strong>Wireless Headphones</strong>
              <p>Comfortable, high-quality sound for your daily routine.</p>
            </div>
            <div className="hero-chip">Fast delivery</div>
            <div className="hero-chip">Secure checkout</div>
          </div>
        </motion.div>
      </header>

      <section className="page-section why-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2>Everything you need to shop with confidence</h2>
          </div>
        </div>
        <div className="why-grid">
          <article className="value-card">
            <strong>Quality products</strong>
            <p>Every item is selected to deliver value, style, and reliable performance.</p>
          </article>
          <article className="value-card">
            <strong>Fast shipping</strong>
            <p>Quick order processing and a smooth delivery experience for every purchase.</p>
          </article>
          <article className="value-card">
            <strong>Secure checkout</strong>
            <p>Your account and payments are protected with the right authentication flow.</p>
          </article>
          <article className="value-card">
            <strong>Friendly support</strong>
            <p>Responsive help and a simple return process for a worry-free experience.</p>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Featured products</span>
            <h2>Popular picks</h2>
          </div>
          <Link to="/products" className="button small secondary">Browse all</Link>
        </div>
        {loading ? (
          <p className="loading-text">Loading featured products...</p>
        ) : (
          <div className="grid">
            {featured.length > 0 ? featured.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-state"><p>No featured products available yet.</p></div>}
          </div>
        )}
      </section>

      <section className="page-section category-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Browse by category</span>
            <h2>Shop items by category</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description ?? "Popular products in this category."}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section cta-panel hero-promo">
        <div>
          <span className="eyebrow">Ready to refresh your cart?</span>
          <h2>Find the right product for every occasion.</h2>
          <p>Start browsing today and enjoy a streamlined shopping flow with clear checkout support.</p>
        </div>
        <Link to="/products" className="button">Start shopping</Link>
      </section>
    </div>
  );
}
