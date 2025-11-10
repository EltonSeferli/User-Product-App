import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register", { name, email, password });
  };

  return (
    <section className="card auth-card">
      <h2>Create account</h2>
      <p className="muted">Let's get you started — it only takes a minute.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Full name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>

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
            placeholder="Create password"
            required
          />
        </label>

        <button className="button primary" type="submit">
          Create account
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
