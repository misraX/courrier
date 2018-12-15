const express = require('express');
const db = require('../models');
const router = express.Router();

const ERRORMSG = { error: 'Not Found.' };

// ListView for tasks.
router.get('/tasks', (req, res) => {
  let Tasks = db.Task;
  // order=DESC&sort=total_spent
  // {order: [['deliveryDate', 'DESC']]}
  let dbQuery;
  let queryString = req.query;
  // FindAll with orders.
  if (Object.keys(queryString).length > 0) {
    let orderQueryString = queryString['order'];
    let sortQueryString = queryString['sort'];
    if (orderQueryString && sortQueryString) console.log('Order By :', orderQueryString, 'Sort By :', sortQueryString);
    dbQuery = Tasks.findAll({
      order: [[sortQueryString, orderQueryString]]
    });
  } else {
    // regular query.
    dbQuery = Tasks.findAll();
    console.log(dbQuery);
  }
  dbQuery.then(tasks => res.json({ tasks: [...tasks] })).catch(e => res.status(404).json(ERRORMSG));
});

// DetailsView for tasks.
router.get('/tasks/:id', (req, res) => {
  let Tasks = db.Task;
  let dbQuery = Tasks.findByPk(req.params.id);
  dbQuery
    .then(task => (task ? res.json(task) : res.status(404).json(ERRORMSG)))
    .catch(e => res.status(404).json(ERRORMSG));
});

// UpdateView for tasks.
router.put('/tasks/:id', (req, res) => {
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

module.exports = router;
