'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fromLocation: {
        type: Sequelize.STRING
      },
      toLocation: {
        type: Sequelize.STRING
      },
      deliveryDate: {
        type: Sequelize.DATE
      },
      startedAt: {
        type: Sequelize.DATE
      },
      finishedAt: {
        type: Sequelize.DATE
      },
      driverName: {
        type: Sequelize.STRING
      },
      courier: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('completed', 'started', 'pending', 'failed')
      },
      driverComment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};
