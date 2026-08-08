import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🛍️ Shoply</Link>
        <span className="brand-tag">Modern small business store</span>
      </div>
      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({items.length})</Link>
        {user && <Link to="/orders">Orders</Link>}
        {user && <Link to="/profile">Profile</Link>}
      </div>
      <div className="nav-actions">
        {user ? (
          <button type="button" onClick={handleLogout} className="button small">
            Logout
          </button>
        ) : (
          <>
            <Link className="button small secondary" to="/login">
              Login
            </Link>
            <Link className="button small" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
