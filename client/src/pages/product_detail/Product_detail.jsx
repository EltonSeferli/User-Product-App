import React from "react";
import { useParams, Link } from "react-router-dom";

function Product_detail() {
  const { id } = useParams();

  return (
    <section className="card detail-card">
      <div className="detail-grid">
        <div className="detail-thumb" />
        <div>
          <h2>Product #{id}</h2>
          <p className="muted">
            This is a demo detail page for product with id <strong>{id}</strong>
            .
          </p>
          <p className="price-large">$49</p>

          <div className="actions">
            <button className="button primary">Add to cart</button>
            <Link to="/" className="button outline">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product_detail;
