import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5050/api/users/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("current_user", JSON.stringify(user));

      setSuccess("Login successful! Redirecting...");

      // Reset form
      setEmail("");
      setPassword("");

      // Redirect to products after 1.5 seconds
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      // Handle validation or server errors
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Multiple validation errors from Joi
          setError(errorData.errors);
        } else if (errorData.message) {
          setError(errorData.message);
        } else {
          setError("Login failed. Please check your email and password.");
        }
      } else if (err.request) {
        setError([
          {
            param: "Network",
            message: "No response from server. Check your connection.",
          },
        ]);
      } else {
        setError(err.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  function findErrorByField(field) {
    console.log(error);
    return error.find((err) => err.param == field)?.message;
  }
  return (
    <section className="card auth-card">
      <h2>Welcome back</h2>
      <p className="muted">Log in to manage your products and orders.</p>

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
            placeholder="••••••••"
            disabled={loading}
          />
        </label>
        {error && (
          <div className="error_msg">{findErrorByField("password")}</div>
        )}

        <button className="button primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="muted">
        New here?{" "}
        <Link to="/register" className="link">
          Create an account
        </Link>
      </p>
    </section>
  );
}

export default Login;
