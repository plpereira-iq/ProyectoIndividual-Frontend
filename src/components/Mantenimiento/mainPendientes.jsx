import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../Navbar';
import './Mantenimiento.css'; 

const ListaMantenimientosPendientes = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/maintenances')
      .then(response => {
        setMantenimientos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInformar = (id, eqName, eqCode) => {
    axios.delete(`http://localhost:8000/api/maintenances/${id}`)
      .then(response => {
        navigate(`/informe-mantenimiento/${eqName}/${eqCode}`);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year} ${timeString}`;
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container mt-8">
        <h1 className="text-center mb-4">Mantenimientos Pendientes</h1>
        <div className="list-group">
          {mantenimientos.map((mantenimiento, index) => (
            <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{mantenimiento.eqName}</h5>
                <small>{formatDateTime(mantenimiento.mainDate, mantenimiento.mainTime)}</small>
              </div>
              <p className="mb-1"><strong>Código:</strong> {mantenimiento.eqCode}</p>
              <p className="mb-1"><strong>Duración:</strong> {mantenimiento.mainDuration}</p>
              <p className="mb-1"><strong>Descripción:</strong> {mantenimiento.mainDescription}</p>
              <p className="mb-1"><strong>Responsable:</strong> {mantenimiento.mainResponsible}</p>
              <button className="btn btn-primary mt-2" onClick={() => handleInformar(mantenimiento.id, mantenimiento.eqName, mantenimiento.eqCode)}>Informar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaMantenimientosPendientes;