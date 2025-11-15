import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5050/api/users/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { username, email, password });
      setSuccess("Account created successfully! Redirecting to login...");
      setUserName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err);
      // Handle validation or server errors
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setErrors(errorData.errors);
        } else if (errorData.param && errorData.message) {
          setErrors(errorData);
        } else if (errorData.message) {
          setErrors([{ message: errorData.message }]);
        } else {
          setErrors([{ message: "Registration failed. Please try again." }]);
        }
      } else if (err.request) {
        setErrors([
          { message: "No response from server. Check your connection." },
        ]);
      } else {
        setErrors([
          { message: err.message || "An unexpected error occurred." },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  function findErrorByField(field) {
    if (!Array.isArray(errors)) return null;
    const fieldError = errors.find((err) => err.param === field);
    return fieldError?.message;
  }
  function getGeneralErrors() {
    if (!Array.isArray(errors)) return [];
    return errors.filter((err) => !err.param || err.param === "general");
  }
  return (
    <section className="card auth-card">
      <h2>Create account</h2>
      <p className="muted">Let's get you started — it only takes a minute.</p>

      {success && (
        <div
          style={{
            background: "#166534",
            color: "#86efac",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          ✓ {success}
        </div>
      )}
      {getGeneralErrors().map((error, index) => (
        <div key={index} className="error_msg">
          ⚠ {error.message}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Full name
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your full name"
            disabled={loading}
          />
        </label>
        {errors && (
          <div className="error_msg">{findErrorByField("username")}</div>
        )}

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={loading}
          />
        </label>
        {errors && <div className="error_msg">{findErrorByField("email")}</div>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            disabled={loading}
          />
        </label>
        {errors && (
          <div className="error_msg">{findErrorByField("password")}</div>
        )}
        <button className="button primary" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="muted">
        Already registered?{" "}
        <Link to="/login" className="link">
          Log in
        </Link>
      </p>
    </section>
  );
}

export default Register;
