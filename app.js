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
import program from 'commander'


function list(val) {
  return val.split(',');
}

program
  .option('-m, --modules [value]', 'An optional value', list)
  .parse(process.argv);


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
	if(!req.locals){
    	req.locals  = {};
   	}

    next();
  });


let relationsModels = new RelationsModelsHelper()

let core  = require('./core')(app,program.modules);


app.listen(config_app.port, () => {
    console.log('Express listening on port '+port);
})
