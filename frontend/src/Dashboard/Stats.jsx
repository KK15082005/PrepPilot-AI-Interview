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
            subtitle: `${stats.completedInterviews || 0} completed`,
            pill: "All Sessions",
            icon: <FiMic size={18} />,
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
            icon: <FiAward size={18} />,
            color: "#10B981",
            bg: "#ECFDF5",
            border: "#A7F3D0"
        },
        {
            title: "Practiced",
            value: loading ? "--" : stats.hoursPracticed,
            subtitle: "Voice & speech audio",
            pill: "Voice Input",
            icon: <FiClock size={18} />,
            color: "#F59E0B",
            bg: "#FFFBEB",
            border: "#FDE68A"
        },
        {
            title: "Completion",
            value: loading ? "--" : stats.successRate,
            subtitle: "Finished vs created",
            pill: "Goal: 80%+",
            icon: <FiTrendingUp size={18} />,
            color: "#8B5CF6",
            bg: "#F5F3FF",
            border: "#DDD6FE"
        },
    ];

    return (
        <div className="row mt-3 mt-md-4 g-2 g-sm-3 g-md-4">
            {statItems.map((item, index) => (
                <div className="col-6 col-lg-3" key={index}>
                    <div
                        className="card border-0 shadow-sm p-3 h-100 position-relative overflow-hidden"
                        style={{
                            borderRadius: "16px",
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <span
                                className="text-secondary fw-semibold text-truncate"
                                style={{ fontSize: "12px" }}
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

                        <div className="d-flex align-items-baseline gap-1 my-1">
                            <h3
                                className="mb-0 fw-bold"
                                style={{
                                    color: "#0F172A",
                                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                                    letterSpacing: "-0.02em"
                                }}
                            >
                                {item.value}
                            </h3>
                            {item.unit && (
                                <span className="text-muted fw-semibold" style={{ fontSize: "12px" }}>
                                    {item.unit}
                                </span>
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-1">
                            <small className="text-muted text-truncate" style={{ fontSize: "11px" }}>
                                {item.subtitle}
                            </small>
                            <span
                                className="badge d-none d-xl-inline-block px-1.5 py-0.5 rounded-pill"
                                style={{
                                    background: item.bg,
                                    color: item.color,
                                    fontSize: "9px",
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
