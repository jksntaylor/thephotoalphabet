const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const { CONNECTION_STRING, SERVER_PORT : PORT, SESSION_SECRET} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("i'm a lead farmer mothafucka");
})

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.listen(PORT, () => {
    console.log('never go full retard', PORT)
})