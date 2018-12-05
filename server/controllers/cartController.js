var cartId = 0;

module.exports = {
    addToCart(req, res) {
       if (!req.session.cart) {
           req.session.cart = [];
       }

       req.session.cart.push({
           pictureIDs: req.body.userInput,
           price: req.body.price,
           cartID: cartId
       })

       cartId += 1;

       return res.status(200).send(req.session);

    },

    deleteFromCart(req, res) {
        const {id} = req.params;

        let filtered = req.session.cart.filter(obj => obj.cartID !== +id);
        req.session.cart = filtered;

        res.status(200).send(filtered);
    },

    getCart(req, res) {
        if (!req.session.cart) {
            req.session.cart = [];
        }

        return res.status(200).send(req.session.cart);
    }
}