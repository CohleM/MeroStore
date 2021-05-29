const mongoose = require("mongoose");
const { createStoreConnection } = require("../storeConnection");
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

console.log("createStoreconn", typeof createStoreConnection);

async function storeModel() {
	let Store;
	await createStoreConnection().then((res) => {
		Store = res.model("Store", storeSchema);
		console.log("this is store model ", Store);
	});

	const storeList = await Store.find({});
//	console.log('storeList', storeList);	
	const result = { storeList, Store };
	return result;
}

const dbModule = { db: null, store:null };

dbModule.promise = storeModel().then( (val) => { dbModule.db = val.storeList;
		dbModule.store = val.Store;
})

//module.exports = User;
module.exports = { dbModule };
