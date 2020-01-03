const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { CONNECTION_STRING, SERVER_PORT : PORT, SESSION_SECRET} = process.env;


//CONTROLLERS
const adc = require('./controllers/adminController.js');
const ac = require('./controllers/authController.js');
const cc = require('./controllers/cartController.js');
const oc = require('./controllers/orderController');
const uc = require('./controllers/userController');

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

app.use( express.static( `${__dirname}/../build` ) );

//ADMIN
app.get('/admin/orders', adc.getOrders)

//AUTH
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);

//CART
app.post('/cart/:config', cc.addToCart);
app.get('/cart', cc.getCart);
app.delete('/cart/:id', cc.deleteFromCart);
app.get('/user/address', cc.getUserAddress);
app.post('/cart/empty', cc.emptyCart)

//ORDER
app.post("/charge", oc.charge);
app.post('/order', oc.process);
app.post('/guestorder', oc.processGuest);

//USER
app.get('/user/orders', uc.getUserOrders)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
    console.log('never go full retard', PORT)
})