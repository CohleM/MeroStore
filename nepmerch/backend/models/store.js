const mongoose = require("mongoose");
const { storeConnection } = require("../storeConnection");
const { array } = require("prop-types");
const storeSchema = new mongoose.Schema({
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

});

const Store  = storeConnection.model('Store',storeSchema)

//module.exports = User;
module.exports = { Store };
