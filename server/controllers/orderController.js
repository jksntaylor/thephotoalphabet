require('dotenv').config();
const {STRIPE_SECRET_KEY} = process.env;

module.exports = {
    charge: async (req, res) => {
      const stripe = require('stripe')(STRIPE_SECRET_KEY);
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
        res.status(500).end();
      }
    },

    process: (req, res) => {
      const db = req.app.get('db');
      const {address, address2, city, state, zip} = req.body.shipping;
      const {price, config} = req.body
      let userId = req.session.user.id
      try {
        let date = new Date(); 
        db.processOrder(address, address2, city, state, zip, userId, config, date, price)
        res.sendStatus(200)
      } catch (error) {
          res.status(500).send(error)
      }
    },

    processGuest: (req, res) => {
      const db = req.app.get('db');
      const {name, email, address, address2, city, state, zip} = req.body.shipping;
      const {price, config} = req.body;
      try {
        let date = new Date();
        db.processGuestOrder({config, date, price, email, name, address, address2, city, state, zip})
        res.sendStatus(200)
      } catch (error) {
        res.status(500).send(error)
      }
    }
}