import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5050/api/users/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { username, email, password });
      setSuccess("Account created successfully! Redirecting to login...");
      const { token, user } = response.data;
      setUserName("");
      setEmail("");
      setPassword("");
      localStorage.setItem("current_user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      // Redirect to login after 2 seconds
      // setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
      // Handle validation or server errors
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Multiple validation errors from Joi
          const messages = errorData.errors.map((e) => e.message).join("\n");

          setError(errorData.errors);
        } else if (errorData.message) {
          setError(errorData);
          console.log(errorData);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (err.request) {
        setError("No response from server. Check your connection.");
      } else {
        setError(err.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  function findErrorByField(field) {
    return error.find((err) => err.param == field)?.message;
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
        {error && (
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
        {error && <div className="error_msg">{findErrorByField("email")}</div>}
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
        {error && (
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
