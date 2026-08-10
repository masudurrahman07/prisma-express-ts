import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  HeartHandshake,
  Package,
  ShoppingCart,
  Star,
  Users,
  Zap,
  Lock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  BadgeCheck,
  Headphones,
  ShoppingBag,
  Sparkles,
  Check,
} from "lucide-react";
import { productsApi, categoriesApi } from "../api";
import { Product, Category } from "../types";
import HomeProductCard from "../components/HomeProductCard";


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, delay },
});

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay: i * 0.09, ease: "easeOut" as const },
});


const benefits = [
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    title: "Secure Shopping",
    desc: "Authentication-protected cart and order management on every account.",
  },
  {
    icon: <Truck size={22} strokeWidth={2} />,
    title: "Fast Processing",
    desc: "Orders are created instantly and tracked directly from your account.",
  },
  {
    icon: <RefreshCcw size={22} strokeWidth={2} />,
    title: "Easy Returns",
    desc: "Straightforward order management with full visibility on every purchase.",
  },
  {
    icon: <HeartHandshake size={22} strokeWidth={2} />,
    title: "Curated Quality",
    desc: "Every product is selected to deliver real value and reliable performance.",
  },
];

const stats = [
  { icon: <Package size={24} strokeWidth={1.8} />, value: "500+", label: "Products Available" },
  { icon: <LayoutGrid size={24} strokeWidth={1.8} />, value: "20+", label: "Product Categories" },
  { icon: <Lock size={24} strokeWidth={1.8} />, value: "100%", label: "Secure Shopping" },
  { icon: <Headphones size={24} strokeWidth={1.8} />, value: "24/7", label: "Customer Support" },
];

const whyUs = [
  {
    icon: <Zap size={22} strokeWidth={2} />,
    title: "Simple & Fast",
    desc: "Browse, add to cart, and check out in just a few clicks. No friction, no fuss.",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    icon: <Lock size={22} strokeWidth={2} />,
    title: "Secure Authentication",
    desc: "Cookie-based sessions keep your account safe. Your cart and orders are always private.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: <ShoppingCart size={22} strokeWidth={2} />,
    title: "Persistent Cart",
    desc: "Your cart saves across sessions. Come back later and it's exactly where you left it.",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: <TrendingUp size={22} strokeWidth={2} />,
    title: "Full Order History",
    desc: "Every order is stored in your account with full item details and status tracking.",
    color: "#dc2626",
    bg: "#fff1f2",
  },
];

const highlights = [
  {
    icon: <BadgeCheck size={20} strokeWidth={2} />,
    text: "Verified product listings",
  },
  {
    icon: <CheckCircle size={20} strokeWidth={2} />,
    text: "Real-time cart management",
  },
  {
    icon: <Star size={20} strokeWidth={2} />,
    text: "Curated top-category products",
  },
  {
    icon: <Users size={20} strokeWidth={2} />,
    text: "Account & order tracking built-in",
  },
];


const fallbackCategoryIcons: Record<string, string> = {
  electronics: "💻",
  clothing: "👕",
  books: "📚",
  "home & kitchen": "🏠",
  sports: "⚽",
  beauty: "💄",
  toys: "🧸",
  food: "🍎",
  garden: "🌿",
  automotive: "🚗",
};

function getCategoryEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(fallbackCategoryIcons)) {
    if (lower.includes(key)) return emoji;
  }
  return "🛍️";
}

