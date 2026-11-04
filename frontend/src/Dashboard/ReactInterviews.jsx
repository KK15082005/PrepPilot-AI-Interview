import React, { useEffect, useState } from "react";
import { FiEye, FiPlay, FiTrash2, FiPlus, FiClock, FiAward } from "react-icons/fi";
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
                return (
                    <span
                        className="badge rounded-pill fw-medium"
                        style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0", fontSize: "11px", padding: "3px 9px" }}
                    >
                        Easy
                    </span>
                );
            case "medium":
                return (
                    <span
                        className="badge rounded-pill fw-medium"
                        style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FDE68A", fontSize: "11px", padding: "3px 9px" }}
                    >
                        Medium
                    </span>
                );
            case "hard":
                return (
                    <span
                        className="badge rounded-pill fw-medium"
                        style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", fontSize: "11px", padding: "3px 9px" }}
                    >
                        Hard
                    </span>
                );
            default:
                return (
                    <span
                        className="badge bg-light text-secondary rounded-pill border"
                        style={{ fontSize: "11px", padding: "3px 9px" }}
                    >
                        {difficulty || "General"}
                    </span>
                );
        }
    };

    const getScoreBadge = (scoreStr) => {
        if (!scoreStr || scoreStr === "-") {
            return <span className="text-muted fw-medium" style={{ fontSize: "12px" }}>—</span>;
        }

        const num = parseFloat(scoreStr);
        if (isNaN(num)) {
            return <span className="text-muted" style={{ fontSize: "12px" }}>{scoreStr}</span>;
        }

        let bg = "#ECFDF5";
        let color = "#059669";
        let border = "#A7F3D0";

        if (num < 5) {
            bg = "#FEF2F2";
            color = "#DC2626";
            border = "#FECACA";
        } else if (num < 7) {
            bg = "#FFFBEB";
            color = "#D97706";
            border = "#FDE68A";
        }

        return (
            <span
                className="badge rounded-pill fw-semibold d-inline-flex align-items-center gap-1"
                style={{ background: bg, color: color, border: `1px solid ${border}`, fontSize: "11.5px", padding: "3px 9px" }}
            >
                <FiAward size={12} /> {num} <small style={{ opacity: 0.8, fontSize: "10px" }}>/10</small>
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const isCompleted = status === "Completed";
        const isOngoing = status === "Ongoing";

        if (isCompleted) {
            return (
                <span
                    className="badge rounded-pill fw-medium"
                    style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0", fontSize: "11px", padding: "3px 9px" }}
                >
                    Completed
                </span>
            );
        }
        if (isOngoing) {
            return (
                <span
                    className="badge rounded-pill fw-medium"
                    style={{ background: "#E6F8F7", color: "#0F9D9A", border: "1px solid #C4F1ED", fontSize: "11px", padding: "3px 9px" }}
                >
                    In Progress
                </span>
            );
        }
        return (
            <span
                className="badge rounded-pill fw-medium"
                style={{ background: "#F1F5F9", color: "#64748B", border: "1px solid #CBD5E1", fontSize: "11px", padding: "3px 9px" }}
            >
                {status || "Pending"}
            </span>
        );
    };

    return (
        <section
            className="card shadow-sm border-0 overflow-hidden mb-4"
            style={{ borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E2E8F0" }}
            aria-label="Recent Interview Sessions"
        >
            <div className="card-body p-3 p-md-4">
                {/* Header Title & New Session Button */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <div>
                        <h3 className="mb-0 fw-bold" style={{ color: "#0F172A", fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)", letterSpacing: "-0.01em" }}>
                            Interview Sessions
                        </h3>
                        <small className="text-secondary d-none d-sm-block mt-0.5" style={{ fontSize: "12px" }}>
                            Review past mock evaluations, weaknesses, and model answers.
                        </small>
                    </div>

                    <Link to="/createinterview" className="text-decoration-none">
                        <button
                            type="button"
                            className="btn btn-sm px-3 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 shadow-sm hover-lift"
                            style={{
                                background: "linear-gradient(135deg, #0F9D9A, #14B8A6)",
                                borderRadius: "8px",
                                border: "none",
                                fontSize: "12.5px"
                            }}
                        >
                            <FiPlus size={14} /> <span>New Session</span>
                        </button>
                    </Link>
                </div>

                {/* Filter Tabs */}
                <div
                    className="d-flex align-items-center gap-1.5 border-bottom pb-2.5 mb-3 overflow-x-auto flex-nowrap"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <button
                        type="button"
                        className={`btn btn-sm px-3 py-1 rounded-pill fw-medium text-nowrap flex-shrink-0 ${
                            activeTab === "all" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "all" ? "#0F9D9A" : "#F8FAFC",
                            borderColor: activeTab === "all" ? "#0F9D9A" : "#E2E8F0",
                            fontSize: "12px"
                        }}
                        onClick={() => setActiveTab("all")}
                    >
                        All Mocks ({interviews.length})
                    </button>

                    <button
                        type="button"
                        className={`btn btn-sm px-3 py-1 rounded-pill fw-medium text-nowrap flex-shrink-0 ${
                            activeTab === "completed" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "completed" ? "#0F9D9A" : "#F8FAFC",
                            borderColor: activeTab === "completed" ? "#0F9D9A" : "#E2E8F0",
                            fontSize: "12px"
                        }}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed ({completedCount})
                    </button>

                    <button
                        type="button"
                        className={`btn btn-sm px-3 py-1 rounded-pill fw-medium text-nowrap flex-shrink-0 ${
                            activeTab === "ongoing" ? "text-white" : "text-secondary btn-light border"
                        }`}
                        style={{
                            background: activeTab === "ongoing" ? "#0F9D9A" : "#F8FAFC",
                            borderColor: activeTab === "ongoing" ? "#0F9D9A" : "#E2E8F0",
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
                        <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                        <p className="mt-2 text-secondary mb-0" style={{ fontSize: "13px" }}>Loading mock interviews...</p>
                    </div>
                ) : filteredInterviews.length === 0 ? (
                    /* Clean Empty State */
                    <div className="text-center py-5 my-1">
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                background: "#E6F8F7",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0F9D9A",
                                fontSize: "20px"
                            }}
                        >
                            🎤
                        </div>
                        <h4 className="mt-2.5 fw-bold" style={{ color: "#0F172A", fontSize: "15px" }}>
                            {searchQuery ? "No matching interviews found" : "No mock interviews yet"}
                        </h4>
                        <p className="text-secondary mb-3" style={{ maxWidth: "380px", margin: "0 auto", fontSize: "12.5px" }}>
                            {searchQuery
                                ? `No interview matches "${searchQuery}". Try a different role keyword.`
                                : "Start practicing role-tailored technical and HR questions to see performance feedback."}
                        </p>
                        {searchQuery ? (
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm px-3 py-1.5 rounded-pill"
                                onClick={() => setActiveTab("all")}
                                style={{ fontSize: "12px" }}
                            >
                                Reset Search
                            </button>
                        ) : (
                            <Link to="/createinterview">
                                <button
                                    type="button"
                                    className="btn px-3.5 py-1.5 text-white fw-semibold shadow-sm"
                                    style={{ background: "#0F9D9A", borderRadius: "8px", border: "none", fontSize: "13px" }}
                                >
                                    Create Your First Interview
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View (>= 768px) */}
                        <div className="table-responsive d-none d-md-block" style={{ overflowX: "auto" }}>
                            <table
                                className="table align-middle table-hover mb-0"
                                style={{
                                    borderCollapse: "separate",
                                    borderSpacing: "0",
                                    width: "100%",
                                    minWidth: "860px"
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            fontSize: "11px",
                                            color: "#64748B",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            borderBottom: "1px solid #E2E8F0"
                                        }}
                                    >
                                        <th className="py-2.5 ps-2" style={{ minWidth: "180px" }}>Role / Title</th>
                                        <th className="py-2.5" style={{ width: "115px", whiteSpace: "nowrap" }}>Round Type</th>
                                        <th className="py-2.5" style={{ width: "95px", whiteSpace: "nowrap" }}>Difficulty</th>
                                        <th className="py-2.5" style={{ width: "85px", whiteSpace: "nowrap" }}>Duration</th>
                                        <th className="py-2.5" style={{ width: "105px", whiteSpace: "nowrap" }}>AI Score</th>
                                        <th className="py-2.5" style={{ width: "115px", whiteSpace: "nowrap" }}>Date</th>
                                        <th className="py-2.5" style={{ width: "105px", whiteSpace: "nowrap" }}>Status</th>
                                        <th className="py-2.5 text-end pe-2" style={{ width: "145px", minWidth: "145px", whiteSpace: "nowrap" }}>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredInterviews.map((item) => {
                                        const isCompleted = item.status === "Completed";

                                        return (
                                            <tr key={item._id} style={{ fontSize: "13px", transition: "background 0.15s ease" }}>
                                                <td className="py-2.5 ps-2">
                                                    <div className="fw-semibold text-truncate" style={{ color: "#0F172A", maxWidth: "260px" }} title={item.role}>
                                                        {item.role || "Developer"}
                                                    </div>
                                                    <small className="text-muted d-block text-truncate" style={{ fontSize: "11px", maxWidth: "260px" }} title={item.title}>
                                                        {item.title || "Mock Session"} • {item.experienceLevel || "Fresher"}
                                                    </small>
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    <span className="badge bg-light text-secondary border px-2 py-1 rounded-pill" style={{ fontSize: "11px", fontWeight: "500" }}>
                                                        {item.interviewType || "Technical"}
                                                    </span>
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    {getDifficultyBadge(item.difficulty)}
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    <span className="text-secondary d-inline-flex align-items-center gap-1" style={{ fontSize: "12px" }}>
                                                        <FiClock size={11} className="text-muted" /> {item.duration || 15}m
                                                    </span>
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    {getScoreBadge(item.score)}
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    <span className="text-muted" style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                                                        {formatDate(item.createdAt)}
                                                    </span>
                                                </td>

                                                <td className="py-2.5" style={{ whiteSpace: "nowrap" }}>
                                                    {getStatusBadge(item.status)}
                                                </td>

                                                <td className="py-2.5 text-end pe-2" style={{ whiteSpace: "nowrap" }}>
                                                    <div className="d-flex justify-content-end align-items-center gap-1.5 flex-nowrap">
                                                        {isCompleted ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 px-2.5 py-1 rounded-pill fw-medium"
                                                                onClick={() => navigate(`/interview/${item._id}/result`)}
                                                                title="View Evaluation Results"
                                                                style={{ fontSize: "11.5px", height: "30px", whiteSpace: "nowrap" }}
                                                            >
                                                                <FiEye size={12} /> View Result
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm text-white d-inline-flex align-items-center gap-1 px-2.5 py-1 rounded-pill fw-medium shadow-sm"
                                                                onClick={() => navigate(`/interview/${item._id}`)}
                                                                title="Continue Interview"
                                                                style={{ background: "#0F9D9A", border: "none", fontSize: "11.5px", height: "30px", whiteSpace: "nowrap" }}
                                                            >
                                                                <FiPlay size={12} /> Practice
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-1 rounded-circle flex-shrink-0"
                                                            onClick={(e) => handleDelete(item._id, e)}
                                                            disabled={deletingId === item._id}
                                                            title="Delete Interview"
                                                            style={{ width: "30px", height: "30px" }}
                                                        >
                                                            {deletingId === item._id ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" style={{ width: "11px", height: "11px" }}></span>
                                                            ) : (
                                                                <FiTrash2 size={12} />
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
                        <div className="d-md-none d-flex flex-column gap-2.5">
                            {filteredInterviews.map((item) => {
                                const isCompleted = item.status === "Completed";

                                return (
                                    <div
                                        key={item._id}
                                        className="card border p-3 rounded-3 shadow-sm"
                                        style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                            <div style={{ minWidth: 0 }}>
                                                <h5 className="fw-bold mb-0 text-truncate" style={{ color: "#0F172A", fontSize: "14px" }}>
                                                    {item.role || "Developer"}
                                                </h5>
                                                <small className="text-muted d-block text-truncate mt-0.5" style={{ fontSize: "11.5px" }}>
                                                    {item.title || "Mock Session"} • {formatDate(item.createdAt)}
                                                </small>
                                            </div>

                                            {getStatusBadge(item.status)}
                                        </div>

                                        <div className="d-flex align-items-center gap-1.5 flex-wrap my-1.5">
                                            <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill" style={{ fontSize: "10.5px" }}>
                                                {item.interviewType || "Technical"}
                                            </span>
                                            {getDifficultyBadge(item.difficulty)}
                                            <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill" style={{ fontSize: "10.5px" }}>
                                                <FiClock size={10} className="me-1" />{item.duration || 15}m
                                            </span>
                                            <div className="ms-auto">
                                                {getScoreBadge(item.score)}
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mt-2 pt-2 border-top">
                                            {isCompleted ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-1.5 flex-grow-1 fw-semibold"
                                                    onClick={() => navigate(`/interview/${item._id}/result`)}
                                                    style={{ height: "38px", borderRadius: "8px", fontSize: "12.5px" }}
                                                >
                                                    <FiEye size={14} /> View AI Report
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm text-white d-flex align-items-center justify-content-center gap-1.5 flex-grow-1 fw-semibold shadow-sm"
                                                    onClick={() => navigate(`/interview/${item._id}`)}
                                                    style={{ background: "#0F9D9A", border: "none", height: "38px", borderRadius: "8px", fontSize: "12.5px" }}
                                                >
                                                    <FiPlay size={14} /> Practice
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center flex-shrink-0"
                                                onClick={(e) => handleDelete(item._id, e)}
                                                disabled={deletingId === item._id}
                                                title="Delete Interview"
                                                style={{ width: "38px", height: "38px", borderRadius: "8px" }}
                                            >
                                                {deletingId === item._id ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                                ) : (
                                                    <FiTrash2 size={15} />
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
        </section>
    );
}

export default RecentInterviews;
