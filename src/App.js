import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Home from "./home.js";
import About from './testsite.js';
import WeatherApp from "./weatherApp.js";

const App = () => {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link>
                <p/>
                <Link to="weatherApp">weatherApp</Link>
                <p/>
                <Link to="/about">About</Link>
            </div>

            <Routes>
                <Route path="/" exact element={<Home />}/>

                <Route path="/weatherApp" exact element={<WeatherApp />}/>

                <Route path="/about" exact element={<About />}/>
            </Routes>
        </Router>
    )
}

export default App;