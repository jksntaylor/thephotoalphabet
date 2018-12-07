module.exports = {
    getUserOrders: async (req, res) => {
        const db = req.app.get('db');
        const id = req.session.user.id
        const orders = await db.getUserOrders(id);
        res.status(200).send(orders)
    }
}