import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ isAuthorized, children }) => {
  return (
    <div className="app-root">
      <Header isAuthorized={isAuthorized} />
      <main className="container main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
