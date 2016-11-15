/** --------------------------------------------
*
*   COMMON CONFIGURATION
*
-------------------------------------------- **/

'use strict';

module.exports = {
  app:{
    port: '3000'
  },
  database: {
    mysql:  {
    	host:"localhost",
    	database:"apps",
    	username:"root",
    	password:"",
    	port:3306,
    }
  },
  jwt:{
    iss:"http://apps.com",
    signingKey:'apps',
    expiration: (24*60*60*1000)
  }

};
