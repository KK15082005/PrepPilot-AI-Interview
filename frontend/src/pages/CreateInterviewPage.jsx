import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateInterview() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    experienceLevel: "",
    interviewType: "",
    difficulty: "",
    duration: "15",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // 1. Create Interview Record
      const response = await API.post("/interview/create-interview", {
        ...formData,
        duration: Number(formData.duration),
      });

      const interviewId = response.data?.interview?._id;
      if (!interviewId) {
        throw new Error("Failed to create interview record");
      }

      // 2. Generate questions via Gemini AI
      await API.post("/ai/start-interview", { interviewId });

      // 3. Navigate directly to the newly created interview session
      navigate(`/interview/${interviewId}`);

    } catch (err) {
      console.error("Create Interview Error:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert(err.message || "Failed to create AI interview. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#F8FCFC 0%,#EEF8F8 55%,#FCFEFE 100%)",
          padding: "50px 0",
        }}
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          <div
            className="card border-0"
            style={{
              padding: "45px",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(16,24,40,0.08)",
            }}
          >
            <h2
              className="fw-bold"
              style={{
                color: "#27b3ae",
              }}
            >
              Create New Interview
            </h2>

            <p className="text-secondary mb-4">
              Configure your role, topic, and difficulty to generate custom questions with Gemini AI.
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Interview Title</label>
                <input
                  className="form-control py-3"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer Mock"
                  required
                  disabled={isGenerating}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Target Job Role</label>
                <input
                  className="form-control py-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. React Developer, Node.js Engineer"
                  required
                  disabled={isGenerating}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Experience Level</label>
                <select
                  className="form-select py-3"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                >
                  <option value="">Select Level</option>
                  <option>Fresher</option>
                  <option>1-2 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Interview Type</label>
                <select
                  className="form-select py-3"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                >
                  <option value="">Select Type</option>
                  <option>Technical</option>
                  <option>HR</option>
                  <option>Behavioral</option>
                  <option>Mixed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Difficulty</label>
                <select
                  className="form-select py-3"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                >
                  <option value="">Select Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Duration</label>
                <select
                  className="form-select py-3"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                >
                  <option value="15">15 Minutes (10 Questions)</option>
                  <option value="30">30 Minutes (20 Questions)</option>
                  <option value="45">45 Minutes (30 Questions)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 mt-5 py-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2"
              style={{
                background: isGenerating
                  ? "#80CBC4"
                  : "linear-gradient(135deg,#0F9D9A,#3CC8C3)",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
              }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Generating Interview Questions with AI...
                </>
              ) : (
                "✨ Generate AI Interview"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateInterview;
