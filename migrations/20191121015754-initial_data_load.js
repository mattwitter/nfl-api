'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('teams', [
      { location: 'Buffalo', mascot: 'Bills', abbreviation: 'BUF', conference: 'AFC', division: 'East' },
      { location: 'Houston', mascot: 'Texans', abbreviation: 'HOU', conference: 'AFC', division: 'South' },
      { location: 'Miami', mascot: 'Dolphins', abbreviation: 'MIA', conference: 'AFC', division: 'East' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelte('teams', null, {})
  }
};
