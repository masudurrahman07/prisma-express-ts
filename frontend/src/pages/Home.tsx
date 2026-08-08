import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page home-page">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Welcome</span>
          <h1>Shop the best products from our storefront</h1>
          <p>
            A simple e-commerce experience for browsing items, adding them to your cart, and checking out with authenticated orders.
          </p>
          <Link to="/products" className="button hero-button">
            Shop Products
          </Link>
        </div>
        <div className="hero-features">
          <article>
            <h3>Explore products</h3>
            <p>Browse latest inventory with category details and pricing.</p>
          </article>
          <article>
            <h3>Secure login</h3>
            <p>Register or login with cookie-based authentication from the backend.</p>
          </article>
          <article>
            <h3>Simple checkout</h3>
            <p>Manage your cart, place orders, and view order history.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
