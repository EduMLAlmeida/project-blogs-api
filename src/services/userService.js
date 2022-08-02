const db = require('../database/models');

const userService = {
    validateName: (displayName) => {
        if (displayName.length < 8) {
            return { message: '"displayName" length must be at least 8 characters long' };
        }

        return {};
    },
    validatePassword: (password) => {
        if (password.length < 6) {
            return { message: '"password" length must be at least 6 characters long' };
        }

        return {};
    },
    validateEmail: (email) => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const emailValidation = emailRegex.test(email);

        if (!emailValidation) {
            return { message: '"email" must be a valid email' };
        }

        return {};
    },
    validateUser: async (email) => {
        const user = await db.User.findOne({ where: { email } });

        if (user) {
            return { message: 'User already registered' };
        }

        return {};
    },
    createUser: async (displayName, email, password, image) => {
        await db.User.create({ displayName, email, password, image });
    },
};

module.exports = userService;