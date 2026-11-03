import React from "react";
import { FiHome, FiMic, FiBarChart2, FiBookmark, FiFileText, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Sidebar({ isOpen = false, onClose }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

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

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{ background: "rgba(15, 23, 42, 0.5)", zIndex: 1040, backdropFilter: "blur(4px)" }}
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`d-flex flex-column justify-content-between p-4 ${
                    isOpen ? "sidebar-mobile-open" : "sidebar-mobile-closed"
                }`}
                style={{
                    width: "260px",
                    minHeight: "100vh",
                    background: "#F8FEFD",
                    borderRight: "1px solid #EAF3F3",
                    position: "sticky",
                    top: 0,
                    zIndex: 1050,
                    transition: "transform 0.3s ease-in-out"
                }}
            >
                <div>
                    {/* Header Logo + Mobile Close */}
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/" className="text-decoration-none">
                            <h4 className="mb-0 fw-bold" style={{ color: "#0F172A" }}>
                                PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                            </h4>
                        </Link>
                        {onClose && (
                            <button
                                className="btn btn-sm btn-light border-0 d-lg-none p-1"
                                onClick={onClose}
                                aria-label="Close Sidebar"
                            >
                                <FiX size={20} />
                            </button>
                        )}
                    </div>

                    <div className="mt-4 pt-2">
                        <Link to="/dashboard" className="text-decoration-none">
                            <div
                                className="d-flex align-items-center p-3 rounded-3 mb-2"
                                style={{ background: "#E6F8F7", color: "#0F9D9A", fontWeight: "600", cursor: "pointer" }}
                            >
                                <FiHome size={19} /><span className="ms-3">Dashboard</span>
                            </div>
                        </Link>

                        <Link to="/createinterview" className="text-decoration-none">
                            <div className="d-flex align-items-center p-3 mb-2 text-secondary rounded-3 hover-item" style={{ cursor: "pointer" }}>
                                <FiMic size={19} />
                                <span className="ms-3">New Interview</span>
                            </div>
                        </Link>

                        <div className="d-flex align-items-center p-3 mb-2 text-muted rounded-3" style={{ cursor: "default", opacity: 0.7 }}>
                            <FiBarChart2 size={19} />
                            <span className="ms-3">Analytics (Pro)</span>
                        </div>

                        <div className="d-flex align-items-center p-3 mb-2 text-muted rounded-3" style={{ cursor: "default", opacity: 0.7 }}>
                            <FiBookmark size={19} />
                            <span className="ms-3">Bookmarks</span>
                        </div>

                        <div className="d-flex align-items-center p-3 mb-2 text-muted rounded-3" style={{ cursor: "default", opacity: 0.7 }}>
                            <FiFileText size={19} />
                            <span className="ms-3">Resume Upload</span>
                        </div>

                        <div className="d-flex align-items-center p-3 text-muted rounded-3" style={{ cursor: "default", opacity: 0.7 }}>
                            <FiSettings size={19} />
                            <span className="ms-3">Settings</span>
                        </div>
                    </div>

                    <div className="mt-4 p-3 rounded-4" style={{ background: "#E8FAF8", border: "1px solid #C4F1ED" }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <span style={{ fontSize: "16px" }}>⭐</span>
                            <strong style={{ color: "#0F766E", fontSize: "14px" }}>PrepPilot Free Tier</strong>
                        </div>
                        <small className="text-secondary d-block" style={{ fontSize: "12px", lineHeight: "1.4" }}>
                            Unlimited AI mock interviews and evaluations powered by Gemini AI.
                        </small>
                    </div>
                </div>

                <div className="pt-3">
                    <hr style={{ borderColor: "#E2E8F0" }} />
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
                            <div
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    background: "#0F9D9A",
                                    color: "white",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                    flexShrink: 0
                                }}
                            >
                                {initial}
                            </div>

                            <div className="ms-2" style={{ minWidth: 0 }}>
                                <h6 className="mb-0 text-truncate fw-semibold" style={{ fontSize: "13px", maxWidth: "110px" }} title={user?.username || "Candidate"}>
                                    {user?.username || "Candidate"}
                                </h6>
                                <small className="text-muted text-truncate d-block" style={{ fontSize: "11px", maxWidth: "110px" }} title={user?.email}>
                                    {user?.email || ""}
                                </small>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-outline-danger p-2 rounded-circle flex-shrink-0"
                            title="Logout from account"
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
