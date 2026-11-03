import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Banner from "../Dashboard/Banner";
import Stats from "../Dashboard/Stats";
import ReactInterviews from "../Dashboard/ReactInterviews";

function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleDataChanged = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div
                className="flex-grow-1 p-4"
                style={{
                    minHeight: "100vh",
                    background: "#FCFEFE",
                    overflowX: "hidden"
                }}
            >
                <Topbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <Banner />
                <Stats refreshTrigger={refreshTrigger} />
                <ReactInterviews searchQuery={searchQuery} onDataChanged={handleDataChanged} />
            </div>
        </div>
    );
}

export default DashboardPage;
