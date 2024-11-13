import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Validation from './LoginValid';

function Login ()
{
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: Validation({ ...values, [name]: value })[name] }));
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === "")
        {
            axios.post('http://localhost:8001/users/login', values).then(res => {
                if(res.data.error === null)
                {
                    window.localStorage.setItem("userId",res.data.userId);
                    navigate('/');
                }
                else
                {
                    alert("NIe poprawny mail lub hasło. Spróbuj ponownie!")
                }
            }).catch(err => console.log(err));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Logowanie</h1>
                <div>
                    <input type="email" name="email" id="email" onChange={handleInput} />
                    <label htmlFor='email'>Adres email</label>
                    {errors.email && <div className='text-danger'>{errors.email}</div>}
                </div>
                <div>
                    <input type="password" id="password" name="password" onChange={handleInput} />
                    <label htmlFor="password">Hasło</label>
                    {errors.password && <div className='text-danger'>{errors.password}</div>}
                </div>
                <div>
                    <button type="submit">
                        Zaloguj
                    </button>
                </div>
            
                <p className="mb-0 " style={{ color: '#393f81' }}> 
                    Nie masz jeszcze konta? <a href="/registration" style={{ color: '#393f81' }}>Zarejestruj się!</a>
                </p>
            </div>
        </form>

    );
}

export default Login;
