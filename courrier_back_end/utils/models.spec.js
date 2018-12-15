const chai = require('chai');
const expect = chai.expect;
const getDate = require('./models').getDate;
const validDate = require('./models').validDate;

describe('Models utils testing...', () => {
  let date = '2018-12-14T22:44:07.117Z';

  it('should return a formated date.', () => {
    let formatedDate = getDate(date, 'YYYY-MM-DD');
    expect(formatedDate).to.equal('2018-12-14');
  });

  it('should return a valid date or null.', () => {
    let validiateDate = validDate(date);
    expect(validiateDate).to.equal(date);
    date = 'Invalid date';
    validiateDate = validDate(date);
    expect(validiateDate).to.equal(null);
  });
});
