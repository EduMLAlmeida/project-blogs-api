const authServices = require('../services/authServices');
const jwtServices = require('../services/jwtServices');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const isValid = authServices.validateLogin(email, password);

        if (isValid.message) return res.status(400).json({ message: isValid.message });

        const token = await authServices.login(email, password);

        if (token.message) return res.status(400).json({ message: token.message });

        return res.status(200).json({ token });
    },
    validateToken: async (req, res, next) => {
        const { authorization } = req.headers;

        jwtServices.validateToken(authorization);

        next();
    },
};

module.exports = authController;
