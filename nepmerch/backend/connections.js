const mongoose = require("mongoose");

const { Store  } = require("./models/store");
require("dotenv").config();




async function getStore () {

	let ss; 
	await Store.find({}).then((store) => {
	store.forEach (( element, index  ) => {

		console.log(' this is' , index, ' and ', element );


	} );
	
	});

return ss;
}

let ss = getStore();


console.log('this is yolooooo', ss);

const stores = [
	{ email: "user1@gmail.com", name: "manish" },
	{ email: "user2@gmail.com", name: "sanket" },

	{ email: "user3@gmail.com", name: "userInformation" },
];

let connectionsArr = [];

stores.forEach((element) => {
	uri = process.env.ATLAS_URI1 + element.name;

	conn = makeNewConnection(uri);
	connectionsArr.push(conn);
});

const uri1 = process.env.ATLAS_URI1;
const uri2 = process.env.ATLAS_URI2;

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
		mongoose.set("debug", function (col, method, query, doc) {
			console.log(
				`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
					query
				)},${JSON.stringify(doc)})`
			);
		});
		console.log(`MongoDB :: connected ${this.name}`);
	});

	db.on("disconnected", function () {
		console.log(`MongoDB :: disconnected ${this.name}`);
	});

	return db;
}

const userConnection = makeNewConnection(uri1);
const newConnection = makeNewConnection(uri2);

//module.exports = {
//	userConnection,
//	newConnection,
//
//};
//

module.exports = {
	connectionsArr,
};
