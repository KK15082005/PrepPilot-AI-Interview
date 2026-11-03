import React from "react";

function FeatureCard1() {
  const features = [
    {
      icon: "bi bi-stars",
      title: "AI Interview Simulation",
      desc: "Realistic, contextual mock interviews dynamically tailored to your role, experience, and difficulty level."
    },
    {
      icon: "bi bi-mic",
      title: "Voice & Speech Recognition",
      desc: "Speak naturally using speech-to-text or type your responses. Experience realistic conversational audio with text-to-speech."
    },
    {
      icon: "bi bi-cpu",
      title: "Intelligent AI Evaluation",
      desc: "Instant scoring based on accuracy, technical terminology, depth, and communication clarity."
    },
    {
      icon: "bi bi-file-earmark-text",
      title: "Granular Feedback & Ideal Answers",
      desc: "Pinpointed strengths, missed points, and model ideal answers provided for every single question."
    }
  ];

  return (
    <div className="container text-center mt-5 pt-3">
      <span
        className="d-inline-flex px-3 py-1 rounded-pill mb-2 fw-semibold"
        style={{
          border: "1px solid #C4F1ED",
          fontSize: "13px",
          background: "#E8FAF8",
          color: "#0F9D9A",
        }}
      >
        POWERFUL CAPABILITIES
      </span>

      <h2
        className="fw-bold mb-2 display-6"
        style={{ color: "#0F172A", fontSize: "2rem" }}
      >
        Everything You Need to Ace Your Next Interview
      </h2>
      <p className="text-secondary mb-5" style={{ maxWidth: "560px", margin: "0 auto 3rem" }}>
        Designed by engineers for candidates who want objective, stress-free mock interview practice.
      </p>

      <div className="row g-4">
        {features.map((item, idx) => (
          <div className="col-12 col-sm-6 col-lg-3" key={idx}>
            <div
              className="card h-100 border-0 p-4 text-start"
              style={{
                borderRadius: "18px",
                background: "#FFFFFF",
                border: "1px solid #EAF3F3",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(15, 157, 154, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(15, 23, 42, 0.04)";
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "#E6F8F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F9D9A",
                  fontSize: "24px",
                  marginBottom: "18px",
                }}
              >
                <i className={item.icon}></i>
              </div>

              <h5 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "17px" }}>
                {item.title}
              </h5>

              <p className="text-secondary mb-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCard1;
