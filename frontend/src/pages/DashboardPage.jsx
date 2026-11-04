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
        <div className="d-flex" style={{ minHeight: "calc(100vh - 66px)", background: "#F8FAFC" }}>
            {/* Sidebar (Responsive off-canvas on mobile, fixed left navigation on desktop) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <main
                className="flex-grow-1 p-3 p-sm-4 p-xl-5"
                style={{
                    minWidth: 0,
                    overflowX: "hidden"
                }}
            >
                <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
                    <Topbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                    />
                    <Banner />
                    <Stats refreshTrigger={refreshTrigger} />
                    <ReactInterviews searchQuery={searchQuery} onDataChanged={handleDataChanged} />
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;
