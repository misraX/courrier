const express = require('express');
const db = require('./models');

// app
const app = express();

app.get('/tasks', (req, res) => {
  const Tasks = db.Task;
  Tasks.findAll()
    .then(tasks => res.json(tasks))
    .catch(e => res.status(404).json({ error: 'Not found.' }));
});

app.listen(9000);
