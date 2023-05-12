import React, { Suspense, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import Sidebar from "./Sidebar";
export default function Header() {
  const menus = [
    { label: "Home", path: "/" },
    { label: "All Games", path: "/games" },
    { label: "Tags", path: "/tags" },
    { label: "Genres", path: "/genres" },
    { label: "Platforms", path: "/platforms" },
    { label: "Stores", path: "/stores" },
    { label: "Publishers", path: "/publishers" },
    { label: "Developers", path: "/developers" },
  ];

  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { loggedIn, username, message, login, logout } =
    useContext(AuthContext);

  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());

    if (e.target.value) {
      setTimeout(() => {
        navigate(`/search?q=${e.target.value}`);
      }, 1000);
    } else {
      navigate("/games");
    }
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <nav className={`navbar navbar-expand-xl sticky-top py-0`}>
        <div className="container-fluid">
          <a className="navbar-brand text-white py-0" href="/">
            VAPOUR
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menus?.map((item, id) => (
                <li
                  className={`nav-item ${location.pathname === item.path ? "active" : ""
                    }`}
                  key={id}
                >
                  <Link className="nav-link text-white" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav mb-lg-0 align-items-start mb-5 px-2">
              {loggedIn ? (
                <>
                  <li className="mt-2 text-capitalize">
                    <span className="welcome mx-2">Welcome</span>
                    <Link className="profile" to={"/profile"}>
                      {username}
                    </Link>
                    !
                  </li>
                  <li className="account__data mt-1 text-capitalize text-white">
                    <Link className="px-3 nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="account__data mx-1">
                    <Link
                      to={"/login"}
                      className={`px-3 nav-link ${location.pathname === "/login" ? "active" : ""
                        }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="account__data">
                    <Link
                      to={"/register"}
                      className={`px-3 nav-link ${location.pathname === "/register" ? "active" : ""
                        }`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search Games"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
      <Suspense>
        <Outlet />
      </Suspense>


    </>
  );
}
