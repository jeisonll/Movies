import React,{Component} from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

class Menu extends Component {
  render() {

    return (
      <div >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/Movies"><img src="https://cuevana3.io/wp-content/themes/cuevana3/public/img/cnt/cuevana3.png" alt="logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Movies">Inicio</Nav.Link>
              <NavDropdown title="Generos" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1/">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Peliculas" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/admin">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Series" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1/">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export  default Menu;