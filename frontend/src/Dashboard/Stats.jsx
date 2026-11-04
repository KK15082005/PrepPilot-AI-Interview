import React, { useEffect, useState } from "react";
import { FiMic, FiAward, FiClock, FiTrendingUp } from "react-icons/fi";
import API from "../services/api";

function Stats({ refreshTrigger }) {
    const [stats, setStats] = useState({
        totalInterviews: 0,
        completedInterviews: 0,
        averageScore: "-",
        hoursPracticed: "0 hrs",
        successRate: "0%"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchStats() {
            try {
                const response = await API.get("/interview/stats");
                if (isMounted && response.data?.stats) {
                    setStats(response.data.stats);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchStats();

        return () => {
            isMounted = false;
        };
    }, [refreshTrigger]);

    const statItems = [
        {
            title: "Total Mocks",
            value: loading ? "--" : String(stats.totalInterviews),
            subtitle: `${stats.completedInterviews || 0} completed sessions`,
            icon: <FiMic size={16} />,
            color: "#0F9D9A",
            bg: "rgba(15, 157, 154, 0.08)",
            border: "rgba(15, 157, 154, 0.2)"
        },
        {
            title: "Average Score",
            value: loading ? "--" : stats.averageScore === "-" ? "N/A" : `${stats.averageScore}`,
            unit: stats.averageScore !== "-" && stats.averageScore !== "N/A" ? "/10" : "",
            subtitle: "Rubric depth benchmark",
            icon: <FiAward size={16} />,
            color: "#10B981",
            bg: "rgba(16, 185, 129, 0.08)",
            border: "rgba(16, 185, 129, 0.2)"
        },
        {
            title: "Practiced Hours",
            value: loading ? "--" : stats.hoursPracticed,
            subtitle: "Total speech audio time",
            icon: <FiClock size={16} />,
            color: "#D97706",
            bg: "rgba(245, 158, 11, 0.08)",
            border: "rgba(245, 158, 11, 0.2)"
        },
        {
            title: "Completion Rate",
            value: loading ? "--" : stats.successRate,
            subtitle: "Finished vs initiated",
            icon: <FiTrendingUp size={16} />,
            color: "#6366F1",
            bg: "rgba(99, 102, 241, 0.08)",
            border: "rgba(99, 102, 241, 0.2)"
        },
    ];

    return (
        <section className="mb-4" aria-label="Candidate Performance Metrics">
            <div className="row g-2 g-sm-3 g-md-3">
                {statItems.map((item, index) => (
                    <div className="col-6 col-lg-3" key={index}>
                        <div
                            className="card border-0 shadow-sm h-100 position-relative"
                            style={{
                                borderRadius: "14px",
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                padding: "16px 18px",
                                transition: "all 0.18s ease",
                            }}
                        >
                            {/* Card Top: Label & Restrained Accent Icon */}
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span
                                    className="fw-semibold text-truncate"
                                    style={{ fontSize: "12px", color: "#64748B", letterSpacing: "0.2px" }}
                                >
                                    {item.title}
                                </span>

                                <div
                                    style={{
                                        background: item.bg,
                                        border: `1px solid ${item.border}`,
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: item.color,
                                        flexShrink: 0
                                    }}
                                >
                                    {item.icon}
                                </div>
                            </div>

                            {/* Card Value: Crisp Typography */}
                            <div className="d-flex align-items-baseline gap-1 my-1">
                                <h3
                                    className="mb-0 fw-bold"
                                    style={{
                                        color: "#0F172A",
                                        fontSize: "clamp(1.35rem, 2.3vw, 1.7rem)",
                                        letterSpacing: "-0.03em",
                                        lineHeight: "1.2"
                                    }}
                                >
                                    {item.value}
                                </h3>
                                {item.unit && (
                                    <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "600" }}>
                                        {item.unit}
                                    </span>
                                )}
                            </div>

                            {/* Card Bottom: Context Subtitle */}
                            <p className="mb-0 text-truncate" style={{ fontSize: "11.5px", color: "#94A3B8" }}>
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Stats;
