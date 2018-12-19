[![Build Status](https://travis-ci.org/misraX/courrier.svg?branch=master)](https://travis-ci.org/misraX/courrier) [![codecov](https://codecov.io/gh/misraX/courrier/branch/master/graph/badge.svg)](https://codecov.io/gh/misraX/courrier)

## Installation:


`docker-compose up`  For the first time use `--build` to build the containers.

Run model migrations :

`docker-compose exec api bash -c "./node_modules/.bin/sequelize db:migrate"`

Run model seed data:

`docker-compose exec api bash -c "./node_modules/.bin/sequelize db:seed:all"`

## Docker containers:
- db (mysql).
- client (ReactJS) port 3000
- api (ExpressJS) port 9000

## Available endpoints:

ExpressJS app:

GET `http://localhost:9000/tasks` List all Tasks.

GET `http://localhost:9000/tasks/:id` Task by id.

PUT `http://localhost:9000/tasks/:id` {status: 'completed|failed'} on pending status.

ReactJS app: a simple app without using redux. 

List:

`http://localhost:3000` List all Tasks, simple table with dynamic sorting options for ASC & DESC ordering and searching.

To sort the table: click on the table head it will dynamicly sort based on the head value and on the api sorting response `<th>`

Detail:

`http://localhost:3000/tasks/:id` Task by id (updating status only on pending status), instant view update without refreshing.

A simple detail view with google maps and a mark to fromLocation and on pending status there will be a simple form using `formik` to update `PUT` the api `/tasks/:id` with "completed|failed" status.

### Test:

Packages used for test:

Travis Continuous Integration for both front and back: [![Build Status](https://travis-ci.org/misraX/courrier.svg?branch=master)](https://travis-ci.org/misraX/courrier)

Code Coverage mainly for the backend code: [![codecov](https://codecov.io/gh/misraX/courrier/branch/master/graph/badge.svg)](https://codecov.io/gh/misraX/courrier)

1. [mocha](https://github.com/mochajs/mocha "mocha") The JavaScript test framework.
2. [chai](https://github.com/chaijs/chai "chai") chai expect.
3. [supertest](https://github.com/visionmedia/supertest "supertest") Super-agent driven library for testing node.js HTTP servers using a fluent API.
4. [jest](https://jestjs.io/ "jest") For React.
