import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomNavbar from '../Navbar';
//import './Equipo.css'; 

const Equipo = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/equipments/${id}`)
      .then(response => {
        setEquipo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Desea dar de baja este equipo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/equipments/${id}`)
          .then(response => {
            Swal.fire(
              'El equipo ha sido dado de baja.',
              'success'
            );
            navigate('/equipos-obsoletos/agregar', { state: { eqName: equipo.eqName, eqCode: equipo.eqCode } });
          })
          .catch(error => {
            console.error('Error deleting data:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al dar de baja el equipo.',
              'error'
            );
          });
      }
    });
  };

  const handleScheduleMaintenance = () => {
    navigate('/programar-mantenimiento', { state: { eqName: equipo.eqName, eqCode: equipo.eqCode } });
  };

  const handleModify = () => {
    navigate(`/modificar-equipo/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-100">
          <h1 className="text-center mb-4">{equipo.eqName}</h1>
          <p><strong>Código:</strong> {equipo.eqCode}</p>
          <p><strong>Fecha de ingreso:</strong> {formatDate(equipo.inDate)}</p>
          <p><strong>Punto de ingreso:</strong> {equipo.inPoint}</p>
          <p><strong>Descripción:</strong> {equipo.eqDescription}</p>
          <p><strong>Origen:</strong> {equipo.eqOrigen}</p>
          <p><strong>Responsable:</strong> {equipo.inResponsible}</p>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-danger" onClick={handleDelete}>Dar de baja</button>
            <button className="btn btn-primary" onClick={handleScheduleMaintenance}>Programar mantenimiento</button>
            <button className="btn btn-secondary" onClick={handleModify}>Modificar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipo;