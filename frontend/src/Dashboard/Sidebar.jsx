import React, { useState, useEffect } from "react";
import {
    FiHome,
    FiMic,
    FiBarChart2,
    FiBookmark,
    FiFileText,
    FiSettings,
    FiLogOut,
    FiChevronLeft,
    FiChevronRight,
    FiX,
    FiArrowLeft,
    FiZap
} from "react-icons/fi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Sidebar({ isOpen = true, onClose, onToggle }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const location = useLocation();

    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 992;
        }
        return true;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 992);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isCollapsedDesktop = isDesktop && !isOpen;

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
        if (!isDesktop && onClose) {
            onClose();
        }
    };

    const handleToggleClick = () => {
        if (onToggle) {
            onToggle();
        } else if (onClose) {
            onClose();
        }
    };

    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
    const displayName = user?.username || "Candidate";
    const userEmail = user?.email || "candidate@preppilot.ai";

    const isDashboardActive = location.pathname === "/dashboard";
    const isCreateActive = location.pathname === "/createinterview";

    const secondaryNav = [
        {
            label: "Performance Analytics",
            icon: FiBarChart2,
            badge: "Pro",
            badgeType: "pro",
            tooltip: "Performance Analytics (Pro)"
        },
        {
            label: "Saved Questions",
            icon: FiBookmark,
            badge: "Soon",
            badgeType: "soon",
            tooltip: "Saved Questions (Soon)"
        },
        {
            label: "Resume Matcher",
            icon: FiFileText,
            badge: "Soon",
            badgeType: "soon",
            tooltip: "Resume Matcher (Soon)"
        },
        {
            label: "Preferences",
            icon: FiSettings,
            badge: null,
            badgeType: null,
            tooltip: "Preferences"
        }
    ];

    return (
        <>
            {/* Mobile Backdrop with smooth blur */}
            {isOpen && !isDesktop && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{
                        background: "rgba(15, 23, 42, 0.45)",
                        zIndex: 1040,
                        backdropFilter: "blur(4px)",
                        transition: "opacity 0.25s ease"
                    }}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Root Container */}
            <aside
                className={`sidebar-root ${isOpen ? "sidebar-open" : "sidebar-collapsed"} sidebar-scrollable`}
                aria-label="Candidate Navigation Sidebar"
            >
                <div
                    className="d-flex flex-column"
                    style={{
                        width: "100%",
                        minHeight: "100%",
                        padding: isCollapsedDesktop ? "16px 8px" : "18px 14px",
                        boxSizing: "border-box"
                    }}
                >
                    {/* Header: Logo + Collapse/Expand Toggle */}
                    <div
                        className="d-flex align-items-center mb-3 pb-2.5 border-bottom flex-shrink-0"
                        style={{
                            borderColor: "#E2E8F0",
                            height: isCollapsedDesktop ? "auto" : "44px",
                            justifyContent: isCollapsedDesktop ? "center" : "space-between",
                            padding: isCollapsedDesktop ? "0 0 8px 0" : "0 2px"
                        }}
                    >
                        {!isCollapsedDesktop ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-decoration-none d-flex align-items-center"
                                    onClick={handleNavClick}
                                    title="PrepPilot AI"
                                >
                                    <img
                                        src="/logo.png"
                                        alt="PrepPilot AI"
                                        style={{ height: "34px", width: "auto", maxWidth: "165px", objectFit: "contain" }}
                                    />
                                </Link>

                                {/* Collapse Button */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light border d-flex align-items-center justify-content-center p-0 rounded-2 text-secondary sidebar-toggle-btn"
                                    onClick={handleToggleClick}
                                    aria-label={isDesktop ? "Collapse Sidebar" : "Close Sidebar"}
                                    title={isDesktop ? "Collapse Sidebar" : "Close Sidebar"}
                                    style={{ width: "32px", height: "32px", borderColor: "#E2E8F0", cursor: "pointer", flexShrink: 0 }}
                                >
                                    <span className="d-none d-lg-inline-flex">
                                        <FiChevronLeft size={17} />
                                    </span>
                                    <span className="d-lg-none">
                                        <FiX size={17} />
                                    </span>
                                </button>
                            </>
                        ) : (
                            /* Collapsed Desktop Header: Icon Mark + Expand Chevron */
                            <div className="d-flex flex-column align-items-center gap-2 w-100">
                                <Link
                                    to="/"
                                    className="text-decoration-none d-flex align-items-center justify-content-center"
                                    title="PrepPilot AI"
                                >
                                    <img
                                        src="/logo-icon.png"
                                        alt="PrepPilot AI"
                                        style={{ width: "30px", height: "30px", objectFit: "contain" }}
                                    />
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light border d-flex align-items-center justify-content-center p-0 rounded-2 text-secondary sidebar-toggle-btn"
                                    onClick={handleToggleClick}
                                    aria-label="Expand Sidebar"
                                    title="Expand Sidebar"
                                    style={{ width: "30px", height: "30px", borderColor: "#E2E8F0", cursor: "pointer" }}
                                >
                                    <FiChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="d-flex flex-column gap-1" aria-label="Main Navigation">
                        {/* Dashboard Link */}
                        <Link
                            to="/dashboard"
                            className="text-decoration-none"
                            onClick={handleNavClick}
                            title={isCollapsedDesktop ? "Dashboard" : undefined}
                        >
                            <div
                                className={`sidebar-nav-item d-flex align-items-center rounded-3 ${isCollapsedDesktop ? "justify-content-center" : "px-3"}`}
                                style={{
                                    height: "46px",
                                    background: isDashboardActive ? "#E6F8F7" : "transparent",
                                    color: isDashboardActive ? "#0F9D9A" : "#475569",
                                    fontWeight: isDashboardActive ? "600" : "500",
                                    fontSize: "13.5px",
                                    transition: "all 0.15s ease",
                                    width: isCollapsedDesktop ? "44px" : "100%",
                                    margin: isCollapsedDesktop ? "0 auto" : "0"
                                }}
                            >
                                <FiHome
                                    size={18}
                                    style={{
                                        color: isDashboardActive ? "#0F9D9A" : "#64748B",
                                        flexShrink: 0
                                    }}
                                />
                                {!isCollapsedDesktop && (
                                    <span className="ms-2.5 text-truncate">Dashboard</span>
                                )}
                            </div>
                        </Link>

                        {/* New Mock Session Link */}
                        <Link
                            to="/createinterview"
                            className="text-decoration-none"
                            onClick={handleNavClick}
                            title={isCollapsedDesktop ? "New Mock Session" : undefined}
                        >
                            <div
                                className={`sidebar-nav-item d-flex align-items-center rounded-3 ${isCollapsedDesktop ? "justify-content-center" : "px-3"}`}
                                style={{
                                    height: "46px",
                                    background: isCreateActive ? "#E6F8F7" : "transparent",
                                    color: isCreateActive ? "#0F9D9A" : "#475569",
                                    fontWeight: isCreateActive ? "600" : "500",
                                    fontSize: "13.5px",
                                    transition: "all 0.15s ease",
                                    width: isCollapsedDesktop ? "44px" : "100%",
                                    margin: isCollapsedDesktop ? "0 auto" : "0"
                                }}
                            >
                                <FiMic
                                    size={18}
                                    style={{
                                        color: isCreateActive ? "#0F9D9A" : "#64748B",
                                        flexShrink: 0
                                    }}
                                />
                                {!isCollapsedDesktop && (
                                    <span className="ms-2.5 text-truncate">New Mock Session</span>
                                )}
                            </div>
                        </Link>

                        {/* Main Website Link */}
                        <Link
                            to="/"
                            className="text-decoration-none"
                            onClick={handleNavClick}
                            title={isCollapsedDesktop ? "Main Website" : undefined}
                        >
                            <div
                                className={`sidebar-nav-item d-flex align-items-center rounded-3 ${isCollapsedDesktop ? "justify-content-center" : "px-3"}`}
                                style={{
                                    height: "46px",
                                    color: "#475569",
                                    fontWeight: "500",
                                    fontSize: "13.5px",
                                    transition: "all 0.15s ease",
                                    width: isCollapsedDesktop ? "44px" : "100%",
                                    margin: isCollapsedDesktop ? "0 auto" : "0"
                                }}
                            >
                                <FiArrowLeft
                                    size={18}
                                    style={{ color: "#64748B", flexShrink: 0 }}
                                />
                                {!isCollapsedDesktop && (
                                    <span className="ms-2.5 text-truncate">Main Website</span>
                                )}
                            </div>
                        </Link>

                        {/* Section Header / Divider */}
                        {!isCollapsedDesktop ? (
                            <div className="pt-2.5 pb-1 px-3 my-0.5">
                                <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#94A3B8", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                                    Tools & Insights
                                </span>
                            </div>
                        ) : (
                            <div
                                style={{
                                    height: "1px",
                                    background: "#E2E8F0",
                                    margin: "6px auto",
                                    width: "28px"
                                }}
                            />
                        )}

                        {/* Secondary Items (Tools & Upcoming) */}
                        {secondaryNav.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className={`sidebar-nav-item d-flex align-items-center rounded-3 ${
                                        isCollapsedDesktop ? "justify-content-center" : "px-3 justify-content-between"
                                    }`}
                                    title={isCollapsedDesktop ? item.tooltip || item.label : undefined}
                                    style={{
                                        height: "46px",
                                        color: "#64748B",
                                        fontSize: "13.5px",
                                        cursor: "default",
                                        transition: "all 0.15s ease",
                                        width: isCollapsedDesktop ? "44px" : "100%",
                                        margin: isCollapsedDesktop ? "0 auto" : "0"
                                    }}
                                >
                                    <div className="d-flex align-items-center text-truncate" style={{ minWidth: 0 }}>
                                        <IconComponent
                                            size={18}
                                            style={{ color: "#94A3B8", flexShrink: 0 }}
                                        />
                                        {!isCollapsedDesktop && (
                                            <span className="ms-2.5 text-truncate">{item.label}</span>
                                        )}
                                    </div>

                                    {!isCollapsedDesktop && item.badge && (
                                        <span
                                            className="badge rounded-pill flex-shrink-0"
                                            style={{
                                                fontSize: "10px",
                                                fontWeight: "600",
                                                padding: "2.5px 7px",
                                                background: item.badgeType === "pro" ? "#EEF2FF" : "#F8FAFC",
                                                color: item.badgeType === "pro" ? "#4F46E5" : "#64748B",
                                                border: `1px solid ${item.badgeType === "pro" ? "#C7D2FE" : "#E2E8F0"}`
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Active Candidate Access Card (Comfortable Padding) */}
                    {!isCollapsedDesktop ? (
                        <div
                            className="mt-3 p-3 rounded-3"
                            style={{
                                background: "linear-gradient(135deg, #F0FDF4 0%, #E6F8F7 100%)",
                                border: "1px solid #C4F1ED",
                                borderRadius: "12px",
                                marginBottom: "10px"
                            }}
                        >
                            <div className="d-flex align-items-center gap-1.5 mb-1.5">
                                <FiZap size={14} style={{ color: "#0F9D9A" }} />
                                <strong style={{ color: "#0F766E", fontSize: "12px", letterSpacing: "0.2px" }}>
                                    Active Candidate Access
                                </strong>
                            </div>
                            <p className="text-secondary mb-0" style={{ fontSize: "11px", lineHeight: "1.45", color: "#475569" }}>
                                Full access to speech analysis, AI feedback, and tailored question generation.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center mt-3 mx-auto rounded-3"
                            title="Active Candidate Access: Full access to speech analysis & AI feedback"
                            style={{
                                width: "44px",
                                height: "44px",
                                background: "linear-gradient(135deg, #F0FDF4 0%, #E6F8F7 100%)",
                                border: "1px solid #C4F1ED",
                                cursor: "default",
                                marginBottom: "10px"
                            }}
                        >
                            <FiZap size={17} style={{ color: "#0F9D9A" }} />
                        </div>
                    )}

                    {/* User Profile & Logout Section — Placed Just Below Active Candidate Card */}
                    <div
                        className="sidebar-profile-section flex-shrink-0 pt-2.5 border-top mt-1"
                        style={{ borderColor: "#E2E8F0" }}
                    >
                        {!isCollapsedDesktop ? (
                            <div
                                className="d-flex align-items-center justify-content-between p-2 rounded-3"
                                style={{
                                    background: "#F8FAFC",
                                    border: "1px solid #E2E8F0"
                                }}
                            >
                                <div className="d-flex align-items-center gap-2.5" style={{ minWidth: 0, flexGrow: 1 }}>
                                    <div
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            background: "linear-gradient(135deg, #0F9D9A 0%, #27B3AE 100%)",
                                            color: "white",
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            flexShrink: 0,
                                            boxShadow: "0 2px 6px rgba(15, 157, 154, 0.25)"
                                        }}
                                    >
                                        {initial}
                                    </div>

                                    <div style={{ minWidth: 0, flexGrow: 1 }}>
                                        <div
                                            className="fw-semibold text-truncate"
                                            style={{ fontSize: "12.5px", color: "#0F172A", lineHeight: "1.25" }}
                                            title={displayName}
                                        >
                                            {displayName}
                                        </div>
                                        <div
                                            className="text-muted text-truncate"
                                            style={{ fontSize: "11px", lineHeight: "1.3", marginTop: "2px" }}
                                            title={userEmail}
                                        >
                                            {userEmail}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="sidebar-logout-btn btn btn-sm d-flex align-items-center justify-content-center p-0 rounded-2 flex-shrink-0"
                                    title="Sign out"
                                    aria-label="Sign out"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        border: "1px solid #E2E8F0",
                                        background: "#FFFFFF",
                                        color: "#64748B",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            /* Collapsed Desktop Profile: 38px Avatar + 36px Logout */
                            <div className="d-flex flex-column align-items-center gap-2 w-100">
                                <div
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        background: "linear-gradient(135deg, #0F9D9A 0%, #27B3AE 100%)",
                                        color: "white",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        flexShrink: 0,
                                        boxShadow: "0 2px 6px rgba(15, 157, 154, 0.25)",
                                        cursor: "default"
                                    }}
                                    title={`${displayName} • ${userEmail}`}
                                >
                                    {initial}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="sidebar-logout-btn btn btn-sm d-flex align-items-center justify-content-center p-0 rounded-2 flex-shrink-0"
                                    title="Sign out"
                                    aria-label="Sign out"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        border: "1px solid #E2E8F0",
                                        background: "#FFFFFF",
                                        color: "#64748B",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
