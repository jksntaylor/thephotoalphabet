require('dotenv').config();
const {STRIPE_SECRET_KEY} = process.env;

module.exports = {
    charge: async (req, res) => {
        const stripe = require('stripe')(STRIPE_SECRET_KEY);
        try {
            console.log(req.body)
          let {status} = await stripe.charges.create({
            amount: 50,
            currency: "usd",
            description: "An example charge",
            source: req.body.id
          });
    
          console.log(status)
      
          res.status(200).send(status);
          
        } catch (err) {
            console.log(err)
          res.status(500).end();
        }
      }
}