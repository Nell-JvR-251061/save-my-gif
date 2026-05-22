import "../styling/NavBar.css";

import { useAuth } from "./AuthManager";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import CircularText from "../components/CircularText";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const NavBar = ({ _isLogin, _setLogin, _userInitial }) => {

  const { user } = useAuth();
  const { Logout } = useAuth();

  const navigate = useNavigate();

  const LoggingOut = () => {
    Logout();
    navigate("/");
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            <CircularText
              text="SAVE.MY.GIF."
              onHover="speedUp"
              spinDuration={28}
              className="custom-class"
            />
          </NavLink>
        </Navbar.Brand>
        {!user ? (
          <NavLink to="/login">
            <Button id="login-button" variant="dark">
              Login
            </Button>
          </NavLink>
        ) : (
          <Dropdown id="nav-dropdown" drop="down">
            <Dropdown.Toggle id="dropdown-basic">{user.name}</Dropdown.Toggle>

            <Dropdown.Menu id="dropdown-menu">
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => navigate("/display")}
              >
                View GIF
              </Dropdown.Item>
              <Dropdown.Item className="dropdown-item" onClick={LoggingOut}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
