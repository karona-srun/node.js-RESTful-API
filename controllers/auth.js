const { Users, Sequelize } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
let self = {};

self.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { userName: username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // exp: in this example it's 2 minutes. 
        // You can also calculate: (60 * minutes), (3600 * hours) or (86400 * days) for minutes, hours or days.
        const token = jwt.sign({ 
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + (86400 * 60),
            iat: Math.floor(Date.now()) },
            'secret');

        res.json({ 
            'user': user,
            'accessToken': token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

self.register = async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            userName,
            password: hashedPassword,
        });

        res.json({ 
            message: 'User registered successfully',
            user 
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = self;