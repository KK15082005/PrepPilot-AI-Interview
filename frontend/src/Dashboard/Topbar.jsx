import React from "react";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

function Topbar({ searchQuery = "", onSearchChange, onToggleSidebar }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                    className="btn btn-light border d-lg-none p-2 rounded-3 text-secondary"
                    onClick={onToggleSidebar}
                    aria-label="Toggle Navigation Menu"
                >
                    <FiMenu size={22} />
                </button>

                <div>
                    <h3 style={{ fontWeight: "700", color: "#0F172A", fontSize: "1.5rem" }} className="mb-0">
                        Dashboard
                    </h3>
                    <small className="text-secondary">
                        Welcome back, <strong className="text-dark">{user?.username || "Candidate"}</strong> 👋
                    </small>
                </div>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Search Bar */}
                <div className="input-group" style={{ width: "240px" }}>
                    <span className="input-group-text bg-white border-end-0 text-muted">
                        <FiSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search interviews..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        style={{ fontSize: "14px" }}
                    />
                </div>

                {/* Notification Icon */}
                <div
                    className="btn btn-light border rounded-circle p-2 text-secondary d-none d-sm-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                    title="No new notifications"
                >
                    <FiBell size={18} />
                </div>

                {/* Profile Badge */}
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "700",
                        fontSize: "16px",
                    }}
                    title={user?.email || "Candidate"}
                >
                    {initial}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
