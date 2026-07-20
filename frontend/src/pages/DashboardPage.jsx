import react from "react";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Banner from "../Dashboard/Banner";
import Stats from "../Dashboard/Stats";
import ReactInterviews from "../Dashboard/ReactInterviews" ;


function DashboardPage() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1 p-4"
                style={{
                    minHeight: "100vh",
                    background: "#FCFEFE"
                }}
            >

                <Topbar />

                <Banner/>

                <Stats/>

                <ReactInterviews/>

            </div>

        </div>
    );
}

export default DashboardPage;