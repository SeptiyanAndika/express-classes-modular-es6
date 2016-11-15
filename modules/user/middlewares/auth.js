var util = require('util');
import jwtHelper from '../../../helpers/JwtHelper'

class Auth {

	constructor() {
	}

	verifyByToken(req,res,next){
		if (req.headers && req.headers.authorization) {
	      var parts = req.headers.authorization.split(' ');
	      if (parts.length == 2) {
	        var scheme = parts[0];
	        var credentials = parts[1];

	        if (/^Bearer$/i.test(scheme)) {
	         let token = credentials;
				jwtHelper.verifyAndGetUserByToken(token,(err,ressult)=>{
		  			if(err){
		  				 return res.restfull(401,err.userMessage,null);
		  			}else{
		  				req.user = ressult;
		  				next();
		  			}
	  			});
	        } else {
	          return res.restfull(401,{ message: 'Format is Authorization: Bearer [token]' },null);
	        }
	      } else {
	      	return res.restfull(401,{ message: 'Format is Authorization: Bearer [token]' },null);

	      }
	    }else{
	    	return res.restfull(401,{message:'credentials not found'},null);
	    }
		
		
	}
	authenticate(req, res, next)
    {
    	req.checkBody('username', 'username cannot empty').notEmpty();
    	req.checkBody('password', 'password cannot empty').notEmpty();
      req.asyncValidationErrors().then(function(ressult){
          next();
      }).catch(function(errors) {
	        return res.restfull(422,errors,null);
	    });

    }

    register(req, res, next)
    {
      	req.checkBody('username', 'username cannot empty').notEmpty();
    	  req.checkBody('password', 'password cannot empty').notEmpty();
      	req.asyncValidationErrors().then(function(ressult){
          next();
        }).catch(function(errors) {
          return res.restfull(422,errors,null);
        });

    }

		
}
   
module.exports = Auth;
