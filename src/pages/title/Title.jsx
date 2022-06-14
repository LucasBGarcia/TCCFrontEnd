import React from "react";
import { Link } from "react-router-dom";
import "./title.css"


const Title = () => {

  return (
    <nav className="navbar  navbar-expand-lg " >
      <img src="logo.png" alt="logo" width="60" className="mr-2" />
      <Link to="/" className="navbar-brand " href="#">
      </Link>
      <ul >
        <li className="nav-item format ">
          <Link to="/serviceorder" className="nav-link" href="#">
            Orden de Serviço
          </Link>
        </li>
      </ul>

    </nav >
  );
};

export default Title;
