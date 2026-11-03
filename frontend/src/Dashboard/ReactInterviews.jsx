import React, { useEffect, useState } from "react";
import { FiEye, FiPlay, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function RecentInterviews({ searchQuery = "", onDataChanged }) {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

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
        if (!window.confirm("Are you sure you want to delete this interview and its results?")) {
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

    // Filter by search query
    const filteredInterviews = interviews.filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.role?.toLowerCase().includes(q) ||
            item.title?.toLowerCase().includes(q) ||
            item.interviewType?.toLowerCase().includes(q) ||
            item.difficulty?.toLowerCase().includes(q)
        );
    });

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
                return <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Easy</span>;
            case "medium":
                return <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1">Medium</span>;
            case "hard":
                return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">Hard</span>;
            default:
                return <span className="badge bg-light text-dark px-2 py-1">{difficulty}</span>;
        }
    };

    return (
        <div className="card shadow-sm border-0 mt-4" style={{ borderRadius: "18px", background: "#FFFFFF" }}>
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1" style={{ fontWeight: "700", color: "#183B56" }}>
                            Recent Interviews
                        </h4>
                        <small className="text-secondary">
                            Track your past mock interview sessions, scores, and evaluations.
                        </small>
                    </div>

                    <Link to="/createinterview">
                        <button
                            className="btn btn-sm px-3 py-2 fw-semibold text-white d-flex align-items-center gap-1"
                            style={{
                                background: "#27b3ae",
                                borderRadius: "10px",
                                border: "none"
                            }}
                        >
                            <FiPlus size={16} /> New Interview
                        </button>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-info" role="status"></div>
                        <p className="mt-2 text-secondary">Loading interviews...</p>
                    </div>
                ) : filteredInterviews.length === 0 ? (
                    <div className="text-center py-5 my-3">
                        <div
                            style={{
                                width: "65px",
                                height: "65px",
                                background: "#E9FAF8",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#27b3ae",
                                fontSize: "28px"
                            }}
                        >
                            🎤
                        </div>
                        <h5 className="mt-3 fw-bold" style={{ color: "#183B56" }}>
                            {searchQuery ? "No matching interviews found" : "No interviews created yet"}
                        </h5>
                        <p className="text-secondary mb-4" style={{ maxWidth: "420px", margin: "0 auto" }}>
                            {searchQuery
                                ? `No interviews match "${searchQuery}". Try a different keyword.`
                                : "Start practicing technical and HR mock interviews tailored to your experience."}
                        </p>
                        {!searchQuery && (
                            <Link to="/createinterview">
                                <button
                                    className="btn px-4 py-2 text-white fw-semibold"
                                    style={{ background: "#27b3ae", borderRadius: "10px", border: "none" }}
                                >
                                    Create Your First Interview
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle table-hover">
                            <thead>
                                <tr className="text-secondary" style={{ fontSize: "13px", borderBottom: "2px solid #F1F5F9" }}>
                                    <th>Role / Title</th>
                                    <th>Type</th>
                                    <th>Difficulty</th>
                                    <th>Duration</th>
                                    <th>Score</th>
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
                                                <div className="fw-bold" style={{ color: "#1E293B" }}>
                                                    {item.role || "Developer"}
                                                </div>
                                                <small className="text-secondary">
                                                    {item.title || "Mock Session"}
                                                </small>
                                            </td>

                                            <td>
                                                <span className="badge bg-light text-dark border px-2 py-1">
                                                    {item.interviewType || "Mixed"}
                                                </span>
                                            </td>

                                            <td>{getDifficultyBadge(item.difficulty)}</td>

                                            <td>{item.duration || 15} mins</td>

                                            <td>
                                                {item.score && item.score !== "-" ? (
                                                    <span className="fw-bold text-success">
                                                        {item.score} <span className="text-muted" style={{ fontSize: "11px" }}>/ 10</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">-</span>
                                                )}
                                            </td>

                                            <td>{formatDate(item.createdAt)}</td>

                                            <td>
                                                <span
                                                    className={`badge ${
                                                        isCompleted
                                                            ? "bg-success"
                                                            : isOngoing
                                                            ? "bg-info text-dark"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {item.status || "Pending"}
                                                </span>
                                            </td>

                                            <td className="text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    {isCompleted ? (
                                                        <button
                                                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                                                            onClick={() => navigate(`/interview/${item._id}/result`)}
                                                            title="View Evaluation Results"
                                                        >
                                                            <FiEye size={15} /> Result
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                                                            onClick={() => navigate(`/interview/${item._id}`)}
                                                            title="Continue Interview"
                                                        >
                                                            <FiPlay size={15} /> Practice
                                                        </button>
                                                    )}

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={(e) => handleDelete(item._id, e)}
                                                        disabled={deletingId === item._id}
                                                        title="Delete Interview"
                                                    >
                                                        {deletingId === item._id ? (
                                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                                        ) : (
                                                            <FiTrash2 size={15} />
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
                )}
            </div>
        </div>
    );
}

export default RecentInterviews;
