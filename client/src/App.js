import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "reactstrap";

function App() {
  return (
    <>
      <Navbar color="info" expand="md">
        <Nav navbar>
          <NavbarBrand href='/'>💈 Hillary's Hair Care</NavbarBrand>
          <NavItem>
            <NavLink href='/appointments'>Appointments</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Services'>Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Stylists'>Stylists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Customers'>Customers</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

export default App;
