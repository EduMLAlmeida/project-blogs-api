const express = require('express');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', loginController.login);
app.post('/user', userController.createUser);
app.get('/user', loginController.validateToken, userController.getAllUsers);
app.get('/user/:id', loginController.validateToken, userController.getUserById);
app.post('/categories', loginController.validateToken, categoryController.createCategory);
app.get('/categories', loginController.validateToken, categoryController.getAllCategories);
app.post('/post', loginController.validateToken, postController.createPost);
app.get('/post', loginController.validateToken, postController.getAllPosts);
app.get('/post/:id', loginController.validateToken, postController.getPostById);
app.put('/post/:id', loginController.validateToken, postController.updatePostById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
