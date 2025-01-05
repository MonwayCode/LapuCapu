import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./login_register_validation/Login";
import Register from "./login_register_validation/Register";
import Events from "./Events";
import Home from "./Home";
import Animals from "./Animals";
import Navbar from "./Navbar";
import { GlobalProvider } from "./GlobalContext";
import Contact from "./Contact";

const App = () => {

  return (
    <GlobalProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/adoptions" element={<Animals />} />
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
