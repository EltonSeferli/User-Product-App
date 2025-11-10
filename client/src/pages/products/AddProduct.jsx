import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // design-only: do not persist. Backend should handle creation.
    alert(
      "Design-only: submit is not wired. Implement a backend endpoint to create products."
    );
    navigate("/");
  };

  return (
    <section className="card auth-card">
      <h2>Add product</h2>
      <p className="muted">Create a new product for the demo list.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product title"
            required
          />
        </label>

        <label>
          Price (USD)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            required
          />
        </label>

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

export default AddProduct;
