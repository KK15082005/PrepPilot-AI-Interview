import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

function CreateInterview() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    experienceLevel: "Fresher",
    interviewType: "Technical",
    difficulty: "Medium",
    duration: "15",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg("");

    const toastId = toast.loading("Generating AI mock interview questions...");

    try {
      // 1. Create Interview Record
      const response = await API.post("/interview/create-interview", {
        ...formData,
        duration: Number(formData.duration),
      });

      const interviewId = response.data?.interview?._id;
      if (!interviewId) {
        throw new Error("Failed to create interview session record");
      }

      // 2. Generate questions via Gemini AI
      await API.post("/ai/start-interview", { interviewId });

      toast.success("Interview created! Let's begin.", { id: toastId });

      // 3. Navigate directly to the newly created interview session
      navigate(`/interview/${interviewId}`);

    } catch (err) {
      console.error("Create Interview Error:", err);
      const friendlyMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to generate AI interview questions. Please verify your connection and try again.";
      setErrorMsg(friendlyMessage);
      toast.error(friendlyMessage, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F8FCFC 0%, #EEF8F8 55%, #FCFEFE 100%)",
        padding: "30px 16px 60px",
      }}
    >
      <div className="container" style={{ maxWidth: "820px" }}>
        {/* Back Link */}
        <div className="mb-3">
          <Link
            to="/dashboard"
            className="text-decoration-none d-inline-flex align-items-center gap-2 text-secondary fw-medium"
            style={{ fontSize: "14px" }}
          >
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{
            padding: "clamp(24px, 5vw, 48px)",
            borderRadius: "24px",
            background: "#FFFFFF",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div className="mb-4">
            <span
              className="badge px-3 py-1 rounded-pill fw-semibold mb-2"
              style={{ background: "#E8FAF8", color: "#0F9D9A", border: "1px solid #C4F1ED" }}
            >
              AI MOCK CONFIGURATION
            </span>
            <h2 className="fw-bold mb-1" style={{ color: "#0F172A", fontSize: "1.75rem" }}>
              Configure Your Mock Interview
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: "15px" }}>
              Personalize your role, difficulty, and duration. Gemini AI will generate tailored questions.
            </p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger py-3 px-3 mb-4 d-flex align-items-start gap-2 rounded-3" style={{ fontSize: "14px" }}>
              <FiAlertCircle className="flex-shrink-0 mt-1" size={18} />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 g-md-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Interview Title
                </label>
                <input
                  className="form-control py-3 px-3"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Engineer Practice"
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Target Job Role
                </label>
                <input
                  className="form-control py-3 px-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. React Developer, Node.js Engineer"
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Experience Level
                </label>
                <select
                  className="form-select py-3 px-3"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                >
                  <option value="Fresher">Fresher / Entry Level</option>
                  <option value="1-2 Years">1 - 2 Years</option>
                  <option value="3-5 Years">3 - 5 Years (Mid-Level)</option>
                  <option value="5+ Years">5+ Years (Senior / Lead)</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Interview Type
                </label>
                <select
                  className="form-select py-3 px-3"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                >
                  <option value="Technical">Technical Round (Coding & System Knowledge)</option>
                  <option value="HR">HR & Culture Fit Round</option>
                  <option value="Behavioral">Behavioral (Leadership & Scenarios)</option>
                  <option value="Mixed">Mixed (Technical + Behavioral)</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Difficulty Level
                </label>
                <select
                  className="form-select py-3 px-3"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                >
                  <option value="Easy">Easy (Fundamentals & Core Concepts)</option>
                  <option value="Medium">Medium (Real-World Practical Scenarios)</option>
                  <option value="Hard">Hard (Deep Dive & Edge Cases)</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Session Duration
                </label>
                <select
                  className="form-select py-3 px-3"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px" }}
                >
                  <option value="15">15 Minutes (10 Questions)</option>
                  <option value="30">30 Minutes (20 Questions)</option>
                  <option value="45">45 Minutes (30 Questions)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 mt-5 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              style={{
                background: isGenerating
                  ? "#80CBC4"
                  : "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                border: "none",
                borderRadius: "12px",
                fontSize: "17px",
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
                  Generating Interview Questions with Gemini AI...
                </>
              ) : (
                <>
                  <i className="bi bi-stars"></i> Generate AI Mock Interview
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateInterview;
