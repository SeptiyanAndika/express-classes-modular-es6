var connection = require('../../../core/db/connection');

let sample1Schema = {
  author: {
    type: connection._Sequelize().STRING,
    unique: true,
    allowNull: false
  }
};

 module.exports = connection._sequelize().define('sample1', sample1Schema);