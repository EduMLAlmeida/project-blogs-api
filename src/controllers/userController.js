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
    getAllUsers: async (req, res) => {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) return res.status(404).json({ message: 'User does not exist' });
        return res.status(200).json(user);
    },
    deleteUser: async (req, res) => {
        const { authorization } = req.headers;
        await userService.deleteUser(authorization);
        return res.status(204).end();
    },
};

module.exports = userController;
