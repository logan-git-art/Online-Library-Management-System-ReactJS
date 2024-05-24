import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbook from "./SearchBook";
import axios from "axios";
import Logo from "./logo.png";
import "./navbar.css";

export default function Navbar({ role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/home/logout");
      setRole("");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Library" className="logo-img" />
        </Link>
        <Searchbook />
      </div>

      {role === null ? (
      <div className="navbar-right">
        <Link className="button-35" to="/login">
          Login
        </Link>
        <div class="divider" />
        <Link className="button-36" to="/signup">
          Signup
        </Link>
      </div>
      ):
      <div className="navbar-right">
        <button className="button-35" onClick={handleLogout}>
          Logout
        </button>
      </div>
      }

      
    </nav>
  );
}
