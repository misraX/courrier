const chai = require('chai');
const request = require('supertest');
const app = require('../server');
const expect = chai.expect;

describe('Tasks endpoints testing..', () => {
  before(() => {
    return require('../models').sequelize.sync();
  });
  beforeEach(() => {
    // init task models.
    this.models = require('../models');
    // return Promise.all([this.models.Task.destroy({ truncate: true })]);
  });

  it('should GET 200 on ListView /tasks Tasks...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'completed',
      driverComment: ''
    }).then(() => {
      request(app)
        .get('/tasks')
        .expect(200, done);
    });
  });

  it('should GET 200 on ListView /tasks Tasks with orders...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'completed',
      driverComment: ''
    }).then(() => {
      request(app)
        .get('/tasks?order=DESC&sort=deliveryDate')
        .expect(200, done);
    });
  });

  it('should GET 200 on DetailsView /tasks/:id Tasks...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'completed',
      driverComment: ''
    }).then(task => {
      let id = task.get()['id'];
      request(app)
        .get(`/tasks/${id}`)
        .expect(200, done);
    });
  });

  it('should PUT with status code 200 on UpdateView /tasks/:id Tasks while status is pending...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'pending',
      driverComment: ''
    }).then(task => {
      let id = task.get()['id'];
      request(app)
        .put(`/tasks/${id}`)
        .send({ status: 'completed' })
        .end((err, res) => {
          expect(res.body.status).to.equal('completed');
          done()
        });
    });
  });

  it('should PUT with status code 400 on UpdateView /tasks/:id Tasks on status rather than pending...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'completed',
      driverComment: ''
    }).then(task => {
      let id = task.get()['id'];
      request(app)
        .put(`/tasks/${id}`)
        .send({ status: 'failed' })
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Status not allowed.');
          done();
        });
    });
  });
  it('should PUT with status code 404 on UpdateView /tasks/:id Tasks...', done => {
    // create a new task instance.
    this.models.Task.create({
      fromLocation: '25.204849,55.270783',
      toLocation: '25.125386, 55.227821',
      deliveryDate: '2019-05-10 03:36:08',
      startedAt: '2019-05-10 01:36:08',
      finishedAt: '2019-05-10 01:56:09',
      driverName: 'Marko Pandres',
      courier: 'FastWay',
      description: 'Deliver a credit card, user must sign',
      status: 'completed',
      driverComment: ''
    }).then(task => {
      let id = task.get()['id'];
      request(app)
        .put(`/tasks/${id + 100}`)
        .send({ status: 'failed' })
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Not Found.');
          done();
        });
    });
  });
});

// completed
