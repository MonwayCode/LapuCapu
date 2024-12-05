import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar()  {
  return (
    <header>
        <div className='header-container'>
            <div className='app-name'>
            <NavLink to="/">Łapu Capu</NavLink>
            </div>
            <div className='header-div'>
                <ol className='header-list'>
                    <li>
                        <NavLink to="/">Strona Główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events">Wydarzenia</NavLink>
                    </li>
                </ol>
            </div>
        </div>
    </header>
  )
}

export default Navbar
