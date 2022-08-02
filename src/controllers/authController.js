const authServices = require('../services/authServices');
const jwtServices = require('../services/jwtServices');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const token = await authServices.login(email, password);

        res.status(200).json({ token });
    },
    validateToken: async (req, res, next) => {
        const { authorization } = req.headers;

        jwtServices.validateToken(authorization);

        next();
    },
};

module.exports = authController;
