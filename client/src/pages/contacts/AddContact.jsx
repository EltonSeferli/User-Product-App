import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const API_URL = "http://localhost:5050/api/contacts";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        API_URL,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  function getErrorByField(field) {
    return error.find((err) => err.param == field)?.message;
  }
  return (
    <section className="card auth-card">
      <h2>Add Contact</h2>
      <p className="muted">Create a new contact for the demo list.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </label>
        {error && <div className="error_msg">{getErrorByField("name")}</div>}

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
        </label>
        {error && <div className="error_msg">{getErrorByField("email")}</div>}

        <label>
          Phone
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
        </label>
        {error && <div className="error_msg">{getErrorByField("phone")}</div>}

        <div style={{ display: "flex", gap: 8 }}>
          <button className="button primary" type="submit">
            Create
          </button>
          <button
            type="button"
            className="button outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddContact;
