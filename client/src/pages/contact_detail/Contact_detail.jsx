import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Contact_detail() {
  const { id } = useParams();
  const API_URL = "http://localhost:5050/api/contacts/";
  const token = localStorage.getItem("token");
  const [contact, setContact] = useState({});
  useEffect(() => {
    axios(API_URL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setContact(res.data);
    });
  }, []);

  return (
    <section className="card detail-card">
      <div className="detail-grid">
        <div className="detail-thumb" />
        <div>
          <h2>Contact #{id}</h2>
          <p className="muted">
            Email Address: <strong>{contact.email}</strong>.
          </p>
          <p className="price-large">Contact Name: {contact.name}</p>
          <p className="price-large">Phone Number: {contact.phone}</p>

          <div className="actions">
            <Link to="/" className="button outline">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact_detail;
