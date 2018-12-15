const moment = require('moment');

/**
 * Get a formated date using moment.
 *
 * @param {*} date
 * @param {*} strFormat
 * @returns
 */
function getDate(date, strFormat) {
  return moment(date)
    .utc()
    .format(strFormat);
}

/**
 * Validate sequalizer Invalid date.
 *
 * @param {*} date
 * @returns
 */
function validDate(date) {
  if (String(date).startsWith('Invalid')) {
    return null;
  }
  return date;
}
module.exports = {
  getDate: getDate,
  validDate: validDate
};
