import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(Boolean(token));
    setUserName(user?.username || "");
    setMobileMenuOpen(false); // Auto close on route change
  }, [location.pathname]);

  const navLinks = [
    { to: "/feature", label: "Features" },
    { to: "/workflow", label: "How It Works" },
    { to: "/pricing", label: "Pricing" },
    { to: "/resources", label: "Resources" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top py-2.5 py-lg-3"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F0",
        zIndex: 1030,
      }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="PrepPilot AI"
            style={{ height: "42px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Mobile Hamburger Toggle (React controlled) */}
        <button
          className="btn btn-light d-lg-none d-flex align-items-center justify-content-center p-2 rounded-3 border"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          style={{ width: "40px", height: "40px", borderColor: "#E2E8F0" }}
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 py-3 py-lg-0 gap-1 gap-lg-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li className="nav-item mx-lg-2" key={link.to}>
                  <Link
                    className="nav-link px-2 py-1 rounded-2"
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      color: isActive ? "#0F9D9A" : "#475569",
                      fontWeight: isActive ? "600" : "500",
                      background: isActive ? "rgba(15, 157, 154, 0.08)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs */}
          <div className="d-flex align-items-center gap-2 pt-2 pt-lg-0 border-top border-lg-0 mt-2 mt-lg-0">
            {isLoggedIn ? (
              <Link to="/dashboard" className="w-100 w-lg-auto text-decoration-none" onClick={() => setMobileMenuOpen(false)}>
                <button
                  className="btn w-100 fw-semibold px-3 py-2 text-white shadow-sm d-inline-flex align-items-center justify-content-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "14px",
                  }}
                >
                  <span>Candidate Dashboard</span> <FiArrowRight size={15} />
                </button>
              </Link>
            ) : (
              <div className="d-flex align-items-center gap-2 w-100 w-lg-auto">
                <Link to="/login" className="flex-grow-1 flex-lg-grow-0" style={{ textDecoration: "none" }} onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="btn btn-nav-login w-100 px-3 py-2"
                    style={{ fontSize: "14px" }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup" className="flex-grow-1 flex-lg-grow-0" style={{ textDecoration: "none" }} onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="btn btn-nav-signup w-100 px-3.5 py-2"
                    style={{ fontSize: "14px" }}
                  >
                    Get Started Free
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
