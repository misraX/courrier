const express = require('express');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions')
// app
const app = express();
// CORS
app.use(cors(corsOptions));
// bodyparser
app.use(bodyParser.json());

app.use(tasksRoutes);
module.exports = app;
