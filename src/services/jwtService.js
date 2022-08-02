const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtService = {
    createToken: (data) => {
        const token = jwt.sign({ data }, process.env.JWT_SECRET);
        return token;
    },
    validateToken: (token) => {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    },
};

module.exports = jwtService;
