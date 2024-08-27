import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.css'; 

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleEquiposActivosClick = () => {
    navigate('/equipos-activos');
  };

  const handleEquiposObsoletosClick = () => {
    navigate('/equipos-obsoletos');
  };

  const handleAñadirEquipoClick = () => {
    navigate('/añadir-equipo');
  };

  const handleMantenimientosPendientesClick = () => {
    navigate('/mantenimientos-pendientes');
  };

  const handleMantenimientosRealizadosClick = () => {
    navigate('/mantenimientos-realizados');
  };

  const handleProgramarMantenimientoClick = () => {
    navigate('/programar-mantenimiento');
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="EQUIPOS" id="basic-nav-dropdown" className="nav-item-custom">
              <NavDropdown.Item onClick={handleEquiposActivosClick}>Equipos Activos</NavDropdown.Item>
              <NavDropdown.Item onClick={handleEquiposObsoletosClick}>Equipos Obsoletos</NavDropdown.Item>
              <NavDropdown.Item onClick={handleAñadirEquipoClick}>Añadir Equipo</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="MANTENIMIENTOS" id="basic-nav-dropdown" className="nav-item-custom">
              <NavDropdown.Item onClick={handleMantenimientosPendientesClick}>Mantenimientos Pendientes</NavDropdown.Item>
              <NavDropdown.Item onClick={handleMantenimientosRealizadosClick}>Mantenimientos Realizados</NavDropdown.Item>
              <NavDropdown.Item onClick={handleProgramarMantenimientoClick}>Programar Mantenimiento</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} className="nav-item-custom">CERRAR SESIÓN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;