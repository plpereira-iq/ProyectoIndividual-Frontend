import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../Navbar'; 
import './Equipos.css';

const AñadirEquipo = () => {
  const [eqName, setEqName] = useState('');
  const [eqCode, setEqCode] = useState('');
  const [inDate, setInDate] = useState('');
  const [inPoint, setInPoint] = useState('');
  const [eqDescription, setEqDescription] = useState('');
  const [eqOrigen, setEqOrigen] = useState('');
  const [inResponsible, setInResponsible] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    const newEquipo = { eqName, eqCode, inDate, inPoint, eqDescription, eqOrigen, inResponsible };
    axios.post('http://localhost:8000/api/equipments', newEquipo)
      .then(response => {
        console.log('Equipo añadido:', response.data);
        navigate('/equipos-activos');
      })
      .catch(error => {
        console.error('Error añadiendo equipo:', error);
      });
  };

  return (
    <div>
      <CustomNavbar /> 
      <div className="containerAñadir d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-80"> 
          <h1 className="text-center mb-4">AÑADIR EQUIPO</h1>
          <div className="mb-3">
            <label className="form-label">Nombre del Equipo:</label>
            <input type="text" className="form-control" value={eqName} onChange={(e) => setEqName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Código del Equipo:</label>
            <input type="text" className="form-control" value={eqCode} onChange={(e) => setEqCode(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Ingreso:</label>
            <input type="date" className="form-control" value={inDate} onChange={(e) => setInDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Punto de Instalación:</label>
            <input type="text" className="form-control" value={inPoint} onChange={(e) => setInPoint(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <input type="text" className="form-control" value={eqDescription} onChange={(e) => setEqDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Origen:</label>
            <input type="text" className="form-control" value={eqOrigen} onChange={(e) => setEqOrigen(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Responsable:</label>
            <input type="text" className="form-control" value={inResponsible} onChange={(e) => setInResponsible(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleAdd}>Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default AñadirEquipo;