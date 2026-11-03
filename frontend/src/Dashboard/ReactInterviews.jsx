import React, { useEffect, useState } from "react";
import { FiEye, FiPlay, FiTrash2, FiPlus, FiClock, FiAward, FiCheckCircle } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function RecentInterviews({ searchQuery = "", onDataChanged }) {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [activeTab, setActiveTab] = useState("all"); // "all" | "completed" | "ongoing"

    const fetchInterviews = async () => {
        try {
            const response = await API.get("/interview");
            if (response.data?.interviews) {
                setInterviews(response.data.interviews);
            }
        } catch (err) {
            console.error("Failed to fetch interviews:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this interview and its evaluation results?")) {
            return;
        }

        setDeletingId(id);
        try {
            await API.delete(`/interview/${id}`);
            setInterviews((prev) => prev.filter((item) => item._id !== id));
            toast.success("Interview deleted successfully.");
            if (onDataChanged) {
                onDataChanged();
            }
        } catch (err) {
            console.error("Failed to delete interview:", err);
            toast.error(err.response?.data?.message || "Failed to delete interview.");
        } finally {
            setDeletingId(null);
        }
    };

    // Filter by tab + search query
    const filteredInterviews = interviews.filter((item) => {
        // Tab filter
        if (activeTab === "completed" && item.status !== "Completed") return false;
        if (activeTab === "ongoing" && item.status === "Completed") return false;

        // Search filter
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.role?.toLowerCase().includes(q) ||
            item.title?.toLowerCase().includes(q) ||
            item.interviewType?.toLowerCase().includes(q) ||
            item.difficulty?.toLowerCase().includes(q)
        );
    });

    const completedCount = interviews.filter((i) => i.status === "Completed").length;
    const ongoingCount = interviews.filter((i) => i.status !== "Completed").length;

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill">Easy</span>;
            case "medium":
                return <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1 rounded-pill">Medium</span>;
            case "hard":
                return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded-pill">Hard</span>;
            default:
                return <span className="badge bg-light text-dark px-2 py-1 rounded-pill">{difficulty}</span>;
        }
    };

    const getScoreBadge = (scoreStr) => {
        if (!scoreStr || scoreStr === "-") {
            return <span className="text-muted fw-medium" style={{ fontSize: "12px" }}>Not Graded</span>;
        }

        const num = parseFloat(scoreStr);
        if (isNaN(num)) {
            return <span className="text-muted">{scoreStr}</span>;
        }

        let bg = "#ECFDF5";
        let color = "#047857";
        let border = "#A7F3D0";

        if (num < 5) {
            bg = "#FEF2F2";
            color = "#B91C1C";
            border = "#FECACA";
        } else if (num < 7) {
            bg = "#FFFBEB";
            color = "#B45309";
            border = "#FDE68A";
        }

        return (
            <span
                className="badge px-2 py-1 rounded-pill fw-bold d-inline-flex align-items-center gap-1"
                style={{ background: bg, color: color, border: `1px solid ${border}`, fontSize: "12px" }}
            >
                <FiAward size={12} /> {num} <small style={{ opacity: 0.8, fontSize: "10px" }}>/ 10</small>
            </span>
        );
    };

    return (
        <div
            className="card shadow-sm border-0 mt-3 mt-md-4 overflow-hidden"
            style={{ borderRadius: "20px", background: "#FFFFFF", border: "1px solid #E2E8F0" }}
        >
            <div className="card-body p-3 p-md-4">
                {/* Header Title & New Session Button */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <div>
                        <h4 className="mb-0 fw-bold" style={{ color: "#0F172A", fontSize: "clamp(1.1rem, 2vw, 1.25rem)" }}>
                            Interview Sessions
                        </h4>
                        <small className="text-secondary d-none d-sm-block mt-0.5">
                            Track your past mock sessions, review AI evaluations, or practice again.
                        </small>
                    </div>

                    <Link to="/createinterview" className="text-decoration-none">
                        <button
                            className="btn btn-sm px-3 py-2 fw-semibold text-white d-inline-flex align-items-center gap-1.5 shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "13px"
                            }}
                        >
                            <FiPlus size={15} /> <span>New Session</span>
                        </button>
                    </Link>
                </div>

                {/* Filter Tabs (Horizontal scroll on mobile to avoid vertical stacking) */}
                <div
                    className="d-flex align-items-center gap-2 border-bottom pb-3 mb-3 overflow-x-auto flex-nowrap"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <button
                        className={`btn btn-sm px-3 py-1.5 rounded-pill fw-semibold text-nowrap flex-shrink-0 ${
                            activeTab === "all" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "all" ? "#0F9D9A" : "#F8FAFC",
                            border: activeTab === "all" ? "none" : "1px solid #E2E8F0",
                            fontSize: "12px"
                        }}
                        onClick={() => setActiveTab("all")}
                    >
                        All Mocks ({interviews.length})
                    </button>

                    <button
                        className={`btn btn-sm px-3 py-1.5 rounded-pill fw-semibold text-nowrap flex-shrink-0 ${
                            activeTab === "completed" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "completed" ? "#0F9D9A" : "#F8FAFC",
                            border: activeTab === "completed" ? "none" : "1px solid #E2E8F0",
                            fontSize: "12px"
                        }}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed ({completedCount})
                    </button>

                    <button
                        className={`btn btn-sm px-3 py-1.5 rounded-pill fw-semibold text-nowrap flex-shrink-0 ${
                            activeTab === "ongoing" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "ongoing" ? "#0F9D9A" : "#F8FAFC",
                            border: activeTab === "ongoing" ? "none" : "1px solid #E2E8F0",
                            fontSize: "12px"
                        }}
                        onClick={() => setActiveTab("ongoing")}
                    >
                        In Progress ({ongoingCount})
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-info" role="status"></div>
                        <p className="mt-2 text-secondary" style={{ fontSize: "14px" }}>Loading mock interviews...</p>
                    </div>
                ) : filteredInterviews.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-5 my-2">
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                background: "#E6F8F7",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0F9D9A",
                                fontSize: "26px"
                            }}
                        >
                            🎤
                        </div>
                        <h5 className="mt-3 fw-bold" style={{ color: "#0F172A", fontSize: "16px" }}>
                            {searchQuery ? "No matching interviews found" : "No mock interviews yet"}
                        </h5>
                        <p className="text-secondary mb-3" style={{ maxWidth: "400px", margin: "0 auto", fontSize: "13px" }}>
                            {searchQuery
                                ? `No interviews match "${searchQuery}". Check spelling or try a broader term.`
                                : "Start practicing technical and HR questions tailored specifically to your target role."}
                        </p>
                        {searchQuery ? (
                            <button
                                className="btn btn-outline-secondary btn-sm px-3 py-2 rounded-pill"
                                onClick={() => setActiveTab("all")}
                            >
                                Reset Filters
                            </button>
                        ) : (
                            <Link to="/createinterview">
                                <button
                                    className="btn px-4 py-2 text-white fw-semibold shadow-sm"
                                    style={{ background: "#0F9D9A", borderRadius: "10px", border: "none", fontSize: "14px" }}
                                >
                                    Create Your First Interview
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View (>= 768px) */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table align-middle table-hover mb-0">
                                <thead>
                                    <tr className="text-secondary" style={{ fontSize: "12px", borderBottom: "2px solid #F1F5F9", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                        <th>Target Role / Title</th>
                                        <th>Round Type</th>
                                        <th>Difficulty</th>
                                        <th>Duration</th>
                                        <th>AI Score</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredInterviews.map((item) => {
                                        const isCompleted = item.status === "Completed";
                                        const isOngoing = item.status === "Ongoing";

                                        return (
                                            <tr key={item._id} style={{ fontSize: "14px" }}>
                                                <td>
                                                    <div className="fw-bold" style={{ color: "#0F172A" }}>
                                                        {item.role || "Developer"}
                                                    </div>
                                                    <small className="text-muted d-block" style={{ fontSize: "12px" }}>
                                                        {item.title || "Mock Session"} • {item.experienceLevel || "Fresher"}
                                                    </small>
                                                </td>

                                                <td>
                                                    <span className="badge bg-light text-dark border px-2 py-1 rounded-pill" style={{ fontSize: "12px" }}>
                                                        {item.interviewType || "Technical"}
                                                    </span>
                                                </td>

                                                <td>{getDifficultyBadge(item.difficulty)}</td>

                                                <td>
                                                    <span className="text-secondary d-inline-flex align-items-center gap-1" style={{ fontSize: "13px" }}>
                                                        <FiClock size={12} /> {item.duration || 15}m
                                                    </span>
                                                </td>

                                                <td>{getScoreBadge(item.score)}</td>

                                                <td>
                                                    <span className="text-muted" style={{ fontSize: "13px" }}>
                                                        {formatDate(item.createdAt)}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge rounded-pill ${
                                                            isCompleted
                                                                ? "bg-success"
                                                                : isOngoing
                                                                ? "bg-info text-dark"
                                                                : "bg-warning text-dark"
                                                        }`}
                                                        style={{ fontSize: "11px" }}
                                                    >
                                                        {item.status || "Pending"}
                                                    </span>
                                                </td>

                                                <td className="text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        {isCompleted ? (
                                                            <button
                                                                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                                                                onClick={() => navigate(`/interview/${item._id}/result`)}
                                                                title="View Evaluation Results"
                                                                style={{ fontSize: "12px" }}
                                                            >
                                                                <FiEye size={13} /> Result
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-sm text-white d-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                                                                onClick={() => navigate(`/interview/${item._id}`)}
                                                                title="Continue Interview"
                                                                style={{ background: "#0F9D9A", border: "none", fontSize: "12px" }}
                                                            >
                                                                <FiPlay size={13} /> Practice
                                                            </button>
                                                        )}

                                                        <button
                                                            className="btn btn-sm btn-outline-danger p-2 rounded-circle"
                                                            onClick={(e) => handleDelete(item._id, e)}
                                                            disabled={deletingId === item._id}
                                                            title="Delete Interview"
                                                        >
                                                            {deletingId === item._id ? (
                                                                <span className="spinner-border spinner-border-sm" role="status"></span>
                                                            ) : (
                                                                <FiTrash2 size={13} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Responsive Card List View (< 768px) */}
                        <div className="d-md-none d-flex flex-column gap-3">
                            {filteredInterviews.map((item) => {
                                const isCompleted = item.status === "Completed";
                                const isOngoing = item.status === "Ongoing";

                                return (
                                    <div
                                        key={item._id}
                                        className="card border p-3 rounded-4 shadow-sm"
                                        style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
                                    >
                                        {/* Card Header: Role & Status */}
                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                            <div style={{ minWidth: 0 }}>
                                                <h6 className="fw-bold mb-0 text-truncate" style={{ color: "#0F172A", fontSize: "15px" }}>
                                                    {item.role || "Developer"}
                                                </h6>
                                                <small className="text-muted d-block text-truncate mt-0.5" style={{ fontSize: "12px" }}>
                                                    {item.title || "Mock Session"} • {formatDate(item.createdAt)}
                                                </small>
                                            </div>

                                            <span
                                                className={`badge rounded-pill flex-shrink-0 ${
                                                    isCompleted
                                                        ? "bg-success"
                                                        : isOngoing
                                                        ? "bg-info text-dark"
                                                        : "bg-warning text-dark"
                                                }`}
                                                style={{ fontSize: "11px" }}
                                            >
                                                {item.status || "Pending"}
                                            </span>
                                        </div>

                                        {/* Metadata Row: Badges */}
                                        <div className="d-flex align-items-center gap-1.5 flex-wrap my-2">
                                            <span className="badge bg-light text-dark border px-2 py-1 rounded-pill" style={{ fontSize: "11px" }}>
                                                {item.interviewType || "Technical"}
                                            </span>
                                            {getDifficultyBadge(item.difficulty)}
                                            <span className="badge bg-light text-secondary border px-2 py-1 rounded-pill" style={{ fontSize: "11px" }}>
                                                <FiClock size={11} className="me-1" />{item.duration || 15}m
                                            </span>
                                            <div className="ms-auto">
                                                {getScoreBadge(item.score)}
                                            </div>
                                        </div>

                                        {/* Action Buttons: 44px min touch target */}
                                        <div className="d-flex align-items-center gap-2 mt-3 pt-2 border-top">
                                            {isCompleted ? (
                                                <button
                                                    className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-1.5 flex-grow-1 fw-semibold"
                                                    onClick={() => navigate(`/interview/${item._id}/result`)}
                                                    style={{ height: "42px", borderRadius: "10px", fontSize: "13px" }}
                                                >
                                                    <FiEye size={15} /> View AI Report
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-sm text-white d-flex align-items-center justify-content-center gap-1.5 flex-grow-1 fw-semibold shadow-sm"
                                                    onClick={() => navigate(`/interview/${item._id}`)}
                                                    style={{ background: "#0F9D9A", border: "none", height: "42px", borderRadius: "10px", fontSize: "13px" }}
                                                >
                                                    <FiPlay size={15} /> Resume Practice
                                                </button>
                                            )}

                                            <button
                                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center flex-shrink-0"
                                                onClick={(e) => handleDelete(item._id, e)}
                                                disabled={deletingId === item._id}
                                                title="Delete Interview"
                                                style={{ width: "42px", height: "42px", borderRadius: "10px" }}
                                            >
                                                {deletingId === item._id ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                                ) : (
                                                    <FiTrash2 size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default RecentInterviews;
