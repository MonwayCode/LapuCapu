import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Validation from "./LoginValid";
import dogPhoto from "../assets/dog-photo-login.jpg";

function Login() {
  const [values, setValues] = useState({
    email: "",
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
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8001/users/login", values)
        .then((res) => {
          if (res.data.error === null) {
            window.localStorage.setItem("userId", res.data.userId);
            navigate("/");
          } else {
            alert("NIe poprawny mail lub hasło. Spróbuj ponownie!");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container main">
      <div className="row">
        <div
          className="col-md-6 left-section"
          style={{ backgroundImage: `url(${dogPhoto})` }}
        ></div>
        <div className="col-md-6 right-section">
          <form onSubmit={handleSubmit}>
            <div className="inside-form">
              <h1>Logowanie</h1>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="email">Adres email</label>
                {errors.email && (
                  <div className="text-danger" style={{ marginBottom: "10px" }}>
                    {errors.email}
                  </div>
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
                  <div className="text-danger" style={{ marginBottom: "10px" }}>
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="input-box">
                <button type="submit" className="submit-btn">
                  Zaloguj
                </button>
              </div>

              <div className="register">
                <p className="mb-0 " style={{ color: "#393f81" }}>
                  Nie masz jeszcze konta?{" "}
                  <a href="/registration" style={{ color: "#393f81" }}>
                    Zarejestruj się!
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
