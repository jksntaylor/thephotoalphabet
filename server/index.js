const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
require('dotenv').config();
const pc = require('./controllers/photosController');
const ac = require('./controllers/authController.js');
const cc = require('./controllers/cartController.js');

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

app.get('/api/photos/:letter/:letterCount', pc.getPhoto)

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);

app.post('/cart', cc.addToCart);
app.get('/cart', cc.getCart);
app.delete('/cart/:id', cc.deleteFromCart);

app.listen(PORT, () => {
    console.log('never go full retard', PORT)
})