
//const conn1 = require('../server.js');
const mongoose = require("mongoose");
const {userConnection, newConnection} = require('../connections');
//const {userConnection, newConnection} = require('../DB/connections');
const { array } = require("prop-types");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},

	email: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},

	password: {
		type: String,
		require: true,
		min: 6,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	cart: {
		type: Array,
		default: [],
	},
	history: {
		type: Array,
		default: [],
	},
});



const User  = newConnection.model('User',userSchema)
module.exports = User;
