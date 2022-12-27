import React from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import { useState } from 'react';
import { useEffect } from 'react'
import logo from '../assets/Logo.png';
import '../styles/Card.css';

export default function Form() {
    
    const email = { email: ""}
    const [formValues, setFormValues] = useState(email);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSumbit] = useState(false);


    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({ ...formValues, [name]: value});
      console.log(formValues);
    }  

    const handleSumbit = (e) =>{
      e.preventDefault();
      axios.post(env.API_URL,  setFormErrors(validate(formValues)))
      setIsSumbit(true);
     }

    useEffect (() => {
      console.log(formErrors)
      if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
      }
    })
    const validate = (values) => {
        const errors = {}
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!values.email){
          errors.email = "El correo es requerido";
        } else if (!regex.test(values.email)) {
          errors.email = "El correo no es valido";

        } 
        return errors;

    }

    return (
      <div>
        {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='message-success'>Te registrarte de forma exitosa</div>) : ''}
        <div className='card'>
        <h1 className='title'>ESCIHU WIZARDS</h1>
        <img src={logo} alt="Logo Escihu Wizards" className='logo'/>
        <p className='text-info'>Coloca el correo de tu cuenta de Github</p>
        <form onSubmit={handleSumbit} className="formData">
          <label>
            <input type="text" name="email" onChange={handleChange} className='input' />
            {Object.keys(formErrors).length > 0 ? ( <p className='errors'>{formErrors.email}</p>) : ''}
          </label>
          <button type="submit" className='send'> Ingresar</button>
        </form>
      </div>
      </div>
      
    )
  
}