const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtServices = {
    createToken: (data) => {
        const token = jwt.sign({ data }, process.env.JWT_SECRET);
        return token;
    },
    validateToken: (token) => {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            return data;
        } catch (e) {
            // const error = new Error('Token inválido');
            // error.name = 'UnauthorizedError';
            // throw error;
            return { message: 'error' };
        }
    },
};

module.exports = jwtServices;
