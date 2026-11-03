import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function Banner() {
    return (
        <div
            className="p-4 p-md-5 mt-2 rounded-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4"
            style={{
                background: "linear-gradient(135deg, #EEF8F8 0%, #F9FEFE 100%)",
                border: "1px solid #E6F3F3",
                borderRadius: "20px"
            }}
        >
            <div className="text-center text-md-start">
                <span className="badge bg-white text-dark px-3 py-1 rounded-pill fw-semibold mb-2 shadow-sm" style={{ fontSize: "12px", border: "1px solid #E2E8F0" }}>
                    🎯 MOCK SESSION READY
                </span>

                <h2 style={{ fontWeight: "700", color: "#0F172A", lineHeight: "1.3" }} className="mb-2">
                    Practice Like It's Real.<br className="d-none d-sm-inline" /> Get Hired Like a Pro.
                </h2>

                <p className="text-secondary mt-2 mb-4" style={{ maxWidth: "460px", fontSize: "14px", lineHeight: "1.6" }}>
                    Create role-specific technical & HR mock interviews, speak naturally, 
                    and get instant question-by-question scoring and model answers.
                </p>

                <Link to={"/createinterview"}>
                    <button
                        className="btn px-4 py-3 text-white fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                        style={{
                            background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "15px"
                        }}
                    >
                        <FiPlus size={18} /> Create New Interview
                    </button>
                </Link>
            </div>
            
            <div className="text-center flex-shrink-0">
                <img
                    src="/target.jpg"
                    alt="Interview Target Goal"
                    className="img-fluid"
                    style={{
                        maxWidth: "180px",
                        filter: "drop-shadow(0 10px 20px rgba(15, 157, 154, 0.15))"
                    }}
                />
            </div>
        </div>
    );
}

export default Banner;
