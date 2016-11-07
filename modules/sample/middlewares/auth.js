var sample = require('../models/sample1');

class Auth {

	constructor() {
	}

		
	checkToken(req, res, next)
    {
      	console.log('Request Type:', req.method)
		next()
    }

		
}
   
module.exports = Auth;
