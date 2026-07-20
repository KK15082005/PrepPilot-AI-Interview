import React from "react";

function FeatureCard1() {
  return (
    <div className="container text-center mt-5">
      <small
        className="mt-3"
        style={{
          border: "1px solid #1a8f8b",
          borderRadius: "999px",
          padding: "3px 10px",
          fontSize: "15px",
          fontWeight: "600",
          background: "#DDF4F6",
          color: "#1a8f8b",
        }}
      >
        Powerful Features
      </small>

      <h3
        className="mt-2 mb-4"
        style={{ fontSize: "20px", fontWeight: "600" }}
      >
        Everything You need to Ace Your Interview
      </h3>

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
                className="bi bi-stars"
                style={{
                  fontSize: "40px",
                  color: "#3CC8C3",
                }}
              ></i>

              <h5 className="card-title mt-3">AI Interview Simulation</h5>

              <p className="card-text text-secondary">
                Realistic AI-Powered interviews tailored to your role and
                experience.
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
                className="bi bi-mic"
                style={{
                  fontSize: "40px",
                  color: "#3CC8C3",
                }}
              ></i>

              <h5 className="card-title mt-3">Voice & Text Answering</h5>

              <p className="card-text text-secondary">
                Answer by speaking or typing. Our AI understands and evaluates
                your responses.
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
                className="bi bi-clock"
                style={{
                  fontSize: "40px",
                  color: "#3CC8C3",
                }}
              ></i>

              <h5 className="card-title mt-3">AI Evaluation Engine</h5>

              <p className="card-text text-secondary">
                Advanced AI models evaluate your answers fairly and provide
                accurate scores.
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
                className="bi bi-file-earmark-text"
                style={{
                  fontSize: "40px",
                  color: "#3CC8C3",
                }}
              ></i>

              <h5 className="card-title mt-3">Detailed Feedback</h5>

              <p className="card-text text-secondary">
                Get in-depth feedback with strengths, weaknesses and improvement
                tips.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeatureCard1;