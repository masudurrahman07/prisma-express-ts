import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import {
  ShoppingBag,
  User,
  LogIn,
  UserPlus,
  Menu,
  X,
  LogOut,
  Home,
  Package,
  ClipboardList,
  Info,
  Mail,
  Store,
} from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    await Swal.fire({
      icon: "success",
      title: "Signed out",
      text: "You have been logged out successfully.",
      timer: 1400,
      showConfirmButton: false,
    });
    navigate("/login");
  };

  const close = () => setMobileOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
       
        <NavLink to="/" className="nav-brand" onClick={close} aria-label="Shoply home">
          <span className="nav-brand__icon" aria-hidden="true">
            <Store size={22} strokeWidth={2.2} />
          </span>
          <span className="nav-brand__text">
            <span className="nav-brand__name">Shoply</span>
            <span className="nav-brand__sub">Modern Storefront</span>
          </span>
        </NavLink>

     
        <div className="nav-center" role="list">
          <NavLink to="/" className={linkClass} onClick={close} role="listitem">
            <Home size={15} strokeWidth={2} />
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={close} role="listitem">
            <Package size={15} strokeWidth={2} />
            Products
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={close} role="listitem">
            <Info size={15} strokeWidth={2} />
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={close} role="listitem">
            <Mail size={15} strokeWidth={2} />
            Contact
          </NavLink>
        </div>

       
        <div className="nav-actions">
          {user ? (
            <>
              
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link nav-link--cart${isActive ? " nav-link--active" : ""}`
                }
                onClick={close}
                aria-label={`Cart, ${cartCount} items`}>
                <ShoppingBag size={16} strokeWidth={2} />
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink to="/orders" className={linkClass} onClick={close}>
                <ClipboardList size={15} strokeWidth={2} />
                Orders
              </NavLink>

              <NavLink to="/profile" className={linkClass} onClick={close}>
                <User size={15} strokeWidth={2} />
                Profile
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn--outline btn--sm nav-logout-btn">
                <LogOut size={15} strokeWidth={2} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn--outline btn--sm"
                onClick={close}>
                <LogIn size={15} strokeWidth={2} />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn--primary btn--sm"
                onClick={close}>
                <UserPlus size={15} strokeWidth={2} />
                Register
              </NavLink>
            </>
          )}
        </div>

       
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      
      <div
        id="mobile-menu"
        className={`nav-mobile-menu${mobileOpen ? " nav-mobile-menu--open" : ""}`}
        aria-hidden={!mobileOpen}>
        <div className="nav-mobile-links">
          <NavLink to="/" className={linkClass} onClick={close}>
            <Home size={16} /> Home
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={close}>
            <Package size={16} /> Products
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={close}>
            <Info size={16} /> About
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={close}>
            <Mail size={16} /> Contact
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link nav-link--cart${isActive ? " nav-link--active" : ""}`
                }
                onClick={close}>
                <ShoppingBag size={16} />
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </NavLink>
              <NavLink to="/orders" className={linkClass} onClick={close}>
                <ClipboardList size={16} /> Orders
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={close}>
                <User size={16} /> Profile
              </NavLink>
            </>
          )}

          <div className="nav-mobile-actions">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn--outline btn--sm">
                <LogOut size={15} /> Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="btn btn--outline btn--sm" onClick={close}>
                  <LogIn size={15} /> Login
                </NavLink>
                <NavLink to="/register" className="btn btn--primary btn--sm" onClick={close}>
                  <UserPlus size={15} /> Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
