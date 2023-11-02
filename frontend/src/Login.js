import React,{ useState} from 'react'
import "./css/login.css"
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const containerStyle = {
    backgroundColor: '#f1f1f1'
};

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/home');
            } else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <form action='' onSubmit={handleSubmit}>
            <div className='container'>
                <h2>Login</h2>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username'
                onChange={handleInput} name='username' required />

                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password'
                onChange={handleInput} name='password' required />

                <button type='submit'>Login</button>
            </div>

            <div className="container" style={containerStyle}>
                <button type="button" className="cancelbtn">Cancel</button>
                <Link to="/signup" className="registerbtn">Create Account</Link>
            </div>
        </form>
    );
};

export default Login;