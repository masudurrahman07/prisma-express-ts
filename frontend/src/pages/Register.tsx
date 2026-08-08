import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import { FiUser, FiAtSign, FiLock } from "react-icons/fi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ name, email, password });
      await Swal.fire({ icon: "success", title: "Welcome!", text: "Registration completed successfully.", timer: 1400, showConfirmButton: false });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page auth-shell">
      <div className="auth-visual auth-visual-register">
        <div>
          <span className="eyebrow">Join Shoply</span>
          <h2>Create your account</h2>
          <p>Register now and enjoy quick checkout, order tracking, and cart saving.</p>
        </div>
      </div>
      <div className="auth-panel">
        <h2>Register</h2>
        <p className="section-subtitle">Create your account using your details below.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Name</span>
            <div className="input-icon-group">
              <FiUser size={18} />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </label>
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
