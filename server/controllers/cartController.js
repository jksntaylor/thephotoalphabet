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
        console.log('params id', id);

        // let targetArray = req.session.cart.slice();
        // let target = targetArray.filter(obj => obj.cartID === +id)[0];
        // console.log('target', target);
        // let index = req.session.cart.indexOf(target);
        // console.log('index', index);
        // let newCart = req.session.cart.slice();
        // newCart.splice(index, 1);
        // req.session.cart = newCart;

        let filtered = req.session.cart.filter(obj => obj.cartID !== +id);
        console.log(11111, filtered);
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