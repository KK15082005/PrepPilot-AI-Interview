import { FiBell, FiSearch } from "react-icons/fi";


function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (

        <div className="d-flex justify-content-between align-items-center mb-4">
        
            <div>
                <h2 style={{fontWeight: "700",color: "#1B2B3A",}}>Dashboard</h2>

                <p className="text-secondary mb-0">Welcome back, {user?.username} 👋</p>
            </div>
            <div className="d-flex align-items-center">

                <div className="input-group me-4"style={{ width: "260px" }}>
                    <span className="input-group-text bg-white"><FiSearch /></span>

                    <input type="text" className="form-control"placeholder="Search..."/>
                </div>
        
                <div className="me-4" style={{ cursor: "pointer"}}>
                    <FiBell size={24} color="#27b3ae" />
                </div>

                <div style={{width: "45px",height: "45px",borderRadius: "50%",background: "#27b3ae",color: "white",display: "flex",justifyContent: "center " ,  alignItems: "center",fontWeight: "700" ,fontSize: "18px",}}>
                    {user?.username?.charAt(0).toUpperCase()}
                </div>

            </div>
        </div>
    );
}

export default Topbar;