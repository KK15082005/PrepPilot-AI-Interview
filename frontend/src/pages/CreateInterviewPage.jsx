import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle, FiBriefcase, FiBookmark, FiClock, FiLayers, FiSliders, FiTrendingUp } from "react-icons/fi";
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

  const popularRoles = [
    { label: "React Developer", type: "Technical" },
    { label: "Node.js Engineer", type: "Technical" },
    { label: "Full Stack Engineer", type: "Mixed" },
    { label: "Behavioral & Leadership", type: "Behavioral" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg("");
  };

  const handleQuickRole = (item) => {
    setFormData((prev) => ({
      ...prev,
      role: item.label,
      title: `${item.label} Mock Practice`,
      interviewType: item.type,
    }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.role.trim()) {
      setErrorMsg("Please provide both an interview title and target job role.");
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg("");

    const toastId = toast.loading("Generating tailored AI questions with Gemini...");

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

      toast.success("Interview created! Let's get started.", { id: toastId });

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
        background: "linear-gradient(135deg, #F8FAFC 0%, #EEF8F8 55%, #FCFEFE 100%)",
        padding: "clamp(20px, 4vw, 40px) 16px 60px",
      }}
    >
      <div className="container" style={{ maxWidth: "840px" }}>
        {/* Back Link */}
        <div className="mb-3">
          <Link
            to="/dashboard"
            className="text-decoration-none d-inline-flex align-items-center gap-2 text-secondary fw-semibold"
            style={{ fontSize: "14px" }}
          >
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{
            padding: "clamp(20px, 4vw, 44px)",
            borderRadius: "24px",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          {/* Card Header */}
          <div className="mb-4">
            <span
              className="badge px-3 py-1 rounded-pill fw-semibold mb-2"
              style={{ background: "#E8FAF8", color: "#0F9D9A", border: "1px solid #C4F1ED", fontSize: "12px" }}
            >
              AI MOCK CONFIGURATION
            </span>
            <h2 className="fw-bold mb-1" style={{ color: "#0F172A", fontSize: "clamp(1.4rem, 2.8vw, 1.85rem)" }}>
              Configure Your Mock Interview
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: "14px", lineHeight: "1.5" }}>
              Tailor role expectations, difficulty, and duration. Gemini AI will generate specific realistic questions.
            </p>
          </div>

          {/* Quick Preset Roles */}
          <div className="mb-4 p-3 rounded-3" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <small className="text-muted fw-semibold d-block mb-2" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Quick Preset Roles:
            </small>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {popularRoles.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="btn btn-sm btn-white border px-2.5 py-1 rounded-pill text-secondary fw-medium"
                  style={{
                    fontSize: "12px",
                    background: formData.role === item.label ? "#E6F8F7" : "#FFFFFF",
                    borderColor: formData.role === item.label ? "#0F9D9A" : "#CBD5E1",
                    color: formData.role === item.label ? "#0F9D9A" : "#334155",
                  }}
                  onClick={() => handleQuickRole(item)}
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Banner */}
          {errorMsg && (
            <div className="alert alert-danger py-2.5 px-3 mb-4 d-flex align-items-start gap-2 rounded-3" style={{ fontSize: "13px" }}>
              <FiAlertCircle className="flex-shrink-0 mt-0.5 text-danger" size={17} />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3 g-md-4">
              {/* Interview Title */}
              <div className="col-md-6">
                <label htmlFor="create-title" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiBookmark size={14} style={{ color: "#0F9D9A" }} /> Interview Title <span className="text-danger">*</span>
                </label>
                <input
                  id="create-title"
                  className="form-control py-2.5 px-3"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Practice Session"
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                />
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Session name displayed on your dashboard history
                </small>
              </div>

              {/* Target Job Role */}
              <div className="col-md-6">
                <label htmlFor="create-role" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiBriefcase size={14} style={{ color: "#0F9D9A" }} /> Target Job Role <span className="text-danger">*</span>
                </label>
                <input
                  id="create-role"
                  className="form-control py-2.5 px-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. React Developer, Node.js Engineer"
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                />
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Gemini AI tailors technical concepts specifically to this role
                </small>
              </div>

              {/* Experience Level */}
              <div className="col-md-6">
                <label htmlFor="create-exp" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiTrendingUp size={14} style={{ color: "#0F9D9A" }} /> Experience Level
                </label>
                <select
                  id="create-exp"
                  className="form-select py-2.5 px-3"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                >
                  <option value="Fresher">Fresher / Entry Level (Fundamentals)</option>
                  <option value="1-2 Years">1 - 2 Years (Practical Projects)</option>
                  <option value="3-5 Years">3 - 5 Years (Mid-Level Architecture)</option>
                  <option value="5+ Years">5+ Years (Senior & Leadership)</option>
                </select>
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Tunes depth of edge cases and question difficulty
                </small>
              </div>

              {/* Interview Type */}
              <div className="col-md-6">
                <label htmlFor="create-type" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiLayers size={14} style={{ color: "#0F9D9A" }} /> Round Type
                </label>
                <select
                  id="create-type"
                  className="form-select py-2.5 px-3"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                >
                  <option value="Technical">Technical Round (Coding, Concepts & Systems)</option>
                  <option value="HR">HR Round (Culture Fit & Motivation)</option>
                  <option value="Behavioral">Behavioral (STAR Method & Scenarios)</option>
                  <option value="Mixed">Mixed (Technical + Behavioral)</option>
                </select>
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Sets whether questions test technical depth or situational judgment
                </small>
              </div>

              {/* Difficulty Level */}
              <div className="col-md-6">
                <label htmlFor="create-diff" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiSliders size={14} style={{ color: "#0F9D9A" }} /> Difficulty
                </label>
                <select
                  id="create-diff"
                  className="form-select py-2.5 px-3"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                >
                  <option value="Easy">Easy (Core principles & clean syntax)</option>
                  <option value="Medium">Medium (Real-world practical scenarios)</option>
                  <option value="Hard">Hard (Deep dive, performance & edge cases)</option>
                </select>
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Adjusts how strictly AI evaluates completeness
                </small>
              </div>

              {/* Session Duration */}
              <div className="col-md-6">
                <label htmlFor="create-duration" className="form-label fw-semibold d-flex align-items-center gap-1.5" style={{ fontSize: "13px", color: "#334155" }}>
                  <FiClock size={14} style={{ color: "#0F9D9A" }} /> Session Duration & Questions
                </label>
                <select
                  id="create-duration"
                  className="form-select py-2.5 px-3"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  disabled={isGenerating}
                  style={{ borderRadius: "10px", fontSize: "14px", borderColor: "#CBD5E1" }}
                >
                  <option value="15">15 Minutes (10 Questions - Quick Sprint)</option>
                  <option value="30">30 Minutes (20 Questions - Standard Round)</option>
                  <option value="45">45 Minutes (30 Questions - Comprehensive)</option>
                </select>
                <small className="text-muted d-block mt-1" style={{ fontSize: "11px" }}>
                  Initializes the live session countdown timer
                </small>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 mt-4 mt-md-5 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              style={{
                background: isGenerating
                  ? "#80CBC4"
                  : "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
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
                  <span>Generating AI Questions with Gemini AI...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-stars"></i>
                  <span>Generate AI Mock Interview</span>
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
