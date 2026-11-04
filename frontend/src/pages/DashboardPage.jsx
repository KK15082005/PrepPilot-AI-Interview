import React, { useState, useEffect } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import Banner from "../Dashboard/Banner";
import Stats from "../Dashboard/Stats";
import ReactInterviews from "../Dashboard/ReactInterviews";

function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 992;
        }
        return true;
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDataChanged = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div
            className="d-flex"
            style={{
                height: "100vh",
                maxHeight: "100vh",
                overflow: "hidden",
                background: "#F8FAFC",
                position: "relative"
            }}
        >
            {/* Sidebar (Responsive off-canvas on mobile, fixed/sticky left navigation on desktop) */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onToggle={() => setSidebarOpen((prev) => !prev)}
            />

            {/* Main Content Area */}
            <main
                className="flex-grow-1 px-3 px-sm-4 px-lg-4 px-xl-5 py-3 py-lg-4"
                style={{
                    height: "100vh",
                    maxHeight: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    minWidth: 0,
                    width: "100%",
                    WebkitOverflowScrolling: "touch",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
                    <Topbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                        sidebarOpen={sidebarOpen}
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
