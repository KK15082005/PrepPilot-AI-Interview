import React from "react";

function FeatureCard2() {
  const features = [
    {
      icon: "bi bi-graph-up-arrow",
      title: "Real Analytics Dashboard",
      desc: "Track total practice hours, average scores across sessions, and completion rates with live MongoDB charts."
    },
    {
      icon: "bi bi-compass",
      title: "Customized Improvement Path",
      desc: "Strategic feedback highlighting clear next steps, behavioral improvements, and targeted technical topics."
    },
    {
      icon: "bi bi-file-earmark-code",
      title: "Multi-Discipline Support",
      desc: "From React and Node.js to System Design and HR behavioral questions, select the exact interview type you need."
    },
    {
      icon: "bi bi-shield-check",
      title: "Objective & Private",
      desc: "Practice without judgement in your own safe space. Your answers and recordings remain private to your account."
    }
  ];

  return (
    <div className="container text-center mt-4">
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

export default FeatureCard2;
