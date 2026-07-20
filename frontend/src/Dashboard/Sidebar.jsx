import react from "react" ;
import {FiHome , FiMic  , FiBarChart2,FiBookmark , FiFileText , FiSettings , FiLogOut} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };
    return (
        <div className="d-flex flex-column justify-content-between p-4" style={{width: "260px",height: "100vh",background: "#F8FEFD",borderRight: "1px solid #EAF3F3",}}>
            <div>
                <h3 style={{ fontWeight: "700" }}>PrepPilot <span style={{ color: "#27b3ae" }}>AI</span></h3>
                <div className="mt-5">
                    <div className="d-flex align-items-center p-3 rounded-3 mb-2" style={{background: "#E9FAF8",color: "#27b3ae",fontWeight: "600",}}>
                        <FiHome size={20} /><span className="ms-3">Dashboard</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2">
                        <FiMic size={20} />
                        <span className="ms-3">Interviews</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2">
                        <FiBarChart2 size={20} />
                        <span className="ms-3">Analytics</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2">
                        <FiBookmark size={20} />
                        <span className="ms-3">Bookmarks</span>
                    </div>

                    <div className="d-flex align-items-center p-3 mb-2">
                        <FiFileText size={20} />
                        <span className="ms-3">Resume</span>
                    </div>

                    <div className="d-flex align-items-center p-3">
                        <FiSettings size={20} />
                        <span className="ms-3">Settings</span>
                    </div>

                </div>

    

                <div className="mt-5 p-4 rounded-4" style={{background: "#E9FAF8"}}>
                    <h5>⭐ Upgrade to Pro</h5>
                    <small className="text-secondary">Unlock unlimited AI interviews and advanced analytics.</small>
                    <button className="btn mt-3 w-100" style={{background: "#27b3ae",color: "#fff"}}>Upgrade</button>
                </div>
            </div>
        
            <div>

                <hr />

                <div className="d-flex align-items-center">

                    <div style={{ width: "45px", height: "45px", background: "#27b3ae",color: "white",borderRadius: "50%",display: "flex",justifyContent: "center" ,alignItems: "center",fontWeight: "700",}}>K</div>

                    <div className="ms-3">
                        <h6 className="mb-0">{user?.username}</h6>
                        <small className="text-secondary">{user?.email}</small>
                    </div>
                    <button onClick={handleLogout} >Logout</button>

                </div>
                

            </div>
        </div>
  );
}

export default Sidebar;