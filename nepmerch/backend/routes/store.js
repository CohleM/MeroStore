const router = require("express").Router();
const multer = require("multer");
const {  Product } = require("../models/product");
//const product = require("../models/product");
//product/product_by_id?id=${productId}&type=single


router.route("/getstore").post(async (req, res) => {
	//loginValidation


	try {
		res.status(200).send(req.body);	
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
