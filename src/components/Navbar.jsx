import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">My Events</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavLink to="/" isActive={({ isActive }) => (isActive ? "active" : "")}>
          Events
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
