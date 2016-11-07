var connection = require('./connection');

let sampleSchema = {
  title: {
    type: connection._Sequelize().STRING,
    unique: true,
    allowNull: false
  }
};

 module.exports = connection._sequelize().define('sample', sampleSchema);