const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: [ "POST", "GET"],
        credentials: true
    }
));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: "we need token please provide it."});
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if(err){
                return res.json({Message: "Authentification Error."});
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,username,password) VALUES (?, ?, ?)";
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    db.query(sql, [name, username, password], (err, data) => {
        if (data) {
            res.send(data);
        }else{
            res.send({message: "Enter Correct Asked Details!"})
        }
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json({Message: "Server Side Error"});
        if(data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token',token);
            return res.json({Status: "Success"});
        } else {
            return res.json({Message: "No Records existed"});
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.listen(8081, () => {
    console.log("listening");
})