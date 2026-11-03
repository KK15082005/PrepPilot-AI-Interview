import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(Boolean(token));
    setUserName(user?.username || "");
  }, [location.pathname]);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "rgba(248, 252, 251, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E6F4F1",
      }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
          style={{ color: "#0F172A", fontSize: "1.45rem", textDecoration: "none" }}
        >
          <span
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            ⚡
          </span>
          <span>
            PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
          </span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 py-2 py-lg-0">
            <li className="nav-item mx-lg-2">
              <Link className="nav-link" to="/feature">
                Features
              </Link>
            </li>
            <li className="nav-item mx-lg-2">
              <Link className="nav-link" to="/workflow">
                How It Works
              </Link>
            </li>
            <li className="nav-item mx-lg-2">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item mx-lg-2">
              <Link className="nav-link" to="/resources">
                Resources
              </Link>
            </li>
            <li className="nav-item mx-lg-2">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 pt-2 pt-lg-0">
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <Link to="/dashboard">
                  <button
                    className="btn fw-semibold px-4 py-2 text-white shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                      borderRadius: "10px",
                      border: "none",
                    }}
                  >
                    Go to Dashboard →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className="btn px-3 py-2 fw-semibold"
                    style={{ color: "#0F172A" }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn px-4 py-2 fw-semibold text-white shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                      borderRadius: "10px",
                      border: "none",
                    }}
                  >
                    Get Started Free
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
