import fs from 'fs';
import path from 'path';
import modules from './modules';
import swaggerUi from '../swagger-ui';
import swaggerJSDoc from 'swagger-jsdoc';


module.exports = (app) => {
  const modules_path = path.join(__dirname, '..','modules');

  let apis =[];
  fs
  .readdirSync(modules_path)
  .filter((folder) => {
    return fs.lstatSync(path.join(modules_path,folder)).isDirectory();
  })
  .forEach((folder) => {
     const module =   new modules(app,folder);
     
     // https://jsperf.com/fast-array-foreach
     for (var i = 0, len = module.controllers_file.length; i < len; i++) {
        apis.push(module.controllers_file[i]);
     }

  });
  

  var options = {
  swaggerDefinition: {
      info: {
        title: 'API Documentation', // Title (required) 
        version: '1.0.0', // Version (required) 
      },
    },
    apis: apis,
    url:'' // Path to the API docs 
  };

  var swaggerSpec = swaggerJSDoc(options);
  app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


}