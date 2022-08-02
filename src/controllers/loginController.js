const loginService = require('../services/loginService');
const jwtService = require('../services/jwtService');

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const isValid = loginService.validateLogin(email, password);

        if (isValid.message) return res.status(400).json({ message: isValid.message });

        const token = await loginService.login(email, password);

        if (token.message) return res.status(400).json({ message: token.message });

        return res.status(200).json({ token });
    },
    validateToken: async (req, res, next) => {
        const { authorization } = req.headers;

        jwtService.validateToken(authorization);

        next();
    },
};

module.exports = loginController;
