import React from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import '../styles/Card.css';

export default class NewUser extends React.Component {
  state = {
    form:{
      "email":""
    },
    error:false,
    errorMsg:""
  }

  handleChange = async event => {
     await this.setState({ 
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    });
    console.log(this.state.form)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/users/add`,  this.state.form)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div className='card'>
        <h1 className='title'>ESCIHU WIZARDS</h1>
        <img src={logo} alt="Logo Escihu Wizards" className='logo'/>
        <p className='text-info'>Coloca el correo de tu cuenta de Github</p>
        <form onSubmit={this.handleSubmit} className="formData">
          <label>
            <input type="text" name="email" onChange={this.handleChange} className='input' />
          </label>
          <button type="submit" className='send'> Ingresar</button>
        </form>
      </div>
    )
  }
}