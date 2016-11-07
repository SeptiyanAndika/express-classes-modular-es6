import model from '../modules/sample/models/sample';
import model1 from '../modules/sample/models/sample1';


class RelationsModelsHelper  {

	constructor() {
		model.belongsTo(model1);

	}	
}
   
module.exports = RelationsModelsHelper;



