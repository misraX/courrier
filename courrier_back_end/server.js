const express = require('express');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const cors = require('cors');
// app
const app = express();
// CORS
app.use(cors());
// bodyparser
app.use(bodyParser.json());

app.use(tasksRoutes);
module.exports = app;
