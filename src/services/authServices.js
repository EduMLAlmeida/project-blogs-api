const db = require('../database/models');
const jwtServices = require('./jwtServices');

const authServices = {
    login: async (email, password) => {
        const user = await db.User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            // const error = new Error('Usuário não existe ou senha inválida.');
            // error.name = 'UnauthorizedError';
            // throw error;
            return { message: 'error' };
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