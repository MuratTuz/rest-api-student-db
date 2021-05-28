'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('murat_student_teacher', [{
        student_id: 1,
        teacher_id: 2,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        student_id: 2,
        teacher_id: 2,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        student_id: 3,
        teacher_id: 4,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        student_id: 1,
        teacher_id: 3,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
 await queryInterface.bulkDelete('murat_student_teacher', null, {});  
  }
};