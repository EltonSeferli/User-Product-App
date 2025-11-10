import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate auth logic
    console.log("login", { email, password });
  };

  return (
    <section className="card auth-card">
      <h2>Welcome back</h2>
      <p className="muted">Log in to manage your products and orders.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button className="button primary" type="submit">
          Log in
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
