import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import logo from "./APHA_logo_svg.svg"; 

const NavbarComp = () => {
  return (
    <Navbar expand="lg" className="navbarcomp">
      <Container fluid>
      <a className="navbar-brand" href="/">
          <img
            src={logo} 
            alt="APHA_logo"
            height="50px"
            width="50px"
          />
        </a>
        <Navbar.Brand id="nav-main-title">
          ViewBovis [Official Sensitive]
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cattlemovement">
              Cattle Movement
            </Nav.Link>
            <Nav.Link as={NavLink} to="/snpdistance">
              SNP Distance
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nextstrain">
              Nextstrain
            </Nav.Link>
            <Nav.Link as={NavLink} to="/helpsupport">
              Help and Support
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">TBC</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">TBC</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">TBC</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">TBC</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
