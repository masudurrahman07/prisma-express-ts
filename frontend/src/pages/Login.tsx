import { FormEvent, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import { Mail, Lock, Store, Eye, EyeOff, LogIn, ShieldCheck, ShoppingCart, ClipboardList } from "lucide-react";

const FEATURES = [
  "Persistent cart saved across sessions",
  "Full order history and tracking",
  "Secure cookie-based authentication",
  "Curated product catalog",
];

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();
  const location                = useLocation();
  const from                    = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      await Swal.fire({
        icon: "success",
        title: "Welcome back!",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrap">
      {/* ── Left: decorative visual panel ── */}
      <div className="auth-visual-panel" aria-hidden="true">
        <div className="auth-visual-content">
          <Link to="/" className="auth-visual-logo" tabIndex={-1}>
            <span className="auth-visual-logo-icon">
              <Store size={22} strokeWidth={2.2} />
            </span>
            <span className="auth-visual-logo-name">Shoply</span>
          </Link>

          <h2 className="auth-visual-headline">
            Your store,<br />always with you.
          </h2>
          <p className="auth-visual-sub">
            Sign in to pick up right where you left off — your cart, your orders,
            and your account are all waiting.
          </p>

          <ul className="auth-visual-features">
            {FEATURES.map((f) => (
              <li key={f} className="auth-visual-feature">
                <span className="auth-visual-feature-dot" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div className="auth-form-panel">
        <div className="auth-card">
          {/* Brand */}
          <Link to="/" className="auth-brand" aria-label="Shoply home">
            <span className="auth-brand-icon" aria-hidden="true">
              <Store size={20} strokeWidth={2.2} />
            </span>
            <span className="auth-brand-name">Shoply</span>
          </Link>

          <div className="auth-card-header">
            <h1 className="auth-heading">Welcome back</h1>
            <p className="auth-subheading">
              Sign in to access your cart, orders, and account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={16} strokeWidth={2} className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} strokeWidth={2} className="auth-input-icon" />
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw
                    ? <EyeOff size={15} strokeWidth={2} />
                    : <Eye    size={15} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error-box" role="alert">
                <ShieldCheck size={15} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--lg auth-submit-btn"
              disabled={loading}
            >
              {loading
                ? <span className="auth-spinner" aria-hidden="true" />
                : <LogIn size={16} strokeWidth={2} />}
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
