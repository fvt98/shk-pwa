import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [auth, setAuth] = useState(false); //Variable ob eingeloggt
    const [name, setName] = useState(''); //Variable vom Name(User)
    const [message, setMessage] = useState(''); //Variable für Message

    axios.defaults.withCredentials = true;

    /**
     * Überprüfen ob User aktuell eingeloggt ist
     * -> entsprechend setzen der auth Variable
     */
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            } else {
                setAuth(false);
                setMessage(res.data.Message);
            }
        })
    }, []);

    /**
     * Wenn logout button genutzt wird wird Anfrage an Backend geschickt 
     * -> Hanling vom Logout im Backend
     * -> anschlißend Seite neuladen um Änderungen zu übernehemn bei Erfolg
     */
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            if(res.data.Status === "Success"){
                window.location.reload(true);
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