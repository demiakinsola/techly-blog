import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link id="techly" className="navbar-brand" to="/">
          Techly
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="post">
                New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="contact-us">
                Contact Us
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="login">
                    Login
                  </Link>
                </li>
                <li
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  <Link className="dropdown-item" to="#">
                    Logout
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="sign-up">
                    Create an account
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
