import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../Navbar';

const GenerarInforme = () => {
  const { eqName, eqCode } = useParams();
  const navigate = useNavigate();

  const [mainDate, setMainDate] = useState('');
  const [mainTime, setMainTime] = useState('');
  const [mainDuration, setMainDuration] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [mainResponsible, setMainResponsible] = useState('');

  const handleSendReport = () => {
    const reportData = {
      eqName,
      eqCode,
      mainDate,
      mainTime,
      mainDuration,
      mainDescription,
      mainResponsible,
    };

    axios.post('https://proyecto-individual-backend.vercel.app/api/reports', reportData)
      .then(response => {
        console.log('Informe generado:', response.data);
        navigate('/mantenimientos-realizados');
      })
      .catch(error => {
        console.error('Error generando informe:', error);
      });
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-100">
          <h1 className="text-center mb-4">GENERAR INFORME DE MANTENIMIENTO</h1>
          <p><strong>Nombre del equipo:</strong> {eqName}</p>
          <p><strong>Código del equipo:</strong> {eqCode}</p>
          <div className="mb-3">
            <label className="form-label">Fecha de mantenimiento:</label>
            <input type="date" className="form-control" value={mainDate} onChange={(e) => setMainDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Hora de mantenimiento:</label>
            <input type="text" className="form-control" value={mainTime} onChange={(e) => setMainTime(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Duración del mantenimiento:</label>
            <input type="text" className="form-control" value={mainDuration} onChange={(e) => setMainDuration(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción del mantenimiento:</label>
            <input type="text" className="form-control" value={mainDescription} onChange={(e) => setMainDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Responsable del mantenimiento:</label>
            <input type="text" className="form-control" value={mainResponsible} onChange={(e) => setMainResponsible(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleSendReport}>Enviar informe</button>
        </div>
      </div>
    </div>
  );
};

export default GenerarInforme;