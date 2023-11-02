import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMEssage] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            } else {
                setAuth(false);
                setMEssage(res.data.Message);
            }
        })
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/');
            } else {
                alert("error");
            }
        }).catch(err => console.log(err));
    }

    return(
        <div>
            <h1>Welcome to our Site</h1>
            {
                auth ?
                <div>
                    <h3>You are Authorized {name}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login now</h3>
                    <Link to="/login">Login</Link>
                </div>
            }
        </div>
    );
};

export default Home;