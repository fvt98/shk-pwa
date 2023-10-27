import React, { useState } from 'react'
import "./css/login.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const containerStyle = {
    backgroundColor: '#f1f1f1'
};

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));

    }

    return (
        <form action='' onSubmit={handleSubmit}>
            <div className='container'>
                <h2>Sign up</h2>
                <label htmlFor='name'>Name</label>
                <input type='text' placeholder='Enter Name'
                    onChange={handleInput} name='name' required />

                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username'
                    onChange={handleInput} name='username' required />

                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password'
                    onChange={handleInput} name='password' required />

                <button type='submit'>Sign up</button>
            </div>

            <div className="container" style={containerStyle}>
                <button type="button" className="cancelbtn">Cancel</button>
                <Link to="/login" className="registerbtn">Login</Link>
            </div>
        </form>
    );
};

export default Signup;