import fs from 'fs';
import path from 'path';
import _ from 'underscore';


class Modules {
  constructor (app,module_path) {
    this.app = app;
    this.module_path = module_path;
    this.controllers_file = [];
    const routes_path = path.join(__dirname,'..','modules' , this.module_path,'routes.js');
    const self = this;    
      if(fs.existsSync(routes_path)){
         self.routes = require(routes_path);
         const controllers = self.loadModule('controllers')
         const middlewares = self.loadModule('middlewares')
         self.createRouting(controllers,middlewares)
      }else{
        // https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
        console.log('\x1b[31m%s\x1b[0m', 'routes.js for modules '+module_path+' not found');
      
      }
  }

  loadModule(folder){
    const module_path = path.join(__dirname,'..','modules' , this.module_path,folder);
  
    if(fs.existsSync(module_path)){
        let controllers =[];
          fs
          .readdirSync(module_path)
          .filter((file) => {
            const fileArray = file.split('.');
            return (file.indexOf('.') !== 0) &&
              (['js', 'es6'].indexOf(fileArray.pop()) !== -1) && (fileArray[0] !== 'index') && (fileArray[0] !== 'base');
          })
          .forEach((file) => {
            
            const file_path = path.join(module_path, file);
            const file_name = path.basename(file_path);
            if(folder === "controllers"){
              this.controllers_file.push(file_path);
            }

            let filename = require(file_path);
            controllers[this.removeExtension(file_name)] = new filename()

          });
          return controllers;

    }else{
      // https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
      console.log('\x1b[31m%s\x1b[0m', folder +' not found for modules '+self.module_path);
        return null;
    }
    
  }
 
  createRouting(_controllers,_middlewares){
   
      if(_controllers == null || _middlewares == null){
          return;
      }

      _.each(this.routes, (route, name) => {
          
          let controller, name_arr, route_name, route_verb;

          let middlewares = route.middlewares;

          name_arr = name.split(' ');
          if (name_arr.length > 1) {
            route_name = name_arr[1];
            route_verb = name_arr[0];
          } else {
            route_name = name;
            route_verb = 'get';
          }

          controller = _controllers[route.controller];
          
          let middleware_route = [];
          
           _.each(middlewares,(name) => {
                let middleware = name.split('.');
                middleware_route.push((_middlewares[middleware[0]][middleware[1]]));
           });

          middleware_route.push(controller[route.action].bind(controller));

          this.app[route_verb](route_name, middleware_route);

      });
  }
    
  removeExtension(filename){
        var lastDotPosition = filename.lastIndexOf(".");
        if (lastDotPosition === -1) return filename;
        else return filename.substr(0, lastDotPosition);
  }

}

module.exports = Modules;