import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./home.js";
import About from './testsite.js';
import WeatherApp from "./weatherApp.js";
import Login from "./Login.js";
import Signup from "./Signup.js";

import portrait from "./img/user.png";

const App = () => {
    const [open, setOpen] = useState(false); //Variablen ob Navbar offen/geschlossen ist
    const [isLoggedIn, setIsLoggedIn] = useState(false); //Variablen ob User eingeloggt ist

    let menuRef = useRef(); 

    /**
     * Setzen das Navbar geschlossen wird wenn man außerhalb der Navbar klickt
     */
    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [menuRef]);

    /**
     * Überprüfen ob User aktuell eingeloggt oder ausgeloggt ist
     * -> entsprechend setzten der isLoggedIn Variable
     */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:8081');
                if (res.data.Status === "Success") {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            <div className="App">
                {isLoggedIn && (
                    <div className="menu-container" ref={menuRef}>
                        <div className="menu-trigger" onClick={() => { setOpen(!open) }}>
                            <img alt={""} src={portrait}></img>
                        </div>

                        <div className={`dropdown-menu  ${open ? 'active' : 'inactive'}`} onClick={() => { setOpen(false) }}>
                            <h3>TestName<br /><span>Website-Test</span></h3>
                            <ul>
                                <li className="dropdownItem">
                                    <Link to="/home">Home</Link>
                                </li>
                                <li className="dropdownItem">
                                    <Link to="/weatherApp">Weather App</Link>
                                </li>
                                <li className="dropdownItem">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="dropdownItem">
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/weatherApp" element={<WeatherApp />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/*" element={<Navigate to="/home" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    )
}

export default App;