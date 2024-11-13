import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './login_register_validation/Login';
import Register from './login_register_validation/Register';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
