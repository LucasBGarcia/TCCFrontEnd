import React from "react";
import { Link } from "react-router-dom";
import "./title.css"
import logo from './logo.png';


const Title = () => {

  return (
    <nav className="navbar  navbar-expand-lg " >
      <Link to="/" className="navbar-brand " href="#">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul >
      </ul>
    </nav >
  );
};

export default Title;
