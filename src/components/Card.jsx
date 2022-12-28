import axios from "axios";
import env from "react-dotenv";
import { useState } from "react";
import logo from "../assets/Logo.png";
import "../styles/Card.css";

export default function Form() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSumbit] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log("Correo " + e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (validate(email)) {
      console.log("Correo valido");
      setShowSuccessMessage(true);
      axios
        .post(env.API_URL, { email })
        .then((response) => {
          if (response.status === 200) {
            console.log("El registro fue exitoso");
          }
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            if (error.response.status === 400) {
              console.log("Algo salio mal");
            }
          }
        });
      setIsSumbit(isSubmit + 1);

      setTimeout(function () {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      setErrorMessage(true);
      setTimeout(function () {
        setErrorMessage(false);
      }, 3000);
    }
  };

  const validate = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("Validando " + email);
    setFormErrors("");
    if (email === "") {
      setFormErrors("El correo es requerido");
      return false;
    } else if (!emailRegex.test(email)) {
      setFormErrors("El correo no es valido");
      return false;
    }
    return true;
  };

  return (
    <div>
      {showSuccessMessage ? (
        <div className="message-success">Te registraste de forma exitosa</div>
      ) : (
        ""
      )}
      {showErrorMessage ? <p className="errors">{formErrors}</p> : ""}
      <div className="card">
        <h1 className="title">ESCIHU WIZARDS</h1>
        <img src={logo} alt="Logo Escihu Wizards" className="logo" />
        <p className="text-info">Coloca el correo de tu cuenta de Github</p>
        <form onSubmit={handleSumbit} className="formData">
          <label>
            <input
              type="text"
              name="email"
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
    </div>
  );
}
