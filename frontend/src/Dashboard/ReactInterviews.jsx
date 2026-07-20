import { FiEye } from "react-icons/fi";

function RecentInterviews() {

    const interviews = [
        {
            role: "React Developer",
            type: "Technical",
            difficulty: "Medium",
            score: "8.8",
            date: "14 Jul 2026",
            status: "Completed",
        },
        {
            role: "Java Backend",
            type: "Technical",
            difficulty: "Hard",
            score: "9.2",
            date: "13 Jul 2026",
            status: "Completed",
        },
        {
            role: "HR Interview",
            type: "HR",
            difficulty: "Easy",
            score: "-",
            date: "Today",
            status: "Pending",
        },
    ];

    return (

        <div className="card shadow-sm border-0 mt-4" style={{ borderRadius: "18px" }}>

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4 style={{ fontWeight: "700" }}>
                        Recent Interviews
                    </h4>

                    <button className="btn btn-sm" style={{background: "#27b3ae",color: "white",}}>View All</button>
                </div>

                <table className="table align-middle">

                    <thead>

                        <tr>

                            <th>Role</th>
                            <th>Type</th>
                            <th>Difficulty</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        {interviews.map((item, index) => (

                            <tr key={index}>

                                <td>{item.role}</td>

                                <td>{item.type}</td>

                                <td>{item.difficulty}</td>

                                <td>{item.score}</td>

                                <td>{item.date}</td>

                                <td>

                                    <span
                                        className={`badge ${
                                            item.status === "Completed"
                                                ? "bg-success"
                                                : "bg-warning text-dark"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>

                                    <button className="btn btn-light">

                                        <FiEye />

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default RecentInterviews;