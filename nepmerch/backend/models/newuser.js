const {conn1, conn2 } = require('../server');
const mongoose = require("mongoose");
const userSchema =  new mongoose.Schema({
  title : { type : String, default : 'model in testA database' }
  });



const usermodel = conn2.model('User1', userSchema);

// The alternative to the export model pattern is the export schema pattern.
module.exports = usermodel;

