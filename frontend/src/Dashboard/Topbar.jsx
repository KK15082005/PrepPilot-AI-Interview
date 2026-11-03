import React from "react";
import { FiBell, FiSearch, FiMenu, FiPlus, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function Topbar({ searchQuery = "", onSearchChange, onToggleSidebar }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
    const displayName = user?.username || "Candidate";

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });

    return (
        <header
            className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 pb-3"
            style={{
                borderBottom: "1px solid #E2E8F0"
            }}
        >
            {/* Left: Mobile Toggle & Page Title */}
            <div className="d-flex align-items-center gap-3">
                <button
                    className="btn btn-white border d-lg-none p-2 rounded-3 text-secondary shadow-sm"
                    onClick={onToggleSidebar}
                    aria-label="Toggle Navigation Menu"
                    style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
                >
                    <FiMenu size={22} />
                </button>

                <div>
                    <div className="d-flex align-items-center gap-2">
                        <h3
                            style={{
                                fontWeight: "800",
                                color: "#0F172A",
                                fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                                letterSpacing: "-0.02em"
                            }}
                            className="mb-0"
                        >
                            Candidate Dashboard
                        </h3>
                        <span
                            className="badge d-none d-sm-inline-flex px-2 py-1 rounded-pill"
                            style={{ background: "#E6F8F7", color: "#0F9D9A", fontSize: "11px", fontWeight: "600" }}
                        >
                            ● Live
                        </span>
                    </div>
                    <small className="text-secondary d-block mt-1" style={{ fontSize: "13px" }}>
                        Welcome back, <strong className="text-dark">{displayName}</strong> • {todayDate}
                    </small>
                </div>
            </div>

            {/* Right: Search, Actions, Profile */}
            <div className="d-flex align-items-center gap-2 gap-sm-3 flex-wrap ms-auto">
                {/* Search Bar with clear button */}
                <div
                    className="input-group shadow-sm"
                    style={{
                        width: "clamp(190px, 24vw, 280px)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF"
                    }}
                >
                    <span className="input-group-text bg-white border-0 text-muted ps-3 pe-2">
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
                            <FiX size={15} />
                        </button>
                    )}
                </div>

                {/* Primary CTA Button */}
                <Link to="/createinterview" className="text-decoration-none d-none d-sm-inline-block">
                    <button
                        className="btn text-white fw-semibold d-inline-flex align-items-center gap-2 px-3 shadow-sm"
                        style={{
                            background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                            border: "none",
                            borderRadius: "12px",
                            height: "40px",
                            fontSize: "13px"
                        }}
                    >
                        <FiPlus size={16} />
                        <span>New Interview</span>
                    </button>
                </Link>

                {/* Notification Bell */}
                <div
                    className="btn btn-white border rounded-circle text-secondary d-none d-md-flex align-items-center justify-content-center shadow-sm"
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

                {/* Profile Pill */}
                <div
                    className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill border shadow-sm"
                    style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
                    title={user?.email || "Candidate Profile"}
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
                    <span className="fw-semibold text-dark d-none d-xl-inline me-1" style={{ fontSize: "13px" }}>
                        {displayName}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
