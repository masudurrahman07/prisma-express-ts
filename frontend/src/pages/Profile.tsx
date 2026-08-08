import { useAuth } from "../AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="page">
        <p>You need to be logged in to see your profile.</p>
      </section>
    );
  }

  return (
    <section className="page profile-page">
      <h2>Profile</h2>
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Age:</strong> {user.age ?? "N/A"}
        </p>
      </div>
    </section>
  );
}
