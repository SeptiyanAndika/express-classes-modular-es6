import {database as config_database} from '../../config/config.js'
import Sequelize from 'sequelize'; 

class Connection  {
	constructor() {
	  console.log();
	  const host = process.env.DB_HOST ||  config_database.mysql.host;
	  const port = process.env.DB_PORT || config_database.mysql.port;
	  const username = process.env.DB_USERNAME || config_database.mysql.username;
	  const password = process.env.DB_PASSWORD || config_database.mysql.password;
	  const database =  process.env.DB_DATABASE || config_database.mysql.database;
	  
	  this.sequelize = new Sequelize(database, username, password, {
		  host: host,
		  port: port
		})
	 
	}

	_sequelize() {
		return this.sequelize
	}

	_Sequelize() {
		return Sequelize
	}

		
}
   
module.exports = new Connection();
