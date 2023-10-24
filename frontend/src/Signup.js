import React from 'react'
import "./css/login.css"
import {Link} from 'react-router-dom';

const containerStyle = {
    backgroundColor: '#f1f1f1'
};

const Signup = () => {
    return (
        <form action=''>
            <div className='container'>
                <h2>Sign up</h2>
                <label htmlFor='name'>Name</label>
                <input type='text' placeholder='Enter Name' name='name' required />
                
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username' name='username' required />

                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' name='password' required />

                <button type='submit'>Sign up</button>
            </div>

            <div class="container" style={containerStyle}>
                <button type="button" class="cancelbtn">Cancel</button>
                <Link to="/login" class="registerbtn">Login</Link>
            </div>
        </form>
    );
};

export default Signup;