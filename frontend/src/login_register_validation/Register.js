import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Validation from './RegisterValid'; 


function Register ()
{
    const [values, setValues] = useState({
        name : '',
        surname : '',
        email : '',
        phone : '',
        password : ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const {name, value} = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: Validation({ ...values, [name]: value })[name] }));
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();  
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "")
        {
            axios.post('http://localhost:8001/users/register',values).then(res => {
                navigate('/login')
            }).catch(err => console.log(err));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div >
                    <h1 >Rejestracja</h1>

                    <div >
                        <input id="name" name="name" onChange={handleInput}/>
                        <label htmlFor="name">Imie</label>
                        {errors.name && <div className='text-danger'>{errors.name}</div>}
                    </div>

                    <div >
                        <input id="surname" name="surname"  onChange={handleInput}/>
                        <label htmlFor="surname">Nazwisko</label>
                        {errors.surname && <div className='text-danger'>{errors.surname}</div>}
                    </div>

                    <div >
                        <input type="email" id="email" name="email"onChange={handleInput}/>
                        <label htmlFor="email">Adres email</label>
                        {errors.email && <div className='text-danger'>{errors.email}</div>}
                    </div>

                    <div >
                        <input id="phone" name="phone" onChange={handleInput}/>
                        <label htmlFor="phone">Numer telefonu</label>
                        {errors.phone && <div className='text-danger'>{errors.phone}</div>}
                    </div>

                    <div >
                        <input type="password" id="password" name="password" onChange={handleInput}/>
                        <label htmlFor="password">Hasło</label>
                        {errors.password && <div className='text-danger'>{errors.password}</div>}
                    </div>

                    <div >
                        <button type="submit" >
                            Zarejestruj
                        </button>
                    </div>
                    
                    <p > 
                        Masz już konto? <a href="/login" >Zaloguj się!</a>
                    </p>
            </div>
        </form>
    );
}

export default Register;
