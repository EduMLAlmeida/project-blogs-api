const express = require('express');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', loginController.login);

app.post('/user', userController.createUser);

// app.use(loginController.validateToken);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
