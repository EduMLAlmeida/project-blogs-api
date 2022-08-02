const userService = require('../services/userService');
const loginService = require('../services/loginService');

const userController = {
    createUser: async (req, res) => {
        const { displayName, email, password, image } = req.body;
        const isNameValid = userService.validateName(displayName);
        if (isNameValid.message) return res.status(400).json({ message: isNameValid.message });
        const isPasswordValid = userService.validatePassword(password);
        if (isPasswordValid.message) {
            return res.status(400).json({ message: isPasswordValid.message });
        }
        const isEmailValid = userService.validateEmail(email);
        if (isEmailValid.message) return res.status(400).json({ message: isEmailValid.message });
        const isUserValid = await userService.validateUser(email);
        if (isUserValid.message) return res.status(409).json({ message: isUserValid.message });
        await userService.createUser(displayName, email, password, image);
        const token = await loginService.login(email, password);
        return res.status(201).json({ token });
    },
};

module.exports = userController;
