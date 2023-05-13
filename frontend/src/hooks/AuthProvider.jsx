import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userid, setId] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if the user is already logged in using localstorage (NINJAAAAAA)
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      setUsername(localStorage.getItem("username"));
      setId(localStorage.getItem("id"));
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post(
      "http://localhost:8000/account/login",
      credentials
    );
    const data = await response.data;
    if (data.success) {
      setLoggedIn(true);
      setUsername(credentials.username);
      setId(data.id)
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", credentials.username);
      setMessage("Logged in successfully");
      setTimeout(() => {
        navigate('/profile')
      }, 2000);
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
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      setLoggedIn(false);
      setMessage("Logged out successfully");
      navigate('/')
    }
  };
  const authContextValue = {
    loggedIn,
    username,
    userid,
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
