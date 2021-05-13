const router = require("express").Router();
const multer = require("multer");
//const {  Product } = require("../models/product");
const { productModel } = require("../models/product");
//const product = require("../models/product");
//const stores = [
//	{ email: "user1@gmail.com", name: "manish" },
//	{ email: "user2@gmail.com", name: "sanket" },
//];
//
//
//let Product = '';
//let db = 'sanket';
//
//
////console.log(productModel);
//stores.every( (element, index) => {
//	if(element.name == db) {
//		Product = productModel[index];
//		return false;
//	}
//	else return true;
//});

router.route("/pr").post(async (req, res) => {
	//loginValidation

	try {
		res.status(200).send(productModel);
	} catch (err) {
		res.status(400).send(err);
	}
});

const auth = require("../middlewares/auth");
const connDB = require("../middlewares/connectDB");

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== ".jpg" || ext !== ".png") {
			return cb(res.status(400).end("only jpg, png are allowed"), false);
		}
		cb(null, true);
	},
});

var upload = multer({ storage: storage }).single("file");

router.route("/hello").post((req, res) => {
	console.log(req.body.name);
	res.json(req.body.name);
});

router.post("/uploadImage", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
			return res.json({ success: false, err });
		}

		return res.json({
			success: true,
			image: res.req.file.filename,
		});
	});
});

router.post("/uploadProduct", connDB, (req, res) => {
	//console.log(req.user);
	const product = new req.Product(req.body);
	product.save((err) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ success: false, err });
		}

		return res.status(200).json({ success: true });
	});
});

// router.route("/uploadProduct").post((req, res) => {
// 	const product = new Product(req.body);
// 	product.save((err) => {
// 		if (err) {
// 			console.log(err);
// 			return res.status(400).json({ success: false, err });
// 		}

// 		return res.status(200).json({ success: true });
// 	});
// });

router.route("/getProducts").post(connDB, (req, res) => {
	let order = req.body.order ? req.body.order : "desc";
	let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
	let skip = parseInt(req.body.skip);
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let filters = req.body.filters;
	let term = req.body.searchItem;
	let findArgs = {};

	const Product = req.Product;
	console.log('this is product yohooo', Product);
	for (let key in req.body.filters) {

		if (req.body.filters[key].length > 0) {
			//console.log(req.body.filters[key])
			if (key == "price") {
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1],
				};
			} else {
				findArgs[key] = req.body.filters[key];
				console.log(findArgs);
			}
		}
	}
	// console.log(req.body.filters["continents"])
	console.log(findArgs);
	if (term) {
		Product.find(findArgs)
			.find({ $text: { $search: term } })
			.skip(skip)
			.limit(limit)
			.exec((err, products) => {
				if (err) {
					console.log(err);
					return res.status(400).json({ success: false, err });
				}

				return res
					.status(200)
					.json({
						success: true,
						products,
						postSize: products.length,
					});
			});
	} else {
		Product.find(findArgs)
			.skip(skip)
			.limit(limit)
			.exec((err, products) => {
				if (err) {
					console.log(err);
					return res.status(400).json({ success: false, err });
				}

				return res
					.status(200)
					.json({
						success: true,
						products,
						postSize: products.length,
					});
			});
	}
});

//product/product_by_id?id=${productId}&type=single
router.route("/product_by_id").get(connDB, (req, res) => {
	const type = req.query.type;
	const Product = req.Product;
	let productIds = req.query.id;

	//console.log(productIds);

	if (type === "array") {
		//console.log(req.query.id);

		let ids = req.query.id.split(",");
		productIds = [];
		productIds = ids.map((item) => {
			return item;
		});
	}

	Product.find({ _id: { $in: productIds } }).exec((err, product) => {
		if (err) res.status(400).send(err);
		else res.status(200).send(product);
		//console.log(product);
	});
});

module.exports = router;
