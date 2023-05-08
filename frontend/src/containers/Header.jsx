import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
const menus = [
  { label: "Home", path: "/" },
  { label: "All Games", path: "/games" },
];

function Header() {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (e.target.value) {
      setTimeout(() => {
        navigate(`/search?q=${e.target.value}`);
      }, 1000);
    } else {
      navigate("/games");
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navbarClass = isScrolled ? "scrolled" : "";
  return (
    <>
      <nav className={`navbar navbar-expand-lg sticky-top ${navbarClass}`}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to={"/"}>
            <h1>VAPOUR</h1>
          </Link>
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
                value={query}
                onChange={handleSearch}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
