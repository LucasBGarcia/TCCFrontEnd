import React from "react";
import { Link } from "react-router-dom";
import './title.css'

const Title = () => {

  return (
    <nav class="navbar  navbar-expand-lg " >
      <Link to="/" className="navbar-brand " href="#">
        {/* <img src="logo.png" alt="viupet" width="60" className="mr-2" /> */}
      </Link>
      <ul >
        <li class="nav-item format ">
          <Link to="/clients" className="nav-link" href="#">
            Cliente
          </Link>
        </li>
      </ul>

    </nav >
  );
};

export default Title;
