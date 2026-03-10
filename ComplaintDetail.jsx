import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, verify token and load user
  useEffect(() => {
    const token = localStorage.getItem("civic_token");
    if (!token) { setLoading(false); return; }

    api.get("/api/auth/me")
      .then((res) => setUser(res.data.data))
      .catch(() => localStorage.removeItem("civic_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, user } = res.data.data;
    localStorage.setItem("civic_token", token);
    setUser(user);
    return user;
  };

  const register = async (data) => {
    const res = await api.post("/api/auth/register", data);
    const { token, user } = res.data.data;
    localStorage.setItem("civic_token", token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("civic_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
