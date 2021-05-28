'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('murat_lectures', [{
        id: 1,
        uuid: '3df5e6b5-206d-4b21-8748-14e31c568b5f',
        name: 'Mathematics',
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        uuid: 'f9187460-e786-477f-ac77-1259e0bd06c3',
        name: 'Physic',
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        name: 'Geography',
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 4,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        name: 'History',
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
 await queryInterface.bulkDelete('murat_lectures', null, {});  
  }
};