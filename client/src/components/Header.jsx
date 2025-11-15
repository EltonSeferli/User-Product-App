import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthorized }) => {
  function handleLogOut() {
    localStorage.removeItem("current_user");
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span>Contact app</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Contacts
          </Link>

          {isAuthorized ? (
            <button className="log_out_btn" onClick={handleLogOut}>
              Log out
            </button>
          ) : (
            <div>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link button-outline">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
