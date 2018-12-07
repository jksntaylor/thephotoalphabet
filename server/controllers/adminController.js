module.exports = {
    getOrders: async (req, res) => {
        const db = req.app.get('db');
        const orders = await db.getAllOrders();
        res.status(200).send(orders)
    }
}