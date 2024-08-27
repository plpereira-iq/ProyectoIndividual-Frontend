import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(userMail)) {
      setErrorMessage('El correo electrónico no es válido.');
      return;
    }

    if (userPassword.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (userPassword !== confirmUserPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      userName,
      userMail,
      userPassword,
    };

    axios.post('http://localhost:8000/api/users', userData)
      .then(response => {
        console.log('Usuario registrado:', response.data);
        setErrorMessage('');
        navigate('/');
      })
      .catch(error => {
        console.error('Error registrando usuario:', error);
        setErrorMessage('Error registrando usuario.');
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="cardRegister p-4 shadow-lg custom-card">
        <h1 className="text-center mb-4">REGISTRO</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario:</label>
            <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input type="email" className="form-control" value={userMail} onChange={(e) => setUserMail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input type="password" className="form-control" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar contraseña:</label>
            <input type="password" className="form-control" value={confirmUserPassword} onChange={(e) => setConfirmUserPassword(e.target.value)} required />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;