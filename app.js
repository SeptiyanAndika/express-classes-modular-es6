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
import expressValidator from 'express-validator'

function list(val) {
  return val.split(',');
}

program
  .option('-m, --modules [value]', 'An optional value', list)
  .parse(process.argv);


// Create our Express application
const app = express();

// Compress
app.use(compression())

// Show log on console
app.use(logger('dev'))
app.use(multer({dest:'./uploads/'}).single('file'));

// Get request data
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator({}));

// cors origin
app.use(cors())

app.use(function (req, res, next) {
  res.restfull = function (statusCode,error,result) {
     res.status(statusCode).json({statusCode:statusCode,error:error,result:result});
  }
  next();
});

app.use(function (req, res, next) {
	if(!req.locals){
    	req.locals  = {};
   	}
    next();
});

app.get('/ping', function(req, res){
  res.restfull(200,null,{message:"pong"}); 
});


let relationsModels = new RelationsModelsHelper()

let core  = require('./core')(app,program.modules);


const port = process.env.PORT || config_app.port;
app.listen(port, () => {
    console.log('Express listening on port '+port);
})
