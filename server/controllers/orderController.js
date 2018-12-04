require('dotenv').config();
const {STRIPE_SECRET_KEY} = process.env;

module.exports = {
    charge: async (req, res) => {
        const stripe = require('stripe')(STRIPE_SECRET_KEY);
        try {
          let {status} = await stripe.charges.create({
            amount: 50,
            currency: "usd",
            description: "An example charge",
            source: req.body.id
          });
      
          res.status(200).send(status);
          
        } catch (err) {
            console.log(err)
          res.status(500).end();
        }
      }
}