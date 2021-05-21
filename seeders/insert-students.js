'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('students', [{
        id: 1,
        uuid: '3df5e6b5-206d-4b21-8748-14e31c568b5f',
        firstname: 'Tom',
        lastname: 'Clement',
        classname: 'A1',
        age: 7,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        uuid: 'f9187460-e786-477f-ac77-1259e0bd06c3',
        firstname: 'Emma',
        lastname: 'Durand',
        classname: 'B2',
        age: 9,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        firstname: 'Sacha',
        lastname: 'Blanc',
        classname: 'A1',
        age: 8,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 4,
        uuid: 'e04fd921-7c96-43fc-a4a9-bb6610d34e54',
        firstname: 'Noah',
        lastname: 'François',
        classname: 'C3',
        age: 11,
        createdAt: 20171010162834,
        updatedAt: Sequelize.fn('NOW')
      }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});   
  }
};
