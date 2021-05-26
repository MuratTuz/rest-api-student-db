'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('murat_students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 25]
        }
      },
      classname: {
        type: DataTypes.STRING,
                allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [2, 25]
        }
      },
      age: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('murat_students');
  }
};