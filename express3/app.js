
const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const todosRoutes = require('./routes/todos');

const app = express();


app.use(bodyParser.json());


app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);

module.exports = app;
