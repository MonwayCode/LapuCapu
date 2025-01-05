import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

function Navbar() {
  const { userId, logout } = useGlobalContext();
  const  navigate  = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }
  
  return (
    <header>
      <div className="header-container">
        <div className="app-name">
          <NavLink to="/">Łapu Capu</NavLink>
        </div>
        <div className="header-div">
          <ol className="header-list">
            <li>
              <NavLink to="/">Strona Główna</NavLink>
            </li>
            <li>
              <NavLink to="/adoptions">Adopcje</NavLink>
            </li>
            <li>
              <NavLink to="/events">Wydarzenia</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Kontakt</NavLink>
            </li>
          </ol>

            {!userId ? (
            <button className="btn add-btn" onClick={handleLogin}>
              Zaloguj
            </button>
          ) : (
            <button className="btn add-btn" onClick={logout}>Wyloguj</button>
          )}


          
        </div>
      </div>
    </header>
  );
}

export default Navbar;
