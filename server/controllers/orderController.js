require('dotenv').config();
const {STRIPE_SECRET_KEY} = process.env;

module.exports = {
    charge: async (req, res) => {
      const stripe = require('stripe')(STRIPE_SECRET_KEY);
      console.log('CHARGE REQ.BODY', req.body, '|||||');
      const {id, totalPrice} = req.body
      let serverPrice = totalPrice * 100
      try {
        let {status} = await stripe.charges.create({
          amount: serverPrice,
          currency: "usd",
          description: "Test Charge",
          source: id
        });
    
        res.status(200).send(status);
        
      } catch (err) {
          console.log(err)
        res.status(500).end();
      }
    },

    process: (req, res) => {
      console.log('REQ.BODY ORDERCONTROLLER', req.body, '//////')
      const db = req.app.get('db');

      const {address, address2, city, state, zip} = req.body.shipping;
      const {price, pictureIDs} = req.body
      let userId = req.session.user.id

      //destructure info here from req.body
      try {
        let date = new Date(); 
        db.processOrder(address, address2, city, state, zip, userId, pictureIDs, date, price)
        res.sendStatus(200)
      } catch (error) {
          console.log(error);
          res.status(500).send(error)
      }
    },

    processGuest: (req, res) => {
      const db = req.app.get('db');

      const {name, email, address, address2, city, state, zip} = req.body.shipping;
      const {price, pictureIDs} = req.body;

      try {
        let date = new Date();
        db.processGuestOrder({pictureIDs, date, price, email, name, address, address2, city, state, zip})
        res.sendStatus(200)
      } catch (error) {
        console.log(9999999, error, 9999999)
        res.status(500).send(error)
      }
    }
}