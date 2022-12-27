import axios from "axios";
import env from "react-dotenv";
import { useState } from "react";
import logo from "../assets/Logo.png";
import "../styles/Card.css";

export default function Form() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSumbit] = useState(0);

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log("Correo " + e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (validate(email)) {
      console.log("Correo valido");
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
    }
  };

  const validate = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="message-success">Te registrarte de forma exitosa</div>
      ) : (
        ""
      )}
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
            {Object.keys(formErrors).length > 0 ? (
              <p className="errors">{formErrors}</p>
            ) : (
              ""
            )}
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
