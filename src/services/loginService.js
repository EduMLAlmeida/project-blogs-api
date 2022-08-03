const db = require('../database/models');
const jwtService = require('./jwtService');

const loginService = {
    validateLogin: (email, password) => {
        if (!email || !password) return { message: 'Some required fields are missing' };

        return {};
    },
    login: async (email, password) => {
        const user = await db.User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return { message: 'Invalid fields' };
        }

        const token = jwtService.createToken(user);

        return token;
    },
    validateToken: (token) => {
        if (!token) return { message: 'Token not found' };
        
        const data = jwtService.validateToken(token);

        return data;
    },
};

module.exports = loginService;