import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import { User, Mail, Lock, Store, Eye, EyeOff, UserPlus, ShieldCheck } from "lucide-react";

const FEATURES = [
  "Cart persists automatically across sessions",
  "Full order history available immediately",
  "Secure account with cookie-based auth",
  "Browse and shop with no friction",
];

export default function Register() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const { register }            = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ name, email, password });
      await Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Welcome to Shoply.",
        timer: 1400,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
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
            Join thousands<br />of happy shoppers.
          </h2>
          <p className="auth-visual-sub">
            Create your free account in seconds and unlock a clean,
            modern shopping experience built for speed and simplicity.
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
            <h1 className="auth-heading">Create your account</h1>
            <p className="auth-subheading">
              Join Shoply for fast checkout, order tracking, and a persistent cart.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-field">
              <label htmlFor="reg-name">Full Name</label>
              <div className="auth-input-wrap">
                <User size={16} strokeWidth={2} className="auth-input-icon" />
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={16} strokeWidth={2} className="auth-input-icon" />
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} strokeWidth={2} className="auth-input-icon" />
                <input
                  id="reg-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a strong password"
                  required
                  autoComplete="new-password"
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
                : <UserPlus size={16} strokeWidth={2} />}
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
