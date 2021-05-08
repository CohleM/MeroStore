const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");


function connDB(req, res, next) {

	console.log('this is connDB', req.body.dbid);
	try {
		//so this is where we need to add something
		const stores = [
			{ email: "user1@gmail.com", name: "manish" },
			{ email: "user2@gmail.com", name: "sanket" },
		];

	//	let User = "";
	//	let Product = "";
	//	let Payment = "";
		let db = "sanket";
		req.dbid = req.body.dbid;

		//console.log(productModel);
		stores.every((element, index) => {
			if (element.name == db) {
				req.User = userModel[index];
				req.Product = productModel[index];
				req.Payment = paymentModel[index];

				return false;
			} else return true;
		});
		next();
	} catch (e) {
		res.status(400).json({ msg: "connection problem" });
	}
}

module.exports = connDB;
