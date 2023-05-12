import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post(
      "http://localhost:8000/account/login",
      credentials
    );
    const data = await response.data;
    if (data.success === true) {
      setLoggedIn(true);
      setUsername(credentials.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", credentials.username);
      setMessage("Logged in successfully");
      navigate("/profile");
    } else {
      setMessage(data.message);
    }
  };

  const logout = async () => {
    const response = await axios.post("http://localhost:8000/account/logout", {
      token: "",
    });
    const data = await response.data;
    if (data.success) {
      // Clear the stored token and username
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setLoggedIn(false);
      setMessage("Logged out successfully");
    }
  };
  const authContextValue = {
    loggedIn,
    username,
    message,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
