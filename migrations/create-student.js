'use strict';

const {DataTypes} = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4, // Or Sequelize.UUIDV1
          // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
          comment: 'This uuid is used as an extra id, so this is not a primary key or primary id'
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 25]
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 25]
        }
      },
      classname: {
        type: Sequelize.STRING,
                allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 25]
        }
      },
      age: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  }
};