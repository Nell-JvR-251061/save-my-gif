import "../styling/NavBar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

import CircularText from "../components/CircularText";

import { NavLink } from "react-router-dom";

const NavBar = () => {
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
        <Nav>
          <NavLink>
            <Button id="login-button" variant="dark">Login</Button>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
