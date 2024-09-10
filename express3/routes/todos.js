
const express = require('express');
const router = express.Router();

let todos = [];


router.post('/', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo created', todo: newTodo });
});


router.get('/', (req, res) => {
  res.json(todos);
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index !== -1) {
    todos[index] = updatedTodo;
    res.json({ message: 'Todo updated', todo: updatedTodo });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json({ message: 'Todo deleted', todo: deletedTodo });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = router;
