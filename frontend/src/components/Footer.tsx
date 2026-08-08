import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <strong>Shoply</strong>
          <p>Curated products and a polished shopping experience for everyday buyers.</p>
        </div>

        <div className="footer-group">
          <h4>Shop</h4>
          <Link to="/products">Products</Link>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-group">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-group">
          <h4>Contact</h4>
          <a href="mailto:support@shoply.com">
            <FiMail size={16} /> support@shoply.com
          </a>
          <a href="tel:+1234567890">
            <FiPhone size={16} /> +1 234 567 890
          </a>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shoply. Built for seamless shopping.</span>
      </div>
    </footer>
  );
}
