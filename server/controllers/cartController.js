var cartId = 0;

module.exports = {
    addToCart(req, res) {
       if (!req.session.cart) {
           req.session.cart = [];
       }

       req.session.cart.push({
           pictureIDs: req.body.userInput,
           cartID: cartId
       })

       cartId += 1;

       return res.status(200).send(req.session);

    },

    deleteFromCart(req, res) {
        const {id} = req.params;

        let target = req.session.cart.map(obj => obj.cartId === id);
        let index = req.session.cart.findIndex(() => target);
        let newCart = req.session.splice(index, 1);
        req.session.cart = newCart;

        res.status(200).send(req.session)
    },

    getCart(req, res) {
        if (!res.session.cart) {
            res.status(200).send('Cart Empty');
        }

        return res.status(200).send(req.session.cart);
    }
}