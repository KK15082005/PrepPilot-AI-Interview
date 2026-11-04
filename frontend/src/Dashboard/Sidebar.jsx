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
            if (onClose) onClose();
        }
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
    const isDashboardActive = location.pathname === "/dashboard";
    const isCreateActive = location.pathname === "/createinterview";

    return (
        <>
            {/* Mobile Backdrop with smooth blur */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{
                        background: "rgba(15, 23, 42, 0.55)",
                        zIndex: 1040,
                        backdropFilter: "blur(4px)",
                        transition: "opacity 0.25s ease"
                    }}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Drawer Container */}
            <aside
                className={`d-flex flex-column justify-content-between p-3 p-xl-4 ${
                    isOpen ? "sidebar-mobile-open" : "sidebar-mobile-closed"
                }`}
                style={{
                    width: "clamp(260px, 80vw, 290px)",
                    height: "100vh",
                    maxHeight: "100vh",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
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
                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <Link to="/" className="text-decoration-none d-flex align-items-center" onClick={handleNavClick}>
                            <img
                                src="/logo.png"
                                alt="PrepPilot AI"
                                style={{ height: "38px", width: "auto", maxWidth: "185px", objectFit: "contain" }}
                            />
                        </Link>

                        {/* Mobile Close Button */}
                        <button
                            className="btn btn-light d-lg-none d-flex align-items-center justify-content-center p-2 rounded-circle"
                            onClick={onClose}
                            aria-label="Close Navigation"
                            style={{ width: "38px", height: "38px", border: "1px solid #E2E8F0" }}
                        >
                            <FiX size={20} className="text-secondary" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="d-flex flex-column gap-1">
                        <Link to="/dashboard" className="text-decoration-none" onClick={handleNavClick}>
                            <div
                                className="d-flex align-items-center p-3 rounded-3"
                                style={{
                                    background: isDashboardActive ? "#E6F8F7" : "transparent",
                                    color: isDashboardActive ? "#0F9D9A" : "#475569",
                                    fontWeight: isDashboardActive ? "700" : "500",
                                    fontSize: "14px",
                                    transition: "all 0.15s ease"
                                }}
                            >
                                <FiHome size={19} />
                                <span className="ms-3">Dashboard</span>
                            </div>
                        </Link>

                        <Link to="/createinterview" className="text-decoration-none" onClick={handleNavClick}>
                            <div
                                className="d-flex align-items-center p-3 rounded-3 hover-item"
                                style={{
                                    background: isCreateActive ? "#E6F8F7" : "transparent",
                                    color: isCreateActive ? "#0F9D9A" : "#475569",
                                    fontWeight: isCreateActive ? "700" : "500",
                                    fontSize: "14px",
                                    transition: "all 0.15s ease"
                                }}
                            >
                                <FiMic size={19} />
                                <span className="ms-3">New Mock Session</span>
                            </div>
                        </Link>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiBarChart2 size={19} />
                                <span className="ms-3">Performance Analytics</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill" style={{ fontSize: "10px" }}>Pro</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiBookmark size={19} />
                                <span className="ms-3">Saved Questions</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill" style={{ fontSize: "10px" }}>Soon</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <div className="d-flex align-items-center">
                                <FiFileText size={19} />
                                <span className="ms-3">Resume Matcher</span>
                            </div>
                            <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill" style={{ fontSize: "10px" }}>Soon</span>
                        </div>

                        <div className="d-flex align-items-center p-3 rounded-3 text-muted" style={{ fontSize: "14px", cursor: "default" }}>
                            <FiSettings size={19} />
                            <span className="ms-3">Preferences</span>
                        </div>
                    </nav>

                    {/* Pro Tier Mini Card */}
                    <div
                        className="mt-4 p-3 rounded-3"
                        style={{
                            background: "linear-gradient(135deg, #F0FDF4 0%, #E6F8F7 100%)",
                            border: "1px solid #C4F1ED"
                        }}
                    >
                        <div className="d-flex align-items-center gap-1.5 mb-1">
                            <span style={{ fontSize: "14px" }}>✨</span>
                            <strong style={{ color: "#0F766E", fontSize: "12px", letterSpacing: "0.2px" }}>Active Candidate Access</strong>
                        </div>
                        <small className="text-secondary d-block" style={{ fontSize: "11.5px", lineHeight: "1.45" }}>
                            Full access to speech analysis, AI feedback, and tailored question generation.
                        </small>
                    </div>
                </div>

                {/* Bottom User Profile Section */}
                <div className="pt-3 border-top mt-4" style={{ borderColor: "#E2E8F0" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
                            <div
                                style={{
                                    width: "38px",
                                    height: "38px",
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
                                <h6 className="mb-0 text-truncate fw-semibold" style={{ fontSize: "13px", maxWidth: "120px", color: "#0F172A" }} title={user?.username || "Candidate"}>
                                    {user?.username || "Candidate"}
                                </h6>
                                <small className="text-muted text-truncate d-block" style={{ fontSize: "11px", maxWidth: "120px" }} title={user?.email}>
                                    {user?.email || "candidate@preppilot"}
                                </small>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 rounded-circle flex-shrink-0"
                            title="Sign out"
                            style={{ width: "36px", height: "36px" }}
                        >
                            <FiLogOut size={15} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
