import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSearch, FiMenu, FiPlus, FiX, FiUser, FiLogOut, FiCheckCircle, FiChevronDown, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Topbar({ searchQuery = "", onSearchChange, onToggleSidebar }) {
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
    const displayName = user?.username || "Candidate";
    const userEmail = user?.email || "candidate@preppilot.ai";

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("/auth/logout");
        } catch (err) {
            console.error("Logout request failed:", err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setProfileDropdownOpen(false);
            toast.success("Signed out successfully.");
            navigate("/login");
        }
    };

    return (
        <header
            className="mb-4 pb-3"
            style={{
                borderBottom: "1px solid #E2E8F0"
            }}
        >
            {/* Top Row: Title, Hamburger, and Actions */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                {/* Left: Mobile Toggle & Heading */}
                <div className="d-flex align-items-center gap-2 gap-sm-3">
                    <button
                        className="btn btn-white border d-lg-none d-flex align-items-center justify-content-center p-2 rounded-3 text-secondary shadow-sm"
                        onClick={onToggleSidebar}
                        aria-label="Toggle Navigation Menu"
                        style={{ background: "#FFFFFF", borderColor: "#E2E8F0", width: "40px", height: "40px" }}
                    >
                        <FiMenu size={20} />
                    </button>

                    <div>
                        <div className="d-flex align-items-center gap-2">
                            <h3
                                style={{
                                    fontWeight: "800",
                                    color: "#0F172A",
                                    fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                                    letterSpacing: "-0.02em"
                                }}
                                className="mb-0"
                            >
                                Candidate Dashboard
                            </h3>
                            <span
                                className="badge d-none d-sm-inline-flex px-2 py-0.5 rounded-pill"
                                style={{ background: "#E6F8F7", color: "#0F9D9A", fontSize: "11px", fontWeight: "600" }}
                            >
                                ● Live
                            </span>
                        </div>
                        <small className="text-secondary d-none d-sm-block mt-0.5" style={{ fontSize: "13px" }}>
                            Welcome back, <strong className="text-dark">{displayName}</strong> • {todayDate}
                        </small>
                    </div>
                </div>

                {/* Right: Actions, Search on desktop, Profile */}
                <div className="d-flex align-items-center gap-2 gap-sm-3">
                    {/* Desktop Search Bar */}
                    <div
                        className="input-group shadow-sm d-none d-md-flex"
                        style={{
                            width: "240px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF"
                        }}
                    >
                        <span className="input-group-text bg-white border-0 text-muted ps-3 pe-1">
                            <FiSearch size={15} />
                        </span>
                        <input
                            type="text"
                            className="form-control border-0 ps-1 pe-2 shadow-none"
                            placeholder="Search interviews..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            style={{ fontSize: "13px", height: "40px" }}
                        />
                        {searchQuery && (
                            <button
                                className="btn btn-link text-muted border-0 p-1 pe-2 text-decoration-none"
                                onClick={() => onSearchChange && onSearchChange("")}
                                title="Clear search"
                                type="button"
                            >
                                <FiX size={14} />
                            </button>
                        )}
                    </div>

                    {/* Quick Create CTA (Visible on both Mobile and Desktop) */}
                    <Link to="/createinterview" className="text-decoration-none">
                        <button
                            className="btn text-white fw-semibold d-inline-flex align-items-center gap-1 gap-sm-2 px-3 shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                                border: "none",
                                borderRadius: "12px",
                                height: "40px",
                                fontSize: "13px"
                            }}
                        >
                            <FiPlus size={16} />
                            <span className="d-none d-sm-inline">New Interview</span>
                            <span className="d-sm-none">New</span>
                        </button>
                    </Link>

                    {/* Notification Bell */}
                    <div
                        className="btn btn-white border rounded-circle text-secondary d-none d-sm-flex align-items-center justify-content-center shadow-sm"
                        style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            background: "#FFFFFF",
                            borderColor: "#E2E8F0"
                        }}
                        title="No unread alerts"
                    >
                        <FiBell size={16} />
                    </div>

                    {/* Profile Dropdown Container */}
                    <div className="position-relative" ref={dropdownRef}>
                        <button
                            type="button"
                            className="btn p-1 pe-2 rounded-pill border shadow-sm d-flex align-items-center gap-2 bg-white"
                            onClick={() => setProfileDropdownOpen((prev) => !prev)}
                            style={{
                                borderColor: "#E2E8F0",
                                transition: "all 0.15s ease",
                                outline: "none",
                            }}
                            aria-expanded={profileDropdownOpen}
                            aria-label="User account menu"
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #0F9D9A, #27B3AE)",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    boxShadow: "0 2px 6px rgba(15, 157, 154, 0.3)"
                                }}
                            >
                                {initial}
                            </div>
                            <span className="fw-semibold text-dark d-none d-sm-inline me-1" style={{ fontSize: "13px" }}>
                                {displayName}
                            </span>
                            <FiChevronDown size={14} className="text-secondary" />
                        </button>

                        {/* Dropdown Menu Modal/Card */}
                        {profileDropdownOpen && (
                            <div
                                className="position-absolute end-0 mt-2 py-2 shadow-lg border rounded-4 bg-white"
                                style={{
                                    width: "260px",
                                    zIndex: 1100,
                                    borderColor: "#E2E8F0",
                                    animation: "fadeIn 0.15s ease",
                                }}
                            >
                                {/* User Info Header */}
                                <div className="px-3 py-2 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <div
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #0F9D9A, #27B3AE)",
                                                color: "white",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {initial}
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <p className="mb-0 fw-bold text-dark text-truncate" style={{ fontSize: "14px" }}>
                                                {displayName}
                                            </p>
                                            <small className="text-muted text-truncate d-block" style={{ fontSize: "11px" }}>
                                                {userEmail}
                                            </small>
                                        </div>
                                    </div>
                                    <span
                                        className="badge mt-1 px-2 py-0.5 rounded-pill"
                                        style={{ background: "#E6F8F7", color: "#0F9D9A", fontSize: "10px", fontWeight: "600" }}
                                    >
                                        ● Candidate Account
                                    </span>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <Link
                                        to="/dashboard"
                                        className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-dark"
                                        style={{ fontSize: "13px", textDecoration: "none" }}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <FiUser size={15} className="text-secondary" /> Candidate Overview
                                    </Link>
                                    <Link
                                        to="/createinterview"
                                        className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-dark"
                                        style={{ fontSize: "13px", textDecoration: "none" }}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <FiPlus size={15} className="text-secondary" /> New Mock Session
                                    </Link>
                                    <Link
                                        to="/"
                                        className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-dark"
                                        style={{ fontSize: "13px", textDecoration: "none" }}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <FiArrowLeft size={15} className="text-secondary" /> Back to Landing Page
                                    </Link>
                                </div>

                                <div className="border-top pt-1 mt-1">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-danger w-100 border-0 bg-transparent"
                                        style={{ fontSize: "13px" }}
                                    >
                                        <FiLogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (Full width below header on screens < 768px) */}
            <div className="d-md-none mt-3">
                <div
                    className="input-group shadow-sm w-100"
                    style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF"
                    }}
                >
                    <span className="input-group-text bg-white border-0 text-muted ps-3 pe-1">
                        <FiSearch size={16} />
                    </span>
                    <input
                        type="text"
                        className="form-control border-0 ps-1 pe-2 shadow-none"
                        placeholder="Search by role, type, difficulty..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        style={{ fontSize: "14px", height: "42px" }}
                    />
                    {searchQuery && (
                        <button
                            className="btn btn-link text-muted border-0 p-2 text-decoration-none"
                            onClick={() => onSearchChange && onSearchChange("")}
                            title="Clear search"
                            type="button"
                        >
                            <FiX size={16} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Topbar;
