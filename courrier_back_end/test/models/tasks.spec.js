const chai = require('chai');
const db = require('../../models');
const expect = chai.expect;

describe('db/models unit testing.', () => {
  it('should has Task model', () => {
    expect(db.Task).to.be.ok;
  });
});
