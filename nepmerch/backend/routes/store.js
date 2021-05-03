const router = require("express").Router();
const multer = require("multer");
const { Product } = require("../models/product");
const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");


//const product = require("../models/product");
//product/product_by_id?id=${productId}&type=single

router.route("/connectStore").post(async (req, res) => {
	//loginValidation
	const stores = [
		{ email: "user1@gmail.com", name: "manish" },
		{ email: "user2@gmail.com", name: "sanket" },
	];

	let User = "";
	let Product = "";
	let Payment = "";
	let db = "sanket";

	//console.log(productModel);
	stores.every((element, index) => {
		if (element.name == db) {
			User = userModel[index];
			Product = productModel[index];
			Payment = paymentModel[index];

			return false;
		} else return true;
	});

	try {
		res.status(200).send(req.body);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
