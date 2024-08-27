import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomNavbar from '../Navbar';
import './Equipos.css';

const ListaObsoletos = () => {
  const [obsoletos, setObsoletos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/obsoletes')
      .then(response => {
        setObsoletos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
      <div className="containerObsoletos  d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-100">
          <h1 className="text-center mb-4">EQUIPOS OBSOLETOS</h1>
          <ul className="list-group">
            {obsoletos.map((obsoleto, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Nombre:</strong> {obsoleto.eqName}</p>
                <p><strong>Código:</strong> {obsoleto.eqCode}</p>
                <p><strong>Fecha de baja:</strong> {formatDate(obsoleto.obDate)}</p>
                <p><strong>Razón de baja:</strong> {obsoleto.obReason}</p>
                <p><strong>Lugar de destino:</strong> {obsoleto.depositPlace}</p>
                <p><strong>Responsable:</strong> {obsoleto.eqResponsible}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaObsoletos;