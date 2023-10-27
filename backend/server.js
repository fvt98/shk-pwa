const express = require("express");
const mysql = require('mysql');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
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

app.listen(8081, () => {
    console.log("listening");
})