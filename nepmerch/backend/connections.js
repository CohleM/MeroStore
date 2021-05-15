const mongoose = require("mongoose");

const { storeModel } = require("./models/store");
require("dotenv").config();

//
//async function getStore() {
//	let ss;
//	await storeModel().then((res) => {
//		 res.find({}).then((store) => {
//			store.forEach((element, index) => {
//				console.log(" this is", index, " and ", element);
//			});
//
//			return store;
//		});
//	});
//
//}
//
async function getStore() {
	let ss;
	const sModel = await storeModel();

	const storeList = await sModel.find({});

//	console.log("storeList ", storeList);
	return storeList;
}

async function connArr () {
	// getStore().then( res => {
	//res.forEach((element) => {

	//console.log('element name ', element.name);
	//});
	//}
	// );
	//
	const storeIDs = await getStore();

	let connectionsArr = [];

	await storeIDs.forEach((element) => {
		uri = process.env.ATLAS_URI1 + element.name;

		conn = makeNewConnection(uri);
		connectionsArr.push(conn);
	});

	return connectionsArr;
}

function makeNewConnection(uri) {
	const db = mongoose.createConnection(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	db.on("error", function (error) {
		console.log(
			`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`
		);
		db.close().catch(() =>
			console.log(`MongoDB :: failed to close connection ${this.name}`)
		);
	});

	db.on("connected", function () {
	//	mongoose.set("debug", function (col, method, query, doc) {
	//		console.log(
	//			`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
	//				query
	//			)},${JSON.stringify(doc)})`
	//		);
	//	});
		console.log(`MongoDB :: connected ${this.name}`);
	});

	db.on("disconnected", function () {
		console.log(`MongoDB :: disconnected ${this.name}`);
	});

	return db;
}
module.exports = {
	
connArr,
};
