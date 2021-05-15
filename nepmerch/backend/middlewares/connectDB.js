const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");


const { dbModule  } = require("../models/store");


function cDB() {

	console.log('dbModule connectDB', dbModule.db);

}

 function connDB(req, res, next) {


	//console.log('this is from connDB ', req.query.storeName);

	try {
		//so this is where we need to add something
		//
		const stores = dbModule.db; 
		const userM =  paymentModel;
		const productM =  productModel;
		const paymentM  =  paymentModel;
//		const stores = [
//			{ email: "user1@gmail.com", name: "manish" },
//			{ email: "user2@gmail.com", name: "sanket" },
//
//			{ email: "user3@gmail.com", name: "userInformation" },
//		];
//
	//	let User = "";
	//	let Product = "";
	//	let Payment = "";
		//let db = "manish"; 
		let db = req.query.storeName;
		

		//console.log(productModel);
		stores.every((element, index) => {
			if (element.name == db) {
				req.User = userM[index];
				req.Product = productM[index];
				req.Payment = paymentM[index];

				return false;
			} else return true;
		});
		next();
	} catch (e) {
		res.status(400).json({ msg: "connection problem" });
	}
}

module.exports = connDB;
