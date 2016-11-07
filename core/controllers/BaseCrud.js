class BaseCrudController  {

	constructor(model) {
		this.model = model;
		this.foo = 'base';
	}
			
	index(req, res) {
		let opts = req.query || {};

		this.model.findAll({ where:opts }).then(function(result) {
			res.restfull(200,null,result);
  		}).catch(function (err) {
		  res.restfull(500,err,null);
		});
	
	}

	findById(req, res) {

		let id = req.params.id || 0;
		this.model.findById(id).then(function(result) {
			res.restfull(200,null,result);
  		}).catch(function (err) {
		  res.restfull(500,err,null);
		});
	
	}

	findOne(req, res) {
		let opts = req.query || {};
		this.model.findOne({ where: opts }).then(function(result) {
			res.restfull(200,null,result);
  		}).catch(function (err) {
		  res.restfull(500,err,null);
		});
	
	}

	save(req, res) {
		let  body = req.body || {};
		 this.model.create(body).then(function(result) {
		    res.restfull(200,null,result);
  		}).catch(function (err) {
		  res.restfull(500,err,null);
		});
	
	}

	update(req, res) {
		let opts = req.query || {};
		let  body = req.body || {};
		if (Object.keys(opts).length > 0){
			this.model.update(body,{ where: opts}).then(function(affectedRows) {
		    	res.restfull(200,null,'updated '+affectedRows[0]+' data');
  			}).catch(function (err) {
		  		res.restfull(500,err,null);
			});
  		}else{
  			res.restfull(500,'query params cannot empty',null);
  		}
	}

	delete(req, res) {
		let id = req.params.id || 0;
			this.model.destroy({ where: {id:id}}).then(function(affectedRows) {
		    	res.restfull(200,null,'delete '+affectedRows+' data');
  			}).catch(function (err) {
		  		res.restfull(500,err,null);
			});
  		
	}

		
}
   
module.exports = BaseCrudController;


