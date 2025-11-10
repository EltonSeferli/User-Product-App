import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="#4f46e5" />
            <path
              d="M7 12h10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7 8h10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
          <span>Shoply</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link button-outline">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
