import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function Banner() {
    return (
        <div className="p-5 mt-4 rounded-4 d-flex justify-content-between align-items-center" style={{background: "linear-gradient(135deg,#EEF8F8,#F9FEFE)",border: "1px solid #E6F3F3",}}>
            <div>

                <h2 style={{fontWeight: "700",color: "#183B56",lineHeight: "1.4",}}>Practice Like It's Real.<br />Get Hired Like a Pro.</h2>
                <p className="text-secondary mt-3" style={{ maxWidth: "420px" }}>
                    Create realistic AI interviews, receive instant feedback,
                    improve every session and track your interview journey.
                </p>

                <Link to={"/createinterview"}>
                    <button className="btn mt-3 px-4 py-3" style={{background: "#27b3ae",color: "#fff",fontWeight: "600",borderRadius: "12px",}}>
                        <FiPlus className="me-2" />Create New Interview
                    </button>
                </Link>

            </div>
            
            <div>

                <img src="/target.jpg"alt="Target"style={{width: "220px",}}/>

            </div>

        </div>
    );
}

export default Banner;