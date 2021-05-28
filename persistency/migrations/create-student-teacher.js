'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('murat_student_teacher', {
      // There is no need an id field. student_id and teacher_id compose of the primary key
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('murat_student_teacher');
  }
};