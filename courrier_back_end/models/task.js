'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      fromLocation: DataTypes.STRING,
      toLocation: DataTypes.STRING,
      deliveryDate: DataTypes.DATE,
      startedAt: DataTypes.DATE,
      finishedAt: DataTypes.DATE,
      driverName: DataTypes.STRING,
      courier: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.ENUM('completed', 'started', 'pending', 'failed'),
      driverComment: DataTypes.TEXT
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
