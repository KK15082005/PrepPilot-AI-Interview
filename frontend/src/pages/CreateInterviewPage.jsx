import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateInterview() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    experienceLevel: "",
    interviewType: "",
    difficulty: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      console.log("Token:", token);
      console.log("Form Data:", formData);

      const response = await axios.post(
        "http://localhost:3000/api/interview/create-interview",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const interviewId = response.data.interview._id;
      await axios.post(
        "http://localhost:3000/api/ai/start-interview",
        { interviewId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Interview Created Successfully! 🎉");

      // Navigate to interview page
      navigate(`/interview/${interviewId}`);

      alert("Interview Created Successfully! 🎉  All the best ...");

      // Optional: Clear form
      setFormData({
        title: "",
        role: "",
        experienceLevel: "",
        interviewType: "",
        difficulty: "",
        duration: "",
      });

      // Later we'll navigate to interview page
      // navigate(`/interview/${response.data.interview._id}`);

    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log("Backend Error:", err.response.data);
        alert(err.response.data.message || "Something went wrong!");
      } else {
        alert("Unable to connect to the server.");
      }
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
        <div className="container">
          <div
            className="card border-0"
            style={{
              padding: "50px",
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
              Configure your AI mock interview.
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Interview Title</label>

                <input
                  className="form-control py-3"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer Interview"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Job Role</label>

                <input
                  className="form-control py-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="React Developer"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Experience Level
                </label>

                <select
                  className="form-select py-3"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Fresher</option>
                  <option>1-2 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Interview Type
                </label>

                <select
                  className="form-select py-3"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Technical</option>
                  <option>HR</option>
                  <option>Behavioral</option>
                  <option>Mixed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Difficulty</label>

                <select
                  className="form-select py-3"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Duration</label>

                <select
                  className="form-select py-3"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 mt-5 py-3"
              style={{
                background:
                  "linear-gradient(135deg,#0F9D9A,#3CC8C3)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              ✨ Generate AI Interview
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateInterview;