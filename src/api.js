const express = require('express');
const authController = require('./controllers/authController');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', authController.login);

// app.use(authController.validateToken);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
