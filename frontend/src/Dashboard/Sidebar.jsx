import React from "react";
import { FiHome, FiMic, FiBarChart2, FiBookmark, FiFileText, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Sidebar({ isOpen = false, onClose }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await API.post("/auth/logout");
        } catch (err) {
            console.error("Logout request failed:", err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Signed out successfully.");
            navigate("/login");
        }
    };

    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
    const isDashboardActive = location.pathname === "/dashboard";
    const isCreateActive = location.pathname === "/createinterview";

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{ background: "rgba(15, 23, 42, 0.45)", zIndex: 1040, backdropFilter: "blur(4px)" }}
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`d-flex flex-column justify-content-between p-3 p-xl-4 ${
                    isOpen ? "sidebar-mobile-open" : "sidebar-mobile-closed"
                }`}
                style={{
                    width: "260px",
                    minHeight: "100vh",
                    background: "#FFFFFF",
                    borderRight: "1px solid #E2E8F0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1050,
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                <div>
                    {/* Header Logo + Mobile Close */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Link to="/" className="text-decoration-none">
                            <h4 className="mb-0 fw-bold d-flex align-items-center gap-2" style={{ color: "#0F172A", fontSize: "1.25rem" }}>
                                <span
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                                        borderRadius: "8px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#FFF",
                                        fontSize: "16px"
                                    }}
                                >
                                    ⚡
                                </span>
                                PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                            </h4>
                        </Link>
                        {onClose && (
                            <button
                                className="btn btn-sm btn-light border-0 d-lg-none p-1 rounded-circle"
                                onClick={onClose}
                                aria-label="Close Sidebar"
                            >
                                <FiX size={18} />
                            </button>
                        )}
                    </div>

                    {/* Navigation Items */}
                    <div className="d-flex flex-column gap-1">
                        <Link to="/dashboard" className="text-decoration-none">
                            <div
                                className="d-flex align-items-center p-3 rounded-3"
                                style={{
                                    background: isDashboardActive ? "#E6F8F7" : "transparent",
                                    color: isDashboardActive ? "#0F9D9A" : "#64748B",
                                    fontWeight: isDashboardActive ? "700" : "500",
                                    fontSize: "14px",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <FiHome size={18} />
                                <span className="ms-3">Dashboard</span>
                            </div>
                        </Link>

                        <Link to="/createinterview" className="text-decoration-none">
                            <div
                                className="d-flex align-items-center p-3 rounded-3 hover-item"
                                style={{
                                    background: isCreateActive ? "#E6F8F7" : "transparent",
                                    color: isCreateActive ? "#0F9D9A" : "#64748B",
                                    fontWeight: isCreateActive ? "700" : "500",
                                    fontSize: "14px",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <FiMic size={18} />
                                <span className="ms-3">New Interview</span>
                            </div>
                        </Link>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiBarChart2 size={18} />
                                <span className="ms-3">Analytics</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5" style={{ fontSize: "10px" }}>Pro</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiBookmark size={18} />
                                <span className="ms-3">Bookmarks</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5" style={{ fontSize: "10px" }}>Soon</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiFileText size={18} />
                                <span className="ms-3">Resume Upload</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5" style={{ fontSize: "10px" }}>Soon</span>
                        </div>

                        <div className="d-flex align-items-center p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <FiSettings size={18} />
                            <span className="ms-3">Settings</span>
                        </div>
                    </div>

                    {/* Pro Tier Mini Card */}
                    <div
                        className="mt-4 p-3 rounded-4"
                        style={{
                            background: "linear-gradient(135deg, #F0FDF4 0%, #E6F8F7 100%)",
                            border: "1px solid #C4F1ED"
                        }}
                    >
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <span style={{ fontSize: "15px" }}>⭐</span>
                            <strong style={{ color: "#0F766E", fontSize: "13px" }}>Free Candidate Tier</strong>
                        </div>
                        <small className="text-secondary d-block" style={{ fontSize: "12px", lineHeight: "1.4" }}>
                            Unlimited mock interviews with instant speech evaluation powered by Gemini AI.
                        </small>
                    </div>
                </div>

                {/* Bottom User Profile Section */}
                <div className="pt-3 border-top" style={{ borderColor: "#E2E8F0" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    background: "linear-gradient(135deg, #0F9D9A, #27B3AE)",
                                    color: "white",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    flexShrink: 0
                                }}
                            >
                                {initial}
                            </div>

                            <div className="ms-2" style={{ minWidth: 0 }}>
                                <h6 className="mb-0 text-truncate fw-semibold" style={{ fontSize: "13px", maxWidth: "115px", color: "#0F172A" }} title={user?.username || "Candidate"}>
                                    {user?.username || "Candidate"}
                                </h6>
                                <small className="text-muted text-truncate d-block" style={{ fontSize: "11px", maxWidth: "115px" }} title={user?.email}>
                                    {user?.email || "candidate@preppilot"}
                                </small>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-outline-danger p-2 rounded-circle flex-shrink-0"
                            title="Sign out"
                            style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <FiLogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
