import express from "express";
import compression from 'compression'
import logger from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import helmet from 'helmet'
import kue from 'kue'
import {app as config_app} from './config/config.js'
import _ from 'underscore';
import RelationsModelsHelper from './helpers/RelationsModelsHelper'


// Create our Express application
const app = express();
//const queue = kue.createQueue();
// Use environment defined port or 3000
let port = process.env.PORT || 3000;
// Compress
app.use(compression())

// Show log on console
app.use(logger('dev'))
app.use(multer({dest:'./uploads/'}).single('file'));

// Get request data
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))


// cors origin
app.use(cors())

app.use(function (req, res, next) {
  res.restfull = function (statusCode,error,data) {
     res.status(statusCode).json({statusCode:statusCode,error:error,data:data});
  }
  next();
});

app.use(function (req, res, next) {
	if(!req.pipa){
    	req.pipa  = {};
   	}

    next();
  });


let relationsModels = new RelationsModelsHelper()

let core  = require('./core')(app);
// new adapters(app,'sample');


// inject models
// app.models = models
// app.utils = require('./utils').default;

// var sample = new app.utils.sample(app);

// console.log(sample.toJSON({}));

//require('./modules/sample')(app);

// app.controllers = require('./controllers')(app);

// import resource from './routes/resource'
// resource(app)

// Start the server

//http://stackoverflow.com/a/35443130

// import UserControllerFactory from './controllers/user'

// let UserController = UserControllerFactory(app);

// app.controllers = [];
// app.controllers.user =  new UserController();

// import resource from './routes/resource'
// resource(app)
// http://stackoverflow.com/a/33799029
//app.get('/',user.index.bind(user))

app.listen(config_app.port, () => {
    console.log('Express listening on port '+port);
})
