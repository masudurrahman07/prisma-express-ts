import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiShield, FiCalendar, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <section className="page profile-page empty-page">
        <div className="empty-state">
          <h2>Sign in to view your profile</h2>
          <p>Your account details and order history are available after login.</p>
          <Link to="/login" className="button">Login now</Link>
        </div>
      </section>
    );
  }

  const handleLogout = async () => {
    await logout();
    await Swal.fire({ icon: "success", title: "Logged out", timer: 1200, showConfirmButton: false });
  };

  return (
    <section className="page profile-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h2>Your profile</h2>
        </div>
        <button type="button" className="button small secondary" onClick={handleLogout}>
          <FiLogOut size={16} /> Logout
        </button>
      </div>
      <div className="profile-card">
        <div className="profile-row">
          <FiUser size={20} />
          <div>
            <strong>{user.name}</strong>
            <p>Name</p>
          </div>
        </div>
        <div className="profile-row">
          <FiMail size={20} />
          <div>
            <strong>{user.email}</strong>
            <p>Email</p>
          </div>
        </div>
        <div className="profile-row">
          <FiShield size={20} />
          <div>
            <strong>{user.role}</strong>
            <p>Role</p>
          </div>
        </div>
        <div className="profile-row">
          <FiCalendar size={20} />
          <div>
            <strong>{user.age ?? "N/A"}</strong>
            <p>Age</p>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <Link to="/orders" className="button small secondary">View orders</Link>
        <Link to="/products" className="button small">Continue shopping</Link>
      </div>
    </section>
  );
}
