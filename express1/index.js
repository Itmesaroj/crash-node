const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Server');
});


app.get('/about', (req, res) => {
  res.send('This is a simple server built using Express.js');
});


app.get('/contact', (req, res) => {
  res.json({
    email: 'student@example.com',
    phone: '123-456-7890'
  });
});


app.get('/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.send(`Random Number: ${randomNumber}`);
});


app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
