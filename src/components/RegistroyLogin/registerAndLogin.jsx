import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [claveAutorizacion, setClaveAutorizacion] = useState("");
  const navigate = useNavigate();
  const Autorizacion = 13579;

  const handleAutorizacion = () => {
    if (parseInt(claveAutorizacion) === Autorizacion) {
      navigate("/registro");
    } else {
      alert("Por favor, ingrese su clave de autorización correcta para registrar un nuevo usuario");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Login />
      <div className="cardAuth p-4 shadow-lg mt-4">
        <h2 className="text-center mb-4">REGISTRAR UN USUARIO</h2>
        <div className="mb-2">
          <label className="form-label">Introduzca su autorización</label>
          <input
            type="text"
            className="form-control"
            value={claveAutorizacion}
            onChange={(e) => setClaveAutorizacion(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleAutorizacion}>Registrar</button>
      </div>
    </div>
  );
};

export default Home;