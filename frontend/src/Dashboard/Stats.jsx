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
            title: "Total Interviews",
            value: loading ? "--" : String(stats.totalInterviews),
            subtitle: `${stats.completedInterviews || 0} completed`,
            pill: "All Sessions",
            icon: <FiMic size={22} />,
            color: "#0F9D9A",
            bg: "#E6F8F7",
            border: "#C4F1ED"
        },
        {
            title: "Average Score",
            value: loading ? "--" : stats.averageScore === "-" ? "N/A" : `${stats.averageScore}`,
            unit: stats.averageScore !== "-" && stats.averageScore !== "N/A" ? "/10" : "",
            subtitle: "AI evaluated depth",
            pill: "Gemini AI",
            icon: <FiAward size={22} />,
            color: "#10B981",
            bg: "#ECFDF5",
            border: "#A7F3D0"
        },
        {
            title: "Hours Practiced",
            value: loading ? "--" : stats.hoursPracticed,
            subtitle: "Speaking & listening",
            pill: "Voice Input",
            icon: <FiClock size={22} />,
            color: "#F59E0B",
            bg: "#FFFBEB",
            border: "#FDE68A"
        },
        {
            title: "Completion Rate",
            value: loading ? "--" : stats.successRate,
            subtitle: "Finished vs created",
            pill: "Target: 80%+",
            icon: <FiTrendingUp size={22} />,
            color: "#8B5CF6",
            bg: "#F5F3FF",
            border: "#DDD6FE"
        },
    ];

    return (
        <div className="row mt-4 g-3 g-md-4">
            {statItems.map((item, index) => (
                <div className="col-6 col-lg-3" key={index}>
                    <div
                        className="card border-0 shadow-sm p-3 p-md-4 h-100 position-relative overflow-hidden"
                        style={{
                            borderRadius: "18px",
                            background: "#FFFFFF",
                            border: "1px solid #F1F5F9",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span
                                className="text-secondary fw-semibold text-truncate"
                                style={{ fontSize: "clamp(12px, 1.8vw, 13px)" }}
                            >
                                {item.title}
                            </span>

                            <div
                                style={{
                                    background: item.bg,
                                    border: `1px solid ${item.border}`,
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "12px",
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

                        <div className="d-flex align-items-baseline gap-1 mt-1">
                            <h3
                                className="mb-0 fw-bold"
                                style={{
                                    color: "#0F172A",
                                    fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)",
                                    letterSpacing: "-0.02em"
                                }}
                            >
                                {item.value}
                            </h3>
                            {item.unit && (
                                <span className="text-muted fw-semibold" style={{ fontSize: "13px" }}>
                                    {item.unit}
                                </span>
                            )}
                        </div>

                        <div className="mt-2 pt-1 d-flex justify-content-between align-items-center flex-wrap gap-1">
                            <small className="text-muted text-truncate" style={{ fontSize: "11px" }}>
                                {item.subtitle}
                            </small>
                            <span
                                className="badge d-none d-sm-inline-block px-2 py-1 rounded-pill"
                                style={{
                                    background: item.bg,
                                    color: item.color,
                                    fontSize: "10px",
                                    fontWeight: "600"
                                }}
                            >
                                {item.pill}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Stats;
