import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CitizenDashboard from "./pages/CitizenDashboard.jsx";
import SubmitComplaint from "./pages/SubmitComplaint.jsx";
import ComplaintDetail from "./pages/ComplaintDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Citizen routes */}
          <Route element={<ProtectedRoute roles={["citizen"]} />}>
            <Route
              path="/dashboard"
              element={<><Navbar /><CitizenDashboard /></>}
            />
            <Route
              path="/submit"
              element={<><Navbar /><SubmitComplaint /></>}
            />
          </Route>

          {/* Complaint detail — citizen + authority + admin */}
          <Route element={<ProtectedRoute roles={["citizen", "authority", "admin"]} />}>
            <Route
              path="/complaints/:id"
              element={<><Navbar /><ComplaintDetail /></>}
            />
          </Route>

          {/* Admin + Authority routes */}
          <Route element={<ProtectedRoute roles={["admin", "authority"]} />}>
            <Route
              path="/admin"
              element={<><Navbar /><AdminDashboard /></>}
            />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
