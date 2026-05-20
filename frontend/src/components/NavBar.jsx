import "../styling/NavBar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import CircularText from "../components/CircularText";

import { NavLink } from "react-router-dom";

const NavBar = ({ _isLogin, _setLogin, _userInitial }) => {
  console.log("NAV " + _isLogin);

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
        {_isLogin ? (
          <Dropdown id="nav-dropdown" drop="start">
            <Dropdown.Toggle id="dropdown-basic">
              {_userInitial}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#action/3.1">View GIF</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <NavLink to="/login">
            <Button id="login-button" variant="dark">
              Login
            </Button>
          </NavLink>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
