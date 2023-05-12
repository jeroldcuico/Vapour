import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { loggedIn, username, message, login, logout } =
    useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };
  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <h1>You're not logged in! </h1>
      )}
    </div>
  );
}
