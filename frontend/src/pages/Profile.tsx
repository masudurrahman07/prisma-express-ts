import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, Calendar, LogOut, ShoppingBag, ClipboardList, UserCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <section className="page profile-page">
        <div className="empty-state">
          <UserCircle size={52} strokeWidth={1.2} />
          <h2>Sign in to view your profile</h2>
          <p>Your account details and order history are available after login.</p>
          <Link to="/login" className="btn btn--primary btn--md">Login now</Link>
        </div>
      </section>
    );
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "You'll need to log in again to access your cart and orders.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sign out",
      cancelButtonText: "Stay signed in",
      confirmButtonColor: "#dc2626",
    });
    if (result.isConfirmed) {
      await logout();
      await Swal.fire({ icon: "success", title: "Signed out", timer: 1200, showConfirmButton: false });
      navigate("/login");
    }
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="page profile-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h2>Your Profile</h2>
        </div>
        <button type="button" className="btn btn--outline btn--sm" onClick={handleLogout}>
          <LogOut size={14} strokeWidth={2} /> Sign out
        </button>
      </div>

      {/* Avatar + name hero */}
      <div className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h3 className="profile-hero-name">{user.name}</h3>
          <span className="profile-role-badge">{user.role}</span>
        </div>
      </div>

      {/* Info grid */}
      <div className="profile-info-grid">
        <div className="profile-info-item">
          <div className="profile-info-icon"><Mail size={18} strokeWidth={2} /></div>
          <div>
            <span className="profile-info-label">Email</span>
            <strong className="profile-info-value">{user.email}</strong>
          </div>
        </div>

        <div className="profile-info-item">
          <div className="profile-info-icon"><ShieldCheck size={18} strokeWidth={2} /></div>
          <div>
            <span className="profile-info-label">Role</span>
            <strong className="profile-info-value">{user.role}</strong>
          </div>
        </div>

        <div className="profile-info-item">
          <div className="profile-info-icon"><User size={18} strokeWidth={2} /></div>
          <div>
            <span className="profile-info-label">Age</span>
            <strong className="profile-info-value">{user.age ?? "Not provided"}</strong>
          </div>
        </div>

        <div className="profile-info-item">
          <div className="profile-info-icon"><Calendar size={18} strokeWidth={2} /></div>
          <div>
            <span className="profile-info-label">Member since</span>
            <strong className="profile-info-value">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </strong>
          </div>
        </div>
      </div>

     
      <div className="profile-quick-actions">
        <Link to="/orders" className="profile-action-card">
          <div className="profile-action-icon"><ClipboardList size={22} strokeWidth={1.8} /></div>
          <strong>My Orders</strong>
          <span>View your order history</span>
        </Link>
        <Link to="/products" className="profile-action-card">
          <div className="profile-action-icon"><ShoppingBag size={22} strokeWidth={1.8} /></div>
          <strong>Browse Products</strong>
          <span>Continue shopping</span>
        </Link>
      </div>
    </section>
  );
}
