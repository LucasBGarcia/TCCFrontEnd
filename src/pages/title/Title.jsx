import React from "react";
import { Link } from "react-router-dom";
import "./title.css"
import logo from './logo.png';


const Title = () => {

  return (
    <nav className="navbar  navbar-expand-lg " >
      <Link to="/home" className="navbar-brand " href="#">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <Link to="/chart" className="chart " href="#">
        Estatística
      </Link>
    </nav >
  );
};

export default Title;
