import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState();
  const API_URL = "http://localhost:5050/api/contacts/";
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios(API_URL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setContact(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}${id}`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data.errors);
      } else if (err.request) {
        setErrors({
          param: "server",
          message: "No response from server. Check your connection.",
        });
      } else {
        setErrors({
          param: "wrong",
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };
  function getErrorByField(field) {
    return errors.find((err) => err.param == field)?.message;
  }
  return (
    <section className="card auth-card">
      <h2>Edit product</h2>
      <p className="muted">Update the contact details below.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product title"
          />
        </label>
        {errors && <div className="error_msg">{getErrorByField("name")}</div>}

        <label>
          Phone Number
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0"
          />
        </label>
        {errors && <div className="error_msg">{getErrorByField("phone")}</div>}

        <div style={{ display: "flex", gap: 8 }}>
          <button className="button primary" type="submit">
            Save
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

export default EditContact;
