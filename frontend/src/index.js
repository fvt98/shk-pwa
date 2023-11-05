import React from "react";
import {createRoot} from 'react-dom/client'


import "./css/index.css";
import "./css/App.css"

import App from './App';

/**
 * Erstellen der React-Anwendung
 */
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);