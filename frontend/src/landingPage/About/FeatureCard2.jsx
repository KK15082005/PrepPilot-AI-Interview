import React from "react";

function FeatureCard2() {
  return (
    <div className="container text-center mt-4">
      <div className="row g-4">

        {/* Card 1 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              border: "1px solid #1a8f8b",
              boxShadow: "0 8px 20px rgba(105,213,233,0.4)",
            }}
          >
            <div className="card-body">
              <i
                className="bi bi-graph-up-arrow"
                style={{ fontSize: "40px", color: "#3CC8C3" }}
              ></i>

              <h5 className="card-title mt-3">
                Performance Dashboard
              </h5>

              <p className="card-text text-secondary">
                Track your progress with beautiful analytics and performance
                insights.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              border: "1px solid #1a8f8b",
              boxShadow: "0 8px 20px rgba(105,213,233,0.4)",
            }}
          >
            <div className="card-body">
              <i
                className="bi bi-file-earmark-person"
                style={{ fontSize: "40px", color: "#3CC8C3" }}
              ></i>

              <h5 className="card-title mt-3">
                Personalized Learning Path
              </h5>

              <p className="card-text text-secondary">
                Get a customized improvement plan based on your performance and
                goals.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              border: "1px solid #1a8f8b",
              boxShadow: "0 8px 20px rgba(105,213,233,0.4)",
            }}
          >
            <div className="card-body">
              <i
                className="bi bi-file-earmark-pdf"
                style={{ fontSize: "40px", color: "#3CC8C3" }}
              ></i>

              <h5 className="card-title mt-3">
                Resume Based Questions
              </h5>

              <p className="card-text text-secondary">
                Get questions tailored to your resume, skills and target role.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              border: "1px solid #1a8f8b",
              boxShadow: "0 8px 20px rgba(105,213,233,0.4)",
            }}
          >
            <div className="card-body">
              <i
                className="bi bi-infinity"
                style={{ fontSize: "40px", color: "#3CC8C3" }}
              ></i>

              <h5 className="card-title mt-3">
                Unlimited Practice Sessions
              </h5>

              <p className="card-text text-secondary">
                Practice as much as you want—no limits, no extra cost.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeatureCard2;