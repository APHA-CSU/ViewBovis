import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logo from "../../imgs/APHA_logo_svg.svg";
import { useEffect, useRef } from "react";
import { setNavbarHeight } from "../../features/counter/securitySlice";
import { useDispatch } from "react-redux";
const NavbarComp = () => {
  const navbarRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const navbarObserver = new ResizeObserver(() => {
      if (navbarRef?.current?.offsetHeight) {
        dispatch(setNavbarHeight(navbarRef.current.offsetHeight));
      }
    });
    navbarObserver.observe(navbarRef.current);

    return () => {
      navbarObserver.disconnect();
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbarcomp" ref={navbarRef}>
      <Container fluid>
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="APHA_logo"
            height="50px"
            width="50px"
            loading="lazy"
          />
        </a>
        <Navbar.Brand id="nav-main-title">
          <strong>ViewBovis [Official Sensitive]</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <div>
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
            </div>
            <div>
              <Nav.Link as={NavLink} to="/cattlemovement">
                Cattle Movement
              </Nav.Link>
            </div>
            <div>
              <Nav.Link as={NavLink} to="/snpmap">
                SNP Map
              </Nav.Link>
            </div>
            <div>
              <Nav.Link as={NavLink} to="/nextstrain">
                Nextstrain
              </Nav.Link>
            </div>
            <div>
              <Nav.Link as={NavLink} to="/helpsupport">
                Help and Support
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <a
          className="text-end text-decoration-underline text-hyperlink px-3"
          href="https://hosting.int.sce.network/global-protect/logout.esp?code=0"
          target="_self"
        >
          Log out
        </a>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
