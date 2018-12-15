const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
// app
const app = express();
app.use(cors());
app.use(bodyParser.json());
const ERRORMSG = { error: 'Not Found.' };

// ListView for tasks.
app.get('/tasks', (req, res) => {
  let Tasks = db.Task;
  // order=DESC&sort=total_spent
  // {order: [['deliveryDate', 'DESC']]}
  let dbQuery;
  let queryString = req.query;
  // FindAll with orders.
  if (queryString) {
    let orderQueryString = queryString['order'];
    let sortQueryString = queryString['sort'];
    if (orderQueryString && sortQueryString) console.log('Order By :', orderQueryString, 'Sort By :', sortQueryString);
    dbQuery = Tasks.findAll({
      order: [[sortQueryString, orderQueryString]]
    });
  } else {
    // regular query.
    dbQuery = Tasks.findAll();
  }
  dbQuery.then(tasks => res.json({ tasks: [...tasks] })).catch(e => res.status(404).json(ERRORMSG));
});

// DetailsView for tasks.
app.get('/tasks/:id', (req, res) => {
  let Tasks = db.Task;
  let dbQuery = Tasks.findByPk(req.params.id);
  dbQuery
    .then(task => (task ? res.json(task) : res.status(404).json(ERRORMSG)))
    .catch(e => res.status(404).json(ERRORMSG));
});

// UpdateView for tasks.
app.put('/tasks/:id', (req, res) => {
  let Tasks = db.Task;
  let dbQuery = Tasks.findByPk(req.params.id);
  dbQuery
    .then(task => {
      if (!task) {
        throw ERRORMSG;
      }
      // set tasks status as completed or failed if it’s in pending status.
      if (
        req.body['status'] &&
        task.status === 'pending' &&
        (req.body['status'] === 'completed' || req.body['status'] === 'failed')
      ) {
        return task.update({ status: req.body['status'] });
      } else {
        // Status not allowed.
        throw { error: 'Status not allowed.', status: 400 };
      }
    })
    .then(task => res.json(task))
    .catch(e => {
      return res.status(e.status ? e.status : 404).json(e.error ? { error: e.error } : ERRORMSG);
    });
});

app.listen(9000);
