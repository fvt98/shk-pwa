import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./home.js";
import About from './testsite.js';
import WeatherApp from "./weatherApp.js";
import Login from "./Login.js";
import Signup from "./Signup.js";

import portrait from "./img/user.png";

const App = () => {
    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler= (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown",handler);

        return() => {
            document.removeEventListener("mousedown",handler);
        }
    });

    return (
        <Router>
            <div className="App">
                <div className="menu-container" ref={menuRef}>
                    <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                        <img alt={""} src={portrait}></img>
                    </div>

                    <div className={`dropdown-menu  ${open? 'active' : 'inactive'}` } onClick={()=>{setOpen(false)}}>
                        <h3>TestName<br /><span>Website-Test</span></h3>
                        <ul>
                            <li className="dropdownItem">
                                <Link to="/">Home</Link>
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
                
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/home" exact element={<Home />} />

                    <Route path="/weatherApp" exact element={<WeatherApp />} />

                    <Route path="/login" exact element={<Login />}/>
                    <Route path="/signup" exact element={<Signup />}/>

                    <Route path="/about" exact element={<About />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;