const db = require('../database/models');
const jwtService = require('./jwtService');

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
    getAllUsers: async () => {
        const users = await db.User.findAll({
            attributes: { exclude: ['password'] },
        });
        return users;
    },
    getUserById: async (id) => {
        const user = await db.User.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
        return user;
    },
    deleteUser: async (token) => {
        const tokenUser = jwtService.validateToken(token);
        const { id } = tokenUser.data;
        const posts = await db.BlogPost.findAll({ where: { userId: id } });
        const postsIds = posts.map((post) => post.dataValues.id);
        await postsIds.forEach(async (postId) => db.PostCategory.destroy(
            { where: { postId } },
            { truncate: true },
        ));
        await db.BlogPost.destroy({ where: { userId: id } }, { truncate: true });
        await db.User.destroy({ where: { id } });
    },
};

module.exports = userService;
