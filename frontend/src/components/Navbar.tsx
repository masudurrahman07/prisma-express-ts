import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import { FiShoppingCart, FiUser, FiLogIn, FiUserPlus, FiMenu, FiX, FiLogOut, FiHome, FiBox } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    await Swal.fire({ icon: "success", title: "Signed out", text: "You have been logged out successfully.", timer: 1400, showConfirmButton: false });
    navigate("/login");
  };

  const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <nav className="navbar glass-nav">
      <div className="nav-brand">
        <NavLink to="/" className="brand-link">
          <span className="brand-mark">Shoply</span>
          <span className="brand-tag">Modern storefront</span>
        </NavLink>
      </div>
      <button className="nav-mobile-toggle" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
      <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
        <NavLink to="/" className={activeClass} onClick={() => setMobileOpen(false)}>
          <FiHome size={16} /> Home
        </NavLink>
        <NavLink to="/products" className={activeClass} onClick={() => setMobileOpen(false)}>
          <FiBox size={16} /> Products
        </NavLink>
        {user && (
          <NavLink to="/cart" className={activeClass} onClick={() => setMobileOpen(false)}>
            <FiShoppingCart size={16} /> Cart
            {items.length > 0 && <span className="cart-badge">{items.length}</span>}
          </NavLink>
        )}
        {user && (
          <>
            <NavLink to="/orders" className={activeClass} onClick={() => setMobileOpen(false)}>
              <FiBox size={16} /> Orders
            </NavLink>
            <NavLink to="/profile" className={activeClass} onClick={() => setMobileOpen(false)}>
              <FiUser size={16} /> Profile
            </NavLink>
          </>
        )}
      </div>
      <div className="nav-actions">
        {user ? (
          <button type="button" onClick={handleLogout} className="button small secondary logout-button">
            <FiLogOut size={16} /> Logout
          </button>
        ) : (
          <>
            <NavLink className="button small secondary" to="/login" onClick={() => setMobileOpen(false)}>
              <FiLogIn size={16} /> Login
            </NavLink>
            <NavLink className="button small" to="/register" onClick={() => setMobileOpen(false)}>
              <FiUserPlus size={16} /> Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
