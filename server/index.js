const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
require('dotenv').config();
const { CONNECTION_STRING, SERVER_PORT : PORT, SESSION_SECRET} = process.env;


//CONTROLLERS
const adc = require('./controllers/adminController.js');
const ac = require('./controllers/authController.js');
const cc = require('./controllers/cartController.js');
const oc = require('./controllers/orderController');
const pc = require('./controllers/photosController.js');

const app = express();


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

//ADMIN
app.get('/admin/orders', adc.getOrders)

//AUTH
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);

//CART
app.post('/cart', cc.addToCart);
app.get('/cart', cc.getCart);
app.delete('/cart/:id', cc.deleteFromCart);

//ORDER
app.post("/charge", oc.charge);
app.post('/order', oc.process);

//PHOTO
app.get('/api/photos/:letter/:letterCount', pc.getPhoto)

app.listen(PORT, () => {
    console.log('never go full retard', PORT)
})