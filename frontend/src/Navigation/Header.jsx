import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom';

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
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-secondary bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">VAPOUR</a>
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