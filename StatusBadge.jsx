import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={user?.role === "citizen" ? "/dashboard" : "/admin"} className="flex items-center gap-2">
          <span className="text-2xl">🏙️</span>
          <div>
            <p className="font-bold text-sm leading-tight">Smart Civic AI</p>
            <p className="text-xs text-blue-200">India Innovates 2026</p>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          {user?.role === "citizen" && (
            <>
              <Link to="/dashboard" className="text-sm hover:text-blue-200 transition">My Complaints</Link>
              <Link
                to="/submit"
                className="bg-white text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
              >
                + Submit
              </Link>
            </>
          )}
          {(user?.role === "admin" || user?.role === "authority") && (
            <Link to="/admin" className="text-sm hover:text-blue-200 transition">Dashboard</Link>
          )}

          {/* User info + logout */}
          <div className="flex items-center gap-2 border-l border-blue-500 pl-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs bg-blue-800 hover:bg-blue-900 px-2 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
