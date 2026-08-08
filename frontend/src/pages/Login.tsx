import { FormEvent, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import { FiAtSign, FiLock } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      await Swal.fire({ icon: "success", title: "Welcome back", timer: 1200, showConfirmButton: false });
      navigate(from);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page auth-shell">
      <div className="auth-visual auth-visual-login">
        <div>
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in and continue shopping</h2>
          <p>Login to access your cart, orders and personalized product recommendations.</p>
        </div>
      </div>
      <div className="auth-panel">
        <h2>Login</h2>
        <p className="section-subtitle">Enter your credentials to continue.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <div className="input-icon-group">
              <FiAtSign size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </label>
          <label>
            <span>Password</span>
            <div className="input-icon-group">
              <FiLock size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </section>
  );
}
