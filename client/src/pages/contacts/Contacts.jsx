import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5050/api/contacts/";
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(contacts.filter((c) => c.id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <h1>Products</h1>
          <p className="muted">Manage products: add, view, edit or delete.</p>
        </div>

        <div>
          <button className="button primary" onClick={() => navigate("/add")}>
            + Add product
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        {contacts.length == 0 ? (
          <div className="no_contacts_div">
            <h1>No contacts</h1>
          </div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>ID</th>
                <th style={{ width: 120 }}>Name</th>
                <th style={{ width: 120 }}>Email</th>
                <th style={{ width: 120 }}>Phone</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link to={`/${p.id}`} className="button small">
                        View
                      </Link>
                      <button
                        className="button small"
                        onClick={() => navigate(`/edit/${p.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="button small"
                        onClick={(e) => {
                          handleDelete(p.id);
                        }}
                        style={{ background: "#7f1d1d", color: "#fff" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Contacts;
