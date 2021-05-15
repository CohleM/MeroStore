const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");


const { storeModel } = require("../models/store");

async function getStore() {
	let ss;
	const sModel = await storeModel();

	const storeList = await sModel.find({});

//	console.log("storeList ", storeList);
	return storeList;
}


async function connDB(req, res, next) {

	console.log('this is from connDB ', req.query.storeName);

	try {
		//so this is where we need to add something
		//
		const stores = await getStore();	
		const userM = await paymentModel();
		const productM = await productModel();
		const paymentM  = await paymentModel();
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
