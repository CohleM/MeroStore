const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");

const { Store  } = require("../models/store");

async function connDB(req, res, next) {

	console.log('this is from connDB ', req.query.storeName);
	//console.log('this is connDB', req.body.dbid);
	//
	//console.log('this is connDB', req.query.store);
	try {
		//so this is where we need to add something
		const stores = [
			{ email: "user1@gmail.com", name: "manish" },
			{ email: "user2@gmail.com", name: "sanket" },

			{ email: "user3@gmail.com", name: "userInformation" },
		];

	//	let User = "";
	//	let Product = "";
	//	let Payment = "";
		//let db = "manish"; 
		let db = req.query.storeName;



		await Store.find({}).then((store) => {
	store.forEach (( element, index  ) => {
		if(element.name == db) {

		console.log('checking', element.name , ' > index ', index , 'db: ', db );
				req.User = userModel[index];
				req.Product = productModel[index];
				req.Payment = paymentModel[index];



		}

	} );
	
	})
		

		//console.log(productModel);
		
		next();
	} catch (e) {

		console.log('this is from connectDB' , e);
		res.status(400).json({ msg: "connection problem" });
	}
}

module.exports = connDB;
