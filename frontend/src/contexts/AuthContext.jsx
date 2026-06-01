import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Login Function
  const login = (email, password, role) => {
    // Mock Authentication
    const userData = {
      email: email,
      role: role,
      name: email.split("@")[0],
    };

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  // Register Function
  const register = (email, password, name, role = "user") => {
    // Mock Registration
    const userData = {
      email: email,
      role: role,
      name: name,
    };

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  // Logout Function
  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  // Context Value
  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isUser: user?.role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
