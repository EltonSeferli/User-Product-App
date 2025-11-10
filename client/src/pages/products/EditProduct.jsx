import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // design-only: prefill example values based on id (no persistence)
  useEffect(() => {
    const examples = [
      { id: 1, title: "Handmade Vase", price: 28 },
      { id: 2, title: "Wooden Chair", price: 120 },
      { id: 3, title: "Ceramic Mug", price: 12 },
      { id: 4, title: "Wool Scarf", price: 34 },
    ];
    const found = examples.find((p) => String(p.id) === String(id));
    if (found) {
      setTitle(found.title);
      setPrice(found.price);
    } else {
      setTitle("");
      setPrice("");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // design-only: do not persist changes. Backend should perform update.
    alert(
      "Design-only: save is not wired. Implement a backend endpoint to update products."
    );
    navigate("/");
  };

  return (
    <section className="card auth-card">
      <h2>Edit product</h2>
      <p className="muted">Update the product details below.</p>

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

export default EditProduct;
