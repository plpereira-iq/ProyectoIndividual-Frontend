import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../Navbar';
import './Mantenimiento.css'; 

const ProgramarMantenimiento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eqName: unEquipoEqName, eqCode: unEquipoEqCode } = location.state || {};
  const [eqName, setEqName] = useState(unEquipoEqName || '');
  const [eqCode, setEqCode] = useState(unEquipoEqCode || '');
  const [mainDate, setMainDate] = useState('');
  const [mainTime, setMainTime] = useState('');
  const [mainDuration, setMainDuration] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [mainResponsible, setMainResponsible] = useState('');

  const handleSchedule = () => {
    const newMaintenance = {
      eqName,
      eqCode,
      mainDate,
      mainTime,
      mainDuration,
      mainDescription,
      mainResponsible
    };

    axios.post('http://localhost:8000/api/maintenances', newMaintenance)
      .then(response => {
        console.log('Mantenimiento programado:', response.data);
        return axios.post('http://localhost:8000/api/email/send-email', newMaintenance);
      })
      .then(response => {
        console.log('Correo enviado:', response.data);
        navigate('/mantenimientos-pendientes');
      })
      .catch(error => {
        console.error('Error programando mantenimiento o enviando correo:', error);
      });
  };

  return (
    <div>
      <CustomNavbar />
      <div className="containerProgramar d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-100">
          <h1 className="text-center mb-4">PROGRAMAR MANTENIMIENTO</h1>
          <div className="mb-3">
            <label className="form-label">Nombre de Equipo:</label>
            <input type="text" className="form-control" value={eqName} onChange={(e) => setEqName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Código de Equipo:</label>
            <input type="text" className="form-control" value={eqCode} onChange={(e) => setEqCode(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de mantenimiento:</label>
            <input type="date" className="form-control" value={mainDate} onChange={(e) => setMainDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Hora de mantenimiento:</label>
            <input type="text" className="form-control" value={mainTime} onChange={(e) => setMainTime(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Duración de mantenimiento:</label>
            <input type="text" className="form-control" value={mainDuration} onChange={(e) => setMainDuration(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción del mantenimiento:</label>
            <input type="text" className="form-control" value={mainDescription} onChange={(e) => setMainDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Responsable de mantenimiento:</label>
            <input type="text" className="form-control" value={mainResponsible} onChange={(e) => setMainResponsible(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleSchedule}>Programar</button>
        </div>
      </div>
    </div>
  );
};

export default ProgramarMantenimiento;