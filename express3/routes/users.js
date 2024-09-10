// routes/users.js
const express = require('express');
const router = express.Router();

let users = []; 


router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: 'User created', user: newUser });
});


router.get('/', (req, res) => {
  res.json(users);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = updatedUser;
    res.json({ message: 'User updated', user: updatedUser });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deletedUser });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
