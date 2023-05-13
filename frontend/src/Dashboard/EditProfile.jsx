import axios from "axios";
import React, { useState } from "react";

export default function EditProfile({ userlogged }) {
  const [currentUser, setCurrentUser] = useState(userlogged.username);
  const [updatedUser, setUpdatedUser] = useState({ ...currentUser });
  const [message, setMessage] = useState("");

  console.log(userlogged);
  const handleChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <section>
        <div className="card container">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={updatedUser.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="form-control"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                autoComplete="off"
                value={updatedUser.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </form>
          <p>{message}</p>
        </div>
      </section>
    </div>
  );
}
