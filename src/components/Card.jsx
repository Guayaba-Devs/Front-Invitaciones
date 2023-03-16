import React, { useState } from 'react';
import axios from 'axios';
import emailValidator from 'email-validator';
import Swal from 'sweetalert2';

import logo from "../assets/Logo.png";
import "../styles/Card.css";

const Card = ({ orgName, token}) => {
  const [correo, setCorreo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validar que el correo es válido
    if (!emailValidator.validate(correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo electrónico proporcionado no es válido.',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    // Generar la solicitud para enviar la invitación
    const requestConfig = {
      method: 'POST',
      url: `https://api.github.com/orgs/${orgName}/invitations`,
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        email: correo,
        role: process.env.REACT_APP_MEMBER
      }
    };

    // Enviar la solicitud para enviar la invitación
    axios(requestConfig)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `La invitación se envió correctamente a ${correo}.`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error al enviar la invitación a ${correo}: ${error.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      });
  };

  const handleChange = (event) => {
    setCorreo(event.target.value);
  };

  return (
    <div className="card">
        <h1 className="title">ESCIHU WIZARDS</h1>
        <img src={logo} alt="Logo Escihu Wizards" className="logo" />
        <p className="text-info">Coloca el correo de tu cuenta de Github</p>
        <form onSubmit={handleSubmit} className="formData">
          <label>
            <input
              type="text"
              name="email"
              value={correo}
              onChange={handleChange}
              className="input"
            />
          </label>
          <button type="submit" className="send">
            {" "}
            Ingresar
          </button>
        </form>
      </div>
  );
};

export default Card;