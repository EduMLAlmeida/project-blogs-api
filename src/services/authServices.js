const db = require('../database/models');
const jwtServices = require('./jwtServices');

const authServices = {
    validateLogin: (email, password) => {
        if (!email || !password) return { message: 'Some required fields are missing' };

        return {};
    },
    login: async (email, password) => {
        const user = await db.User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return { message: 'Invalid fields' };
        }

        const token = jwtServices.createToken(user);

        return token;
    },
    validateToken: (token) => {
        const data = jwtServices.validateToken(token);

        return data;
    },
};

module.exports = authServices;