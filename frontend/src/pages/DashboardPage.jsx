import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Banner from "../Dashboard/Banner";
import Stats from "../Dashboard/Stats";
import ReactInterviews from "../Dashboard/ReactInterviews";

function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleDataChanged = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#FCFEFE" }}>
            {/* Sidebar (Responsive drawer on mobile, fixed column on desktop) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <main
                className="flex-grow-1 p-3 p-md-4"
                style={{
                    minWidth: 0,
                    overflowX: "hidden"
                }}
            >
                <Topbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                />
                <Banner />
                <Stats refreshTrigger={refreshTrigger} />
                <ReactInterviews searchQuery={searchQuery} onDataChanged={handleDataChanged} />
            </main>
        </div>
    );
}

export default DashboardPage;
