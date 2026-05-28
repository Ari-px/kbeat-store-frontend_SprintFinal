import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("kbeat_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("kbeat_token"));

  const login = async (data) => {
    const response = await api.post("/auth/login", data);

    localStorage.setItem("kbeat_token", response.data.token);
    localStorage.setItem("kbeat_user", JSON.stringify(response.data.user));

    setToken(response.data.token);
    setUser(response.data.user);

    toast.success("Sesión iniciada correctamente");
    return response.data.user;
  };

  const register = async (data) => {
    const response = await api.post("/auth/register", data);

    localStorage.setItem("kbeat_token", response.data.token);
    localStorage.setItem("kbeat_user", JSON.stringify(response.data.user));

    setToken(response.data.token);
    setUser(response.data.user);

    toast.success("Cuenta creada correctamente");
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("kbeat_token");
    localStorage.removeItem("kbeat_user");
    setToken(null);
    setUser(null);
    toast.info("Sesión cerrada");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
