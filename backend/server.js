const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Server App für Datenbank übermittlung
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000','https://api.openweathermap.org/data/2.5/weather'],
        methods: [ "POST", "GET"],
        credentials: true
    }
));

//Datenbank verbindung erstellen
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

//Methode zum Überprüfen ob User eingeloggt ist -> einen aktiven Token(Cookie) hat
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: "we need token please provide it."});
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if(err){
                return res.json({Message: "Authentification Error!"});
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

/**
 * Nach dem einloggen -> weiterleitung auf Home/Dashboard übersicht Seite
 * -> prüfen ob User eingeloggt ist -> zurückgeben von Success Status und Name(von Nutzer)
 */
app.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
})

/**
 * Aufruf durch signup-Seite -> übermitteln der eingegeben Daten in die DB
 * -> vorher Hashen des Passworts
 */
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,username,password) VALUES (?, ?, ?)";
    const name = req.body.name;
    const username = req.body.username;
    const plainTextPassword = req.body.password;

    bcrypt.hash(plainTextPassword, 10, (hashErr, hashedPassword) => {
        if(hashErr) {
            res.status(500).send({message: "Error hashing password!"});
        } else {
            db.query(sql, [name, username, hashedPassword], (err, data) => {
                if (data) {
                    res.send(data);
                }else{
                    res.send({message: "Enter Correct Asked Details!"})
                }
            });
        }
    });
});

/**
 * Aufruf durch login-Seite -> raussuchen der Daten aus DB 
 * -> basierend auf übermittelten Daten von Login-Formular
 * -> Anschließend setzten des Token(Cookie)
 */
app.post('/login', (req, res) => {
    const username = req.body.username;
    const plainTextPassword = req.body.password;

    const sql = "SELECT * FROM login WHERE username = ?";
    db.query(sql, [username], (err, data) => {
        if(err) return res.json({Message: "Server Side Error"});
        
        if(data.length > 0) {
            const hashedPassword = data[0].password; // Gehashtes Passwort aus der Datenbank abrufen
            bcrypt.compare(plainTextPassword, hashedPassword, (compareErr, result) => {
                if(compareErr) {
                    return res.status(500).send({ message: "Error comparing passwords" });
                }
                if (result) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Message: "Invalid username or password" });
                }
            });
        } else {
            return res.json({ Message: "No Records existed" });
        }
    });
});

/**
 * Aufruf durch logout-button auf der Home-Seite
 * -> löschen des aktuellen Cookie
 */
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

//Nachricht das Server läuft nach 'npm start'
app.listen(8081, () => {
    console.log("listening");
})