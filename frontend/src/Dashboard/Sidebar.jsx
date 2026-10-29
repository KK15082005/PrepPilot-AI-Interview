import React from "react";
import { FiHome, FiMic, FiBarChart2, FiBookmark, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Sidebar() {
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
            navigate("/login");
        }
    };

    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

    return (
        <div className="d-flex flex-column justify-content-between p-4" style={{ width: "260px", minHeight: "100vh", background: "#F8FEFD", borderRight: "1px solid #EAF3F3" }}>
            <div>
                <h3 style={{ fontWeight: "700" }}>PrepPilot <span style={{ color: "#27b3ae" }}>AI</span></h3>

                <div className="mt-5">
                    <div className="d-flex align-items-center p-3 rounded-3 mb-2" style={{ background: "#E9FAF8", color: "#27b3ae", fontWeight: "600", cursor: "pointer" }}>
                        <FiHome size={20} /><span className="ms-3">Dashboard</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2 text-secondary" style={{ cursor: "pointer" }}>
                        <FiMic size={20} />
                        <span className="ms-3">Interviews</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2 text-secondary" style={{ cursor: "pointer" }}>
                        <FiBarChart2 size={20} />
                        <span className="ms-3">Analytics</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2 text-secondary" style={{ cursor: "pointer" }}>
                        <FiBookmark size={20} />
                        <span className="ms-3">Bookmarks</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2 text-secondary" style={{ cursor: "pointer" }}>
                        <FiFileText size={20} />
                        <span className="ms-3">Resume</span>
                    </div>

                    <div className="d-flex align-items-center p-3 text-secondary" style={{ cursor: "pointer" }}>
                        <FiSettings size={20} />
                        <span className="ms-3">Settings</span>
                    </div>
                </div>

                <div className="mt-5 p-4 rounded-4" style={{ background: "#E9FAF8" }}>
                    <h5>⭐ Upgrade to Pro</h5>
                    <small className="text-secondary">Unlock unlimited AI interviews and advanced analytics.</small>
                    <button className="btn mt-3 w-100 fw-semibold" style={{ background: "#27b3ae", color: "#fff", border: "none" }}>Upgrade</button>
                </div>
            </div>

            <div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div style={{
                            width: "40px",
                            height: "40px",
                            background: "#27b3ae",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "700"
                        }}>
                            {initial}
                        </div>

                        <div className="ms-2" style={{ maxWidth: "110px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            <h6 className="mb-0 text-truncate" title={user?.username || "Candidate"}>{user?.username || "User"}</h6>
                            <small className="text-secondary text-truncate d-block" title={user?.email}>{user?.email || ""}</small>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger p-2 rounded-circle"
                        title="Logout"
                    >
                        <FiLogOut size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
