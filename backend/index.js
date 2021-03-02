const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = 5000;

app.use( bodyParser.json());
app.use(cors());

app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());

require("dotenv").config();

console.log(process.env['SOCKET_PATH'])

// CONNECTING TO MYSQL DATABASE
const db = mysql.createConnection({
    user: "root", //process.env.DB_HOST,
    host: "localhost",  //process.env.DB_USER,
    password: "Opendoors744784", //process.env.DB_PASSWORD,
    database: "practice" //process.env.DB,
});


// POST USER TO DB
app.post('/create', (req, res) => {
    console.log(req.body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;

    db.query("INSERT INTO users (fname, lname, age) VALUES (?, ?, ?)", 
    [fname, lname, age]), (err, res) => {            // Use ? for values then array and the items that the ? equals
        if(err){
            console.log(err)
        }else{
            res.send("Values Inserted")
        }
    }
})


// GET USERS FROM DB
app.get('/users', (req, res) => {
    db.query("SELECT * FROM users",
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});


// DELETE USER FROM DB
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM users WHERE id = ?", id,
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
})


// UPDATE USER INSIDE OF DB
app.put('/update', (req, res) => {
    const id = req.body.id
    const age = req.body.age
    db.query("UPDATE users SET age = ? WHERE id = ?", [age, id], (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})


app.get("/", (req,res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log("port is listening: " + port);
})
