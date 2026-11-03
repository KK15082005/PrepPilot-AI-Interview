import React from "react";
import { FiBell, FiSearch } from "react-icons/fi";

function Topbar({ searchQuery = "", onSearchChange }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
                <h2 style={{ fontWeight: "700", color: "#1B2B3A" }} className="mb-1">Dashboard</h2>
                <p className="text-secondary mb-0">Welcome back, {user?.username || "Learner"} 👋</p>
            </div>

            <div className="d-flex align-items-center">
                <div className="input-group me-4" style={{ width: "260px" }}>
                    <span className="input-group-text bg-white border-end-0">
                        <FiSearch color="#94A3B8" />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search interviews..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                </div>

                <div className="me-4" style={{ cursor: "pointer" }} title="Notifications">
                    <FiBell size={24} color="#27b3ae" />
                </div>

                <div
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: "#27b3ae",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "700",
                        fontSize: "18px",
                    }}
                >
                    {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
