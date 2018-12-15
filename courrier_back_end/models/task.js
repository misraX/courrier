'use strict';
const getDate = require('../utils/models').getDate;
const validDate = require('../utils/models').validDate;
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      fromLocation: DataTypes.STRING,
      toLocation: DataTypes.STRING,
      deliveryDate: {
        type: DataTypes.DATEONLY,
        get() {
          const deliveryDate = this.getDataValue('deliveryDate');
          if (validDate(deliveryDate)) {
            return getDate(deliveryDate, 'YYYY-MM-DD');
          }
          return '';
        }
      },
      startedAt: {
        type: DataTypes.DATE,
        get() {
          const startedAt = this.getDataValue('startedAt');
          if (validDate(startedAt)) {
            return getDate(startedAt, 'YYYY-MM-DD hh:mm:ss');
          }
          return '';
        }
      },
      finishedAt: {
        type: DataTypes.DATE,
        get() {
          const finishedAt = this.getDataValue('finishedAt');
          if (validDate(finishedAt)) {
            return getDate(finishedAt, 'YYYY-MM-DD hh:mm:ss');
          }
          return '';
        }
      },
      driverName: DataTypes.STRING,
      courier: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.ENUM('completed', 'started', 'pending', 'failed'),
      driverComment: DataTypes.TEXT
    },
    { timestamps: false }
  );
  Task.associate = function(models) {};
  return Task;
};
