import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../Navbar';
import './Equipos.css'; 

const EquiposObsoletos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eqName, eqCode } = location.state || {};

  const [obDate, setObDate] = useState('');
  const [obReason, setObReason] = useState('');
  const [depositPlace, setDepositPlace] = useState('');
  const [eqResponsible, setEqResponsible] = useState('');

  const handleCreateObsolete = () => {
    const newObsolete = {
      eqName,
      eqCode,
      obDate,
      obReason,
      depositPlace,
      eqResponsible,
    };

    axios.post('http://localhost:8000/api/obsoletes', newObsolete)
      .then(response => {
        console.log('Objeto obsoleto creado:', response.data);
        navigate('/equipos-obsoletos');
      })
      .catch(error => {
        console.error('Error creando objeto obsoleto:', error);
      });
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-100">
          <h1 className="text-center mb-4">EQUIPO OBSOLETO</h1>
          <p><strong>Nombre:</strong> {eqName}</p>
          <p><strong>Código:</strong> {eqCode}</p>
          <div className="mb-3">
            <label className="form-label">Fecha de baja:</label>
            <input type="date" className="form-control" value={obDate} onChange={(e) => setObDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Razón de baja:</label>
            <input type="text" className="form-control" value={obReason} onChange={(e) => setObReason(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Lugar de destino:</label>
            <input type="text" className="form-control" value={depositPlace} onChange={(e) => setDepositPlace(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Responsable:</label>
            <input type="text" className="form-control" value={eqResponsible} onChange={(e) => setEqResponsible(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleCreateObsolete}>Dar de Baja</button>
        </div>
      </div>
    </div>
  );
};

export default EquiposObsoletos;