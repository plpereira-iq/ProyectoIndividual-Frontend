import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../Navbar';

const ModificarEquipo = () => {
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

  const handleUpdate = () => {
    axios.put(`http://localhost:8000/api/equipments/${id}`, equipo)
      .then(response => {
        console.log('Equipo actualizado:', response.data);
        navigate('/equipos-activos');
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-lg w-75">
          <h1 className="text-center mb-4">Modificar Equipo</h1>
          <div className="mb-3">
            <label className="form-label">Nombre del Equipo:</label>
            <input type="text" className="form-control" name="eqName" value={equipo.eqName || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Código del Equipo:</label>
            <input type="text" className="form-control" name="eqCode" value={equipo.eqCode || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Ingreso:</label>
            <input type="date" className="form-control" name="inDate" value={equipo.inDate || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Punto de Ingreso:</label>
            <input type="text" className="form-control" name="inPoint" value={equipo.inPoint || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <input type="text" className="form-control" name="eqDescription" value={equipo.eqDescription || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Origen:</label>
            <input type="text" className="form-control" name="eqOrigen" value={equipo.eqOrigen || ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Responsable:</label>
            <input type="text" className="form-control" name="inResponsible" value={equipo.inResponsible || ''} onChange={handleChange} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleUpdate}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};

export default ModificarEquipo;