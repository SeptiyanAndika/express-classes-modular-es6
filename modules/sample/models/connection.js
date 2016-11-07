import {database as config_database} from '../../../config/config.js'
import Sequelize from 'sequelize'; 

class Connection  {

	constructor() {
	  
	  this.sequelize = new Sequelize(config_database.mysql);
	 
	}

	_sequelize() {
		return this.sequelize
	}

	_Sequelize() {
		return Sequelize
	}

		
}
   
module.exports = new Connection();
