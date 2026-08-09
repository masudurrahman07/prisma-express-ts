import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Mail,
  Phone,
  MapPin,
  Store,
  ArrowRight,
  ExternalLink,
  Globe,
  Rss,
} from "lucide-react";

export default function Footer() {
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* ── Grid columns ── */}
        <div className="footer-grid">
          {/* Column 1 – Brand */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-brand-link" aria-label="Shoply home">
              <span className="footer-brand-icon" aria-hidden="true">
                <Store size={20} strokeWidth={2.2} />
              </span>
              <span className="footer-brand-name">Shoply</span>
            </Link>
            <p className="footer-brand-desc">
              A modern e-commerce storefront built for speed, clarity, and a
              seamless shopping experience. Curated products, secure checkout,
              and order tracking in one place.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-link">
                <Globe size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-social-link">
                <ExternalLink size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  <ArrowRight size={13} /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  <ArrowRight size={13} /> Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <ArrowRight size={13} /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <ArrowRight size={13} /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Customer */}
          <div className="footer-col">
            <h3 className="footer-heading">Customer</h3>
            <ul className="footer-links">
              {user ? (
                <>
                  <li>
                    <Link to="/profile" className="footer-link">
                      <ArrowRight size={13} /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="footer-link">
                      <ArrowRight size={13} /> My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="footer-link">
                      <ArrowRight size={13} /> My Cart
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="footer-link">
                      <ArrowRight size={13} /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="footer-link">
                      <ArrowRight size={13} /> Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4 – Contact Info */}
          <div className="footer-col">
            <h3 className="footer-heading">Get in Touch</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Mail size={15} strokeWidth={2} className="footer-contact-icon" />
                <a href="mailto:support@shoply.com" className="footer-link">
                  support@shoply.com
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone size={15} strokeWidth={2} className="footer-contact-icon" />
                <a href="tel:+11234567890" className="footer-link">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={15} strokeWidth={2} className="footer-contact-icon" />
                <span className="footer-link-text">
                  123 Commerce St, San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Shoply. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/about" className="footer-legal-link">
              Privacy Policy
            </Link>
            <span className="footer-legal-sep" aria-hidden="true">·</span>
            <Link to="/about" className="footer-legal-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
