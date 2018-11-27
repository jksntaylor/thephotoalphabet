const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {fullName, email, password} = req.body;

        const existingUser = await db.checkExistingUser([email]);
        if (existingUser[0]) {
            return res.status(409).send('Username Taken');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeringUser = await db.registerUser([fullName, email, hash]);
        const user = registeringUser[0];

        req.session.user = {
            email: user.email,
            name: user.name,
            id: user.id
        }
        return res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {loginEmail, loginPassword} = req.body;

        const getUser = await db.getUser([loginEmail]);
        const user = getUser[0];

        if (!user) {
            return res.status(401).send('User not found');
        }

        const isAuthenticated = bcrypt.compareSync(loginPassword, user.hash);

        if (!isAuthenticated) {
            return res.status(403).send('Invalid Credentials');
        }

        req.session.user = user;
        res.status(200).send(user);
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}