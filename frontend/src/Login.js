import React from 'react'
import "./css/login.css"
import {Link} from 'react-router-dom';

const containerStyle = {
    backgroundColor: '#f1f1f1'
};

const Login = () => {
    return (
        <form action=''>
            <div className='container'>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username' name='uname' required />

                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' name='psw' required />

                <button type='submit'>Login</button>
            </div>

            <div class="container" style={containerStyle}>
                <button type="button" class="cancelbtn">Cancel</button>
                <Link to="/signup" class="registerbtn">Create Account</Link>
            </div>
        </form>
    );
};

export default Login;