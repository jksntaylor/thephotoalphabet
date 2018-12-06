require('dotenv').config();
const {STRIPE_SECRET_KEY} = process.env;

module.exports = {
    charge: async (req, res) => {
        const stripe = require('stripe')(STRIPE_SECRET_KEY);
        console.log('111111', req.body, '111111');
        const {id, price} = req.body
        let serverPrice = price * 100
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
        const db = req.app.get('db');

        const {address, address2, city, state, zip} = req.body.shipping;
        const {price, pictureIDs} = req.body
        if (!req.session.user) {
          var userId = 10
        } else {
          var userId = req.session.user.id
        }

        //destructure info here from req.body
        try {
          let date = new Date(); 
          db.processOrder(address, address2, city, state, zip, userId, pictureIDs, date, price)
          res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
      }
}