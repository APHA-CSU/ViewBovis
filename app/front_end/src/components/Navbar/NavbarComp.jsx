import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarComp = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ViewBovis [Official Sensitive]</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cattlemovement">Cattle Movement</Nav.Link>
            <Nav.Link href="/snpdistance">SNP Distance</Nav.Link>
            <Nav.Link href="/nextstrain">Nextstrain</Nav.Link>
            <Nav.Link href="/helpsupport">Help and Support</Nav.Link>
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