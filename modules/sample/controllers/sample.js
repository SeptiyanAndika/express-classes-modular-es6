import BaseCrudController from '../../../core/controllers/BaseCrud'
import model from '../models/sample';

class SampleController extends BaseCrudController  {

	constructor() {
	
	  super(model);
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
	   super.index(req,res);
	}

		
}
   
module.exports = SampleController;


