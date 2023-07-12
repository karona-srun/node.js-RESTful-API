const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'secret');

        const user = await Users.findByPk(decoded['id']);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json( error );
    }
};

module.exports = authenticateUser;
