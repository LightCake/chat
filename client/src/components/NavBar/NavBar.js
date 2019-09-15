import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";
import "./NavBar.css";

const NavBar = props => {
  const { isAuthenticated, room, logout } = props;
  // Render different elements based on the authentication status
  const getLinks = () => {
    return isAuthenticated ? (
      <Button label="Log Out" onClick={logout} />
    ) : (
      <React.Fragment>
        <NavLink to="/login" label="Log In" />
        <NavLink to="/register" label="Register" />
      </React.Fragment>
    );
  };
  return (
    <div className="navbar">
      <Link to="/" className="navbar_logo_link">
        <img src={Logo} alt="logo" className="navbar_logo" />
      </Link>
      {isAuthenticated && <div className="navbar_room">Room: {room.name}</div>}
      <div className="navbar_group group_1">{getLinks()}</div>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;
