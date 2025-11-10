import React from "react";
import { Link, useNavigate } from "react-router-dom";

// static sample data for design-only view
const sample = [
  { id: 1, title: "Handmade Vase", price: 28 },
  { id: 2, title: "Wooden Chair", price: 120 },
  { id: 3, title: "Ceramic Mug", price: 12 },
  { id: 4, title: "Wool Scarf", price: 34 },
];

function Products() {
  const navigate = useNavigate();

  const handleDelete = () => {
    // design-only: prompt the developer to implement backend
    alert(
      "Design-only: delete is not implemented. Connect this action to your backend to enable deletion."
    );
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
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Title</th>
              <th style={{ width: 120 }}>Price</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>${p.price}</td>
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
                      onClick={handleDelete}
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
      </div>
    </section>
  );
}

export default Products;
