import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// LOCATION FUNCTION - LINK: https://v5.reactrouter.com/web/api/Hooks/uselocation

export const Navbar = () => {
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const logout = () =>{
    localStorage.setItem('token',"")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {localStorage.getItem("token")===""?<>
              <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-outline-dark mx-1" to="/signup" role="button">Signup</Link></>
              :<Link className="btn btn-outline-danger mx-1" to="/login" onClick={logout} role="button">Logout</Link>}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