/* ── Component ──────────────────────────────────────── */
export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    Promise.all([productsApi.list(), categoriesApi.list()])
      .then(([productsRes, categoriesRes]) => {
        setFeatured(productsRes.data.slice(0, 8));
        setCategories(categoriesRes.data.slice(0, 8));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="home-page">

     
      <section className="hp-hero">
        {/* Continuous Drifting Aurora Atmosphere */}
        <div className="hp-hero-aurora-bg" aria-hidden="true">
          <div className="hp-hero-grid-overlay" />
          <div className="hp-hero-aurora-blob hp-hero-aurora-blob--1" />
          <div className="hp-hero-aurora-blob hp-hero-aurora-blob--2" />
          <div className="hp-hero-aurora-blob hp-hero-aurora-blob--3" />
        </div>

        <div className="hp-hero-inner">
          {/* Left copy */}
          <div className="hp-hero-copy">
            <motion.div className="hp-hero-badge" {...fadeUp(0)}>
              <ShoppingBag size={14} className="hp-hero-badge-icon" />
              <span>Your modern shopping destination</span>
            </motion.div>

            <motion.h1 className="hp-hero-headline" {...fadeUp(0.08)}>
              Discover products <br className="hp-br-desktop" />
              you'll <span className="hp-headline-highlight">actually love.</span>
            </motion.h1>

            <motion.p className="hp-hero-sub" {...fadeUp(0.14)}>
              Browse a curated catalog, manage your cart securely, and track
              every order — all in one clean, modern storefront.
            </motion.p>

            <motion.div className="hp-hero-ctas" {...fadeUp(0.2)}>
              <Link to="/products" className="btn btn--primary btn--lg hp-hero-btn-primary">
                Shop Now
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
              <Link to="/products" className="btn btn--outline btn--lg hp-hero-btn-secondary">
                Explore Products
              </Link>
            </motion.div>

          
            <motion.div className="hp-hero-pills" {...fadeUp(0.26)}>
              {highlights.map((h) => (
                <span key={h.text} className="hp-hero-pill">
                  {h.icon} {h.text}
                </span>
              ))}
            </motion.div>
          </div>

        
          <motion.div
            className="hp-hero-preview-wrap"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}>
          
            <div className="hp-hero-preview-glow" aria-hidden="true" />

          
            <div className="hp-hero-glass-card">
         
              <div className="hp-hero-glass-header">
                <div className="hp-hero-glass-dots" aria-hidden="true">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <div className="hp-hero-glass-title">
                  <Sparkles size={13} className="hp-sparkle-icon" />
                  <span>Shoply Storefront</span>
                </div>
                <div className="hp-hero-glass-status">
                  <span className="hp-status-dot" /> Live
                </div>
              </div>

             
              <div className="hp-hero-glass-body">
        
                <div className="hp-hero-glass-search">
                  <div className="hp-hero-search-left">
                    <span className="hp-search-tag">Featured Catalog</span>
                  </div>
                  <div className="hp-hero-search-right">
                    <ShoppingCart size={14} />
                    <span className="hp-cart-badge-count">
                      {featured.slice(0, 3).length > 0 ? featured.slice(0, 3).length : "0"}
                    </span>
                  </div>
                </div>

                
                <div className="hp-hero-preview-products">
                  {featured.length > 0 ? (
                    featured.slice(0, 3).map((p, idx) => (
                      <div key={p.id || idx} className="hp-preview-product-row">
                        <div className="hp-preview-thumb">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.title} />
                          ) : (
                            <span className="hp-preview-thumb-fallback">🛍️</span>
                          )}
                        </div>
                        <div className="hp-preview-product-info">
                          <strong className="hp-preview-product-title">
                            {p.title.length > 24 ? p.title.slice(0, 24) + "…" : p.title}
                          </strong>
                          <span className="hp-preview-product-cat">
                            {p.category?.name ?? "Featured"}
                          </span>
                        </div>
                        <div className="hp-preview-product-price">
                          {p.currency ?? "$"}{typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                        </div>
                      </div>
                    ))
                  ) : (
                    
                    [1, 2, 3].map((i) => (
                      <div key={i} className="hp-preview-product-row hp-preview-product-row--skeleton">
                        <div className="hp-preview-thumb hp-skeleton-box" />
                        <div className="hp-preview-product-info">
                          <div className="hp-skeleton-line hp-skeleton-line--title" />
                          <div className="hp-skeleton-line hp-skeleton-line--sub" />
                        </div>
                        <div className="hp-skeleton-line hp-skeleton-line--price" />
                      </div>
                    ))
                  )}
                </div>

             
                <div className="hp-hero-cart-confirm">
                  <div className="hp-cart-confirm-icon">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div className="hp-cart-confirm-text">
                    <strong>Added to cart</strong>
                    <span>Express Checkout Ready</span>
                  </div>
                  <span className="hp-cart-confirm-time">Just now</span>
                </div>
              </div>
            </div>

      
            <motion.div
              className="hp-hero-float-chip hp-hero-float-chip--tl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" as const }} >
              <div className="hp-float-chip-icon hp-float-chip-icon--blue">
                <Package size={15} />
              </div>
              <div className="hp-float-chip-info">
                <strong>500+</strong>
                <span>Products</span>
              </div>
            </motion.div>

            <motion.div
              className="hp-hero-float-chip hp-hero-float-chip--br"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" as const }} >
              <div className="hp-float-chip-icon hp-float-chip-icon--green">
                <ShieldCheck size={15} />
              </div>
              <div className="hp-float-chip-info">
                <strong>Secure Shopping</strong>
                <span>100% Protected</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

   
      <section className="hp-section hp-benefits">
        <div className="hp-section-inner">
          <div className="hp-section-header">
            <motion.span className="eyebrow" {...fadeUp(0)} style={{ textAlign: "center" }}>
              Why shop with us
            </motion.span>
            <motion.h2 {...fadeUp(0.06)}>Shopping built around you</motion.h2>
            <motion.p className="hp-section-desc" {...fadeUp(0.1)}>
              Every feature is designed to make your experience faster, safer, and simpler.
            </motion.p>
          </div>
          <div className="hp-benefits-grid">
            {benefits.map((b, i) => (
              <motion.article
                key={b.title}
                className="hp-benefit-card"
                {...stagger(i)}  >
                <div className="hp-benefit-icon" aria-hidden="true">{b.icon}</div>
                <strong>{b.title}</strong>
                <p>{b.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

     
      <section className="hp-section hp-section--alt hp-categories">
        <div className="hp-section-inner">
          <div className="hp-section-header">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }} >
              Browse by category
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}  >
              Shop what you need
            </motion.h2>
            <motion.p
              className="hp-section-desc"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }} >
              Jump straight to the products that interest you most.
            </motion.p>
          </div>

          {loading ? (
            <p className="loading-text">Loading categories...</p>
          ) : categories.length > 0 ? (
            <div className="hp-category-grid">
              {categories.map((cat, i) => (
                <motion.div key={cat.id} {...stagger(i)}>
                  <Link to="/products" className="hp-category-card">
                    <span className="hp-category-emoji" aria-hidden="true">
                      {getCategoryEmoji(cat.name)}
                    </span>
                    <strong className="hp-category-name">{cat.name}</strong>
                    <p className="hp-category-desc">
                      {cat.description ?? "Explore products in this category"}
                    </p>
                    <span className="hp-category-cta">
                      Browse <ArrowRight size={13} strokeWidth={2.5} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="hp-category-grid">
              {["Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty"].map(
                (name, i) => (
                  <motion.div key={name} {...stagger(i)}>
                    <Link to="/products" className="hp-category-card">
                      <span className="hp-category-emoji" aria-hidden="true">
                        {getCategoryEmoji(name)}
                      </span>
                      <strong className="hp-category-name">{name}</strong>
                      <p className="hp-category-desc">Explore {name.toLowerCase()} products</p>
                      <span className="hp-category-cta">
                        Browse <ArrowRight size={13} strokeWidth={2.5} />
                      </span>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          )}
        </div>
      </section>

 
      <section className="hp-section hp-featured">
        <div className="hp-section-inner">
          <div className="hp-section-header">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }} >
              Featured products
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}>
              Popular picks
            </motion.h2>
            <motion.p
              className="hp-section-desc"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }} >
              Real products from our catalog — add any to your cart and check out instantly.
            </motion.p>
          </div>

          {loading ? (
            <div className="hp-product-skeleton-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="hp-skeleton-card" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="hp-product-grid">
              {featured.map((product, i) => (
                <motion.div key={product.id} {...stagger(i % 4)}>
                  <HomeProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products available yet. Check back soon.</p>
            </div>
          )}

          <motion.div
            className="hp-view-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }} >
            <Link to="/products" className="btn btn--outline btn--lg">
              View All Products <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

    
      <section className="hp-stats-band">
        <div className="hp-stats-inner">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="hp-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.08, ease: "easeOut" as const }}  >
              <div className="hp-stat-icon" aria-hidden="true">{s.icon}</div>
              <strong className="hp-stat-value">{s.value}</strong>
              <span className="hp-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

  
      <section className="hp-section hp-why">
        <div className="hp-section-inner hp-why-inner">
          <div className="hp-why-copy">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }} >
              Why choose Shoply
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
            >
              Built for the modern shopper
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              Shoply isn't just another product listing. It's a complete shopping
              experience — from discovery to checkout — built with care and attention
              to detail.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}>
              <Link to="/about" className="btn btn--outline btn--md">
                Learn more about us
              </Link>
            </motion.div>
          </div>

          <div className="hp-why-cards">
            {whyUs.map((w, i) => (
              <motion.article
                key={w.title}
                className="hp-why-card"
                {...stagger(i)} >
                <div
                  className="hp-why-icon"
                  style={{ background: w.bg, color: w.color }}
                  aria-hidden="true" >
                  {w.icon}
                </div>
                <div>
                  <strong>{w.title}</strong>
                  <p>{w.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>


      <section className="hp-section hp-section--alt hp-simple">
        <div className="hp-section-inner">
          <div className="hp-section-header">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}  >
              The Shoply experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }} >
              Shopping made simple
            </motion.h2>
          </div>

          <div className="hp-steps">
            {[
              {
                step: "01",
                icon: <LayoutGrid size={24} strokeWidth={2} />,
                title: "Browse & Discover",
                desc: "Explore products across categories. Filter and find exactly what you're looking for.",
              },
              {
                step: "02",
                icon: <ShoppingCart size={24} strokeWidth={2} />,
                title: "Add to Cart",
                desc: "Add items to your cart with one click. Your cart persists across sessions — shop at your own pace.",
              },
              {
                step: "03",
                icon: <CheckCircle size={24} strokeWidth={2} />,
                title: "Checkout Instantly",
                desc: "Confirm your order and it's tracked immediately. Full order history available in your account.",
              },
            ].map((s, i) => (
              <motion.article key={s.step} className="hp-step" {...stagger(i)}>
                <div className="hp-step-number" aria-hidden="true">{s.step}</div>
                <div className="hp-step-icon" aria-hidden="true">{s.icon}</div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

   
      <section className="hp-newsletter">
        <div className="hp-newsletter-inner">
          <motion.div
            className="hp-newsletter-copy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }} >
            <span className="hp-newsletter-eyebrow">Stay in the loop</span>
            <h2>Get notified about new arrivals</h2>
            <p>
              Join our list and be the first to know about new products,
              restocks, and featured drops. No spam — just the good stuff.
            </p>
          </motion.div>

          <motion.div
            className="hp-newsletter-form-wrap"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }} >
            {subscribed ? (
              <div className="hp-newsletter-success">
                <CheckCircle size={32} strokeWidth={1.8} />
                <strong>You're on the list!</strong>
                <p>This is a UI demo — no data is stored. Thanks for trying it out.</p>
              </div>
            ) : (
              <form className="hp-newsletter-form" onSubmit={handleSubscribe}>
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="hp-newsletter-input"  />
                <button type="submit" className="btn btn--primary btn--md">
                  Subscribe
                </button>
              </form>
            )}
            <p className="hp-newsletter-note">
              UI-only demo — submissions are not stored on any server.
            </p>
          </motion.div>
        </div>
      </section>

    
      <section className="hp-cta-band">
        <div className="hp-cta-inner">
          <motion.span
            className="hp-cta-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }} >
            Ready to find something you love?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}  >
            Start shopping today.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}   >
            Browse the full catalog, fill your cart, and check out with a clean,
            simple flow. Everything is right here.
          </motion.p>
          <motion.div
            className="hp-cta-actions"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}  >
            <Link to="/products" className="btn btn--primary btn--lg">
              Shop Products
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
            <Link to="/products" className="btn btn--lg hp-cta-outline-btn">
              Explore Categories
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
