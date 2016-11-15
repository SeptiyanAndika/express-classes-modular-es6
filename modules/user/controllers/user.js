import BaseCrudController from '../../../core/controllers/BaseCrud'
import jwtHelper from '../../../helpers/JwtHelper'
import usersModel from '../models/users';

class SampleController extends BaseCrudController  {

	constructor() {
	  super(usersModel);  
	}
	
	/**
	 * @swagger
	 * /:
	 *   get:
	 *     description: Get data sample from mysql
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	index(req, res) {
			res.send("home");
	   //super.index(req,res);
	}

	/**
	 * @swagger
	 * /login:
	 *   post:
	 *     description: login api
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         description: object login
	 *         required: true
	 *         schema: 
	 *            type: object
	 *            properties:
	 *              username:
	 *                type: string
	 *              password:
	 *                type: string
	 *     responses:
	 *       200:
	 *         description: succes and return token for authaorization header
	 *       422:
	 *         description: validation parameter error
	 *       400:
	 *         description: authenticate error
	 */
	authenticate(req,res){
	  usersModel.authenticate(req.body.username,req.body.password,(err,ressult)=>{
	  	if(err){
	  		return res.restfull(400,err,null);
	  	}else{
	  		var token= jwtHelper.createToken(ressult);
	  		return res.restfull(200,null,{token:token});
	  	}
	  });
	}

	/**
	 * @swagger
	 * /register:
	 *   post:
	 *     description: api for register
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         description: object login
	 *         required: true
	 *         schema: 
	 *            type: object
	 *            properties:
	 *              username:
	 *                type: string
	 *              password:
	 *                type: string
	 *     responses:
	 *       200:
	 *         description: succes and return token for authaorization header
	 *       422:
	 *         description: validation parameter error
	 *       400:
	 *         description: registration error
	 */
	register(req,res){
	  usersModel.register(req.body,(err,ressult)=>{
	  	if(err){
	  		return res.restfull(400,err,null);
	  	}else{
	  		var token= jwtHelper.createToken(ressult);
	  		return res.restfull(200,null,{token:token});
	  	}
	  });
	}
		
}
   
module.exports = SampleController;


