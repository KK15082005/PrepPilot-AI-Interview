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
            value: loading ? "..." : String(stats.totalInterviews),
            subtitle: `${stats.completedInterviews || 0} completed`,
            icon: <FiMic size={26} />,
            color: "#27b3ae",
            bg: "#E8FAF8"
        },
        {
            title: "Average Score",
            value: loading ? "..." : stats.averageScore,
            subtitle: "Overall AI evaluation",
            icon: <FiAward size={26} />,
            color: "#10B981",
            bg: "#ECFDF5"
        },
        {
            title: "Hours Practiced",
            value: loading ? "..." : stats.hoursPracticed,
            subtitle: "Total session time",
            icon: <FiClock size={26} />,
            color: "#F59E0B",
            bg: "#FFFBEB"
        },
        {
            title: "Completion Rate",
            value: loading ? "..." : stats.successRate,
            subtitle: "Finished vs created",
            icon: <FiTrendingUp size={26} />,
            color: "#8B5CF6",
            bg: "#F5F3FF"
        },
    ];

    return (
        <div className="row mt-4 g-4">
            {statItems.map((item, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                    <div
                        className="card border-0 shadow-sm p-4 h-100"
                        style={{
                            borderRadius: "18px",
                            background: "#FFFFFF",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease"
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <small className="text-secondary fw-semibold">
                                    {item.title}
                                </small>
                                <h3 className="mt-2 mb-1" style={{ fontWeight: "700", color: "#183B56" }}>
                                    {item.value}
                                </h3>
                                <small className="text-muted" style={{ fontSize: "12px" }}>
                                    {item.subtitle}
                                </small>
                            </div>

                            <div
                                style={{
                                    background: item.bg,
                                    width: "55px",
                                    height: "55px",
                                    borderRadius: "16px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: item.color,
                                }}
                            >
                                {item.icon}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Stats;
