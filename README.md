Travis CI stats [![Build Status](https://travis-ci.org/misraX/courrier.svg?branch=master)](https://travis-ci.org/misraX/courrier) [![codecov](https://codecov.io/gh/misraX/courrier/branch/master/graph/badge.svg)](https://codecov.io/gh/misraX/courrier)

## Installation:

For the first time use `docker-compose` with `--build` to build the containers from images.

`docker-compose up`

Run model migrations :

`docker-compose exec api bash -c "./node_modules/.bin/sequelize db:migrate"`

Run model seed data:

`docker-compose exec api bash -c "./node_modules/.bin/sequelize db:seed:all"`


## Available endpoints:

GET `http://localhost:9000/tasks` List all Tasks.

GET `http://localhost:9000/tasks/:id` Task by id.

PUT `http://localhost:9000/tasks/:id` {status: 'completed|failed'} on pending status.

ReactJS app: `http://localhost:3000`

### Test:

Packages used for test:

Travis Continuous Integration: [![Build Status](https://travis-ci.org/misraX/courrier.svg?branch=master)](https://travis-ci.org/misraX/courrier)

CodeCoverage: [![codecov](https://codecov.io/gh/misraX/courrier/branch/master/graph/badge.svg)](https://codecov.io/gh/misraX/courrier)

1. [mocha](https://github.com/mochajs/mocha "mocha") The JavaScript test framework.
2. [chai](https://github.com/chaijs/chai "chai") chai expect.
3. [supertest](https://github.com/visionmedia/supertest "supertest") Super-agent driven library for testing node.js HTTP servers using a fluent API.