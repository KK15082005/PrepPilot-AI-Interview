import React from "react";
import "./Navbar.css";
import { Link} from "react-router-dom";


function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "#F8FCFB",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E6F4F1",
      }}
    >
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ color: "#0F172A", fontSize: "1.5rem", textDecoration: "none" }}
        >
          PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
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

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto">

            <li className="nav-item mx-2">
              <Link
                className="nav-link"
                to="/feature"
              >
                Features
              </Link>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="/workflow">
                How It Works
              </a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="/pricing">
                Pricing
              </a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="/resources">
                Resources
              </a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="/about">
                About US
              </a>
            </li>

          </ul>

          <div className="d-flex gap-3">

            <Link to="/login">
              <button
              className="btn" 
              style={{
                color: "#0F172A",
                fontWeight: "600",
              }}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
              className="btn" 
              style={{
                background: "linear-gradient(135deg,#0F9D9A,#3CC8C3)",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px 22px",
                fontWeight: "600",
              }}
              >
                Sign Up
              </button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;