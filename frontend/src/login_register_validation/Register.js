import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Validation from "./RegisterValid";
import dogPhoto from "../assets/dog-photo-login.jpg";

function Register() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: Validation({ ...values, [name]: value })[name],
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8001/users/register", values)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container main">
      <div className="row register-row">
        <div
          className="col-md-6 left-section"
          style={{ backgroundImage: `url(${dogPhoto})` }}
        ></div>

        <div className="col-md-6 right-section">
          <form onSubmit={handleSubmit}>
            <div className="inside-form"> 
              <h1>Rejestracja</h1>

              <div className="input-box">
                <input id="name" name="name" onChange={handleInput} required />
                <label htmlFor="name">Imie</label>
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>

              <div className="input-box">
                <input id="surname" name="surname" onChange={handleInput} required />
                <label htmlFor="surname">Nazwisko</label>
                {errors.surname && (
                  <div className="text-danger">{errors.surname}</div>
                )}
              </div>

              <div className="input-box">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="email">Adres email</label>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="input-box">
                <input id="phone" name="phone" onChange={handleInput} required />
                <label htmlFor="phone">Numer telefonu</label>
                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
              </div>

              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="password">Hasło</label>
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              <div className="input-box">
                <button type="submit" className="submit-btn">Zarejestruj</button>
              </div>

              <div className="register">
              <p style={{ color: "#393f81" }}>
                Masz już konto? <a href="/login" style={{ color: "#393f81" }}>Zaloguj się!</a>
              </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
