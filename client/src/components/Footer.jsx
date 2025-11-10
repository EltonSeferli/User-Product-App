import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Shoply — built with ❤️</p>
        <small>Simple demo UI for the CRUD app</small>
      </div>
    </footer>
  );
};

export default Footer;
