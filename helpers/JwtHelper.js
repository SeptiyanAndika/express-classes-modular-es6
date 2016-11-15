import {jwt as jwt_config} from '../config/config.js'
import nJwt from 'njwt';
import usersModel from '../modules/user/models/users';

class JwtHelper  {

	constructor() {
		
	}

	createToken(user) {
		var claims = {
		  iss: jwt_config.iss,  // The URL of your service
		  sub: user.id,    // The UID of the user in your system
		  scope: "all"
		}
		var jwt = nJwt.create(claims,jwt_config.signingKey);
		jwt.setExpiration(new Date().getTime() + jwt_config.expiration);
		var token = jwt.compact();
		return token;
	}

	verifyToken(token,callback) {
		try{
		  let verifiedJwt = nJwt.verify(token,jwt_config.signingKey);
		  callback(null,verifiedJwt);
		}catch(e){
		  callback(e,null);
		}
	}

	verifyAndGetUserByToken(token,callback) {
		this.verifyToken(token,(err,result)=>{
			if(err){
				return callback(err,result);
			}else{
				const header =  result.header;
				const body =  result.body;
				usersModel.findById(body.sub).then(function(result) {
					let user = result.dataValues;
					delete user.password;
					delete user.createdAt;
					delete user.updatedAt;

					return callback(null,user);
		  		}).catch(function (err) {
					  return callback(err,null);
				});
			
			}
		});
	}
	

}
   
module.exports = new JwtHelper();



