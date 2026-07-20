import { FiMic, FiAward, FiClock, FiTrendingUp } from "react-icons/fi";

function Stats() {
    const stats = [
        {
            title: "Total Interviews",
            value: "12",
            icon: <FiMic size={28} />,
            color: "#27b3ae",
        },
        {
            title: "Average Score",
            value: "8.6 / 10",
            icon: <FiAward size={28} />,
            color: "#4CAF50",
        },
        {
            title: "Hours Practiced",
            value: "18 hrs",
            icon: <FiClock size={28} />,
            color: "#F59E0B",
        },
        {
            title: "Success Rate",
            value: "92%",
            icon: <FiTrendingUp size={28} />,
            color: "#8B5CF6",
        },
    ];

    return (
        <div className="row mt-4 g-4">

        {stats.map((item, index) => (

        <div className="col-lg-3 col-md-6" key={index}>
            <div className="card border-0 shadow-sm p-4 h-100" style={{borderRadius: "18px",}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>

                        <small className="text-secondary">
                        {item.title}
                        </small>

                        <h3 className="mt-2" style={{fontWeight: "700",}}>
                            {item.value}
                        </h3>

                    </div>

                    <div style={{background: item.color,width: "55px",height: "55px",borderRadius: "14px",display: "flex",justifyContent: "center", alignItems: "center",color: "white",}}>
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