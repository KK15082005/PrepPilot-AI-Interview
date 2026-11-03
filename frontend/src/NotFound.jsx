import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container py-5 text-center my-5" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "24px",
                    background: "#E8FAF8",
                    color: "#0F9D9A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    marginBottom: "20px"
                }}
            >
                🧭
            </div>
            <h1 className="fw-bold mb-2 display-5" style={{ color: "#0F172A" }}>404 Page Not Found</h1>
            <p className="text-secondary mb-4" style={{ maxWidth: "420px", fontSize: "16px" }}>
                The page or interview session you are looking for doesn't exist or has been moved.
            </p>
            <div className="d-flex gap-3">
                <Link to="/">
                    <button className="btn btn-outline-secondary px-4 py-2 rounded-3">
                        Back to Home
                    </button>
                </Link>
                <Link to="/dashboard">
                    <button
                        className="btn px-4 py-2 text-white fw-semibold rounded-3 shadow-sm"
                        style={{ background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)", border: "none" }}
                    >
                        Go to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
