import React from "react";
import logo from "../assets/logo.png";
import '../index.css'
import { Link } from "react-router-dom";

const menus = [
  { label: "Home", path: "/" },
  { label: "All Games", path: "/allgames" },
  { label: "Trending", path: "/trending" },
  { label: "Genre", path: "/genre" },
  { label: "Publishers", path: "/publishers" },
  { label: "Platforms", path: "/platforms" },
  { label: "Stores", path: "/stores" },
  { label: "Tags", path: "/tags" },
];

function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-secondary bg-dark"
      >
        <div className="container-fluid">

          <img src={logo} alt="Vapour" width={70} className="mx-2" />
          <a className="navbar-brand text-white" href="#">
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
              {menus.map((item, id) => (
                <li className="nav-item" key={id}>
                  <Link className="nav-link text-white" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
