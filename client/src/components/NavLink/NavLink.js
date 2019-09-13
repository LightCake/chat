import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./NavLink.css";

const NavLink = props => {
  const { label, to } = props;

  return (
    <Link to={to} className="navlink">
      {label}
    </Link>
  );
};

NavLink.propTypes = {};

export default NavLink;
