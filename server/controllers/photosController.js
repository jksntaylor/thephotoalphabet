module.exports = {
    getPhoto (req, res) {
        const {letter, letterCount} = req.params;
        const db = req.app.get('db');
        db.getPhoto(letter, letterCount).then(response => {
            res.status(200).send(response);
        })
    }
}