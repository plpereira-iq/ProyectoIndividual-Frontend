import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterandLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginMessage === 'Login exitoso.') {
      navigate('/inicio-tareas');
    }
  }, [loginMessage, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      userMail,
      userPassword,
    };

    axios.post('http://localhost:8000/api/users/login', loginData)
      .then(response => {
        if (response.data.exists) {
          setLoginMessage('Login exitoso.');
        } else {
          setLoginMessage('Correo o contraseña incorrectos.');
        }
      })
      .catch(error => {
        console.error('Error en el login:', error);
        setLoginMessage('Error en el login.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">INICIAR SESIÓN</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input type="email" className="form-control" value={userMail} onChange={(e) => setUserMail(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Contraseña:</label>
            <input type="password" className="form-control" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
          </div>
          {loginMessage && <p className="text-center">{loginMessage}</p>}
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;