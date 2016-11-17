var connection = require('../../../core/db/connection');
var bcrypt = require('bcrypt');

const saltRounds = 10;

let userSchema = {
  username: {
    type: connection._Sequelize().STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: connection._Sequelize().STRING,
    allowNull: false
  }
};

let authenticate = function(username,password,callback) {
	this.findOne({ where: {username: username} }).then(function(user) {
		if(user){
	  		bcrypt.compare(password, user.password, function(err, res) {
		  		if(res){
		  			callback(null,user);
		  		}else{
		  			callback({message:'check username and password'},null);
		  		}
   			});
	  	}else{
	  		callback({message:'check username and password'},null);
	  	}
	}).catch(function (err) {
		callback(err,null);
	});
};

let register = function(body,callback) {
	
	body.password = bcrypt.hashSync(body.password, saltRounds);

	this.create(body).then(function(user) {
		callback(null,user);
  	}).catch(function (err) {
		callback(err,null);
	});

};
//http://stackoverflow.com/a/34263012
module.exports = connection._sequelize().define('users', userSchema, {
 	classMethods:{register,authenticate}
});

