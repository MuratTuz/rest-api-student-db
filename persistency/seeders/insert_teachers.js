'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('murat_teachers', [{
        id: 1,
        uuid: '3df5e6b5-206d-4b21-8748-14e31c568b5f',
        firstname: 'Tom',
        lastname: 'Clement',
        lecture_id: 4,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        uuid: 'f9187460-e786-477f-ac77-1259e0bd06c3',
        firstname: 'Emma',
        lastname: 'Durand',
        lecture_id: 3,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        firstname: 'Sacha',
        lastname: 'Blanc',
        lecture_id: 2,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 4,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        firstname: 'Noah',
        lastname: 'François',
        lecture_id: 1,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
 await queryInterface.bulkDelete('murat_teachers', null, {});  
  }
};
