import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomNavbar from '../Navbar'; 

const ListaMantenimientosRealizados = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        <h1 className="text-center mb-4">MANTENIMIENTOS REALIZADOS</h1>
        <div className="list-group">
          {reports.map((report, index) => (
            <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{report.eqName}</h5>
                <small>{formatDateTime(report.mainDate, report.mainTime)}</small>
              </div>
              <p className="mb-1"><strong>Código:</strong> {report.eqCode}</p>
              <p className="mb-1"><strong>Duración:</strong> {report.mainDuration}</p>
              <p className="mb-1"><strong>Descripción:</strong> {report.mainDescription}</p>
              <p className="mb-1"><strong>Responsable:</strong> {report.mainResponsible}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaMantenimientosRealizados;