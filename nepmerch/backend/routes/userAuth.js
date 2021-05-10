const router = require("express").Router();


const { paymentModel  } = require("../models/payment");
const { userModel }  = require("../models/user");
const { productModel}  = require("../models/product");

const bcrypt = require("bcryptjs");
const {
	registerValidation,
	loginValidation,
} = require("../validations/userValidation");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const connDB  = require("../middlewares/connectDB");
const asnc = require("async");


router.route("/").get(auth, (req, res) => {
	res.send("whaup bro");

	console.log(req.user);
});


router.post("/sampletest", connDB, (req, res) => {
	
	res.send(req.query.store );

	console.log('This is sampleTest req', req.User);
});

//const product = require("../models/product");
const stores = [
	{ email: "user1@gmail.com", name: "manish" },
	{ email: "user2@gmail.com", name: "sanket" },
];

	
let User = '';
let Product = '';
let Payment  = '';
let db = 'sanket';


//console.log(productModel);
stores.every( (element, index) => {
	if(element.name == db) {
		User = userModel[index];
		Product = productModel[index];
		Payment  = paymentModel[index];

		return false;
	}
	else return true;
})



//const product = require("../models/product");
	






router.post("/register",connDB, async (req, res) => {
	console.log("this is body :", req.body);
	const User = req.User;
	const Product = req.Product;

	const { error } = registerValidation(req.body);

	// if (error) {
	// 	console.log(error);
	// 	return res.status(400).json(error.details[0].message);
	// }

	if (error)
		return res.status(400).send({
			message: error.details[0].message,
			type: error.details[0].path[0],
		});
	//	if (error) return res.status(400).send(error.details[0].message);

	//checkIf email already exists
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists)
		return res
			.status(400)
			.send({ message: "email already exists", type: "email" });
	//   res.send(error);

	//hashing password
	const salt = await bcrypt.genSaltSync(10);
	const hashPassword = await bcrypt.hashSync(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});
	//console.log(user);

	// await user.save()
	//     .then((user) => res.send(user))
	//     .catch(err =>  res.status(400).send(err))

	await user
		.save()
		.then((user) => {
			//Signing jwt token
			jwt.sign(
				//payload : the thing we need to take in to verify token
				{ id: user._id },
				"SEcretKey",
				(err, token) => {
					if (err) res.status(400).send(err);
					else
						res.json({
							token,
							user,
						});
				}
			);
		})
		.catch((err) => res.status(400).send(err));
});

router.route("/login").post(connDB, async (req, res) => {
	//loginValidation
	//
	//
	const User = req.User;
	const Product = req.Product;


	console.log('this is from login', req.query.sample);
	const { error } = loginValidation(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	if (error)
		return res.status(400).send({
			message: error.details[0].message,
			type: error.details[0].path[0],
		});

	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(400)
				.send({ message: "email doesn't  exist", type: "email" });

		//   res.send(error);

		const checkIf = await bcrypt.compareSync(req.body.password, user.password);
		if (!checkIf)
			return res
				.status(400)
				.send({ message: "password doesn't match", type: "password" });

		jwt.sign(
			//payload : the thing we need to take in to verify token
			{ id: user._id },
			"SEcretKey",
			(err, token) => {
				if (err) res.status(400).send(err);
				else
					res.json({
						token,
						user,
					});
			}
		);
	} catch (err) {
		res.status(400).send(err);
	}
});

//Checking if authorization works
router.get("/getinfo", auth,connDB,  async (req, res) => {
	const User = req.User;
	const Product = req.Product;
	try {
		console.log("there you go");
		const user = await User.findById(req.user.id);

		if (!user) throw Error("User doesn't exist");
		else { res.json(user); }
	} catch (e) {
		res.status(400).json({
			msg: e.message,
		});
	}
});
//http://localhost:5000/users/addToCart/product_by_id?id=${productId}

router.get("/addToCart", auth,connDB, async (req, res) => {
	//console.log(req.user.id);
	//console.log("gg", req.user.id);
	// console.log("id", req.user.id);
	// console.log("routeeexxx");
	//console.log("query id", req.query.id);
	//console.log('this is from add to card ', req.query.storeName);
	const User = req.User;
	const Product = req.Product;


	await User.findOne({ _id: req.user.id })
		.then((userInfo) => {
			let flag = false;
			userInfo.cart.forEach((item) => {
				if (item.id == req.query.id) {
					flag = true;
				}
			});

			if (flag) {
				User.findOneAndUpdate(
					{ _id: req.user.id, "cart.id": req.query.id },
					{ $inc: { "cart.$.quantity": 1 } },
					{ new: true }
				)
					.then((userId) => {
						res.status(200).json(userId);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				User.findOneAndUpdate(
					{ _id: req.user.id },
					{
						$push: {
							cart: {
								id: req.query.id,
								quantity: 1,
								date: Date.now(),
							},
						},
					},
					{ new: true }
				)
					.then((userId) => {
						res.status(200).json(userId);
					})
					.catch((err) => {
						console.log(err);
					});
			}
			//	res.status(200).json(userInfo);
		})
		.catch((err) => console.log(err));
});

//removeFromCart
//http://localhost:5000/users/removeFromCart?id=${productId}

router.get("/removeFromCart", auth,connDB, async (req, res) => {
	const User = req.User;
	const Product = req.Product;


	console.log("this is DB for rm");
	User.findOneAndUpdate(
		{ _id: req.user.id },
		{
			$pull: {
				cart: { id: req.query.id },
			},
		},
		{ new: true }
	)
		.then((userInfo) => {
			let cart = userInfo.cart;
			let array = cart.map((item) => {
				return item.id;
			});
			Product.find({ _id: { $in: array } }).exec((err, cartDetail) => {
				if (err) res.status(400).send(err);
				else
					res.status(200).json({
						cartDetail,
						cart,
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/paymentSuccess", auth,connDB,  async (req, res) => {
	const User = req.User;
	const Product = req.Product;
	const Payment = req.Payment;

	console.log("paymentSucceeBackenddd");
	let history = [];
	let transactionDetails = {};

	//making history of user
	req.body.cartDetail.forEach((item) => {
		history.push({
			id: item._id,
			name: item.title,
			price: item.price,
			quantity: item.quantity,
			dataOfPurchase: Date.now(),
			paymentId: req.body.payment.paymentID,
		});
	});

	//Now making payment details as per the payment model

	transactionDetails.user = {
		id: req.user.id,
	};
	transactionDetails.data = req.body.payment;
	transactionDetails.product = history;

	//Now save it in the user database, push history and empty the cart

	await User.findOneAndUpdate(
		{
			_id: req.user.id,
		},
		{
			$push: { history: history },
			$set: { cart: [] },
		},
		{ new: true }
	)
		.then((user) => {
			const paymentDetails = new Payment(transactionDetails);
			paymentDetails
				.save()
				.then((doc) => {
					//now make  the sold varible of Product model

					// let products = [];
					// doc.product.forEach((item) => {
					// 	products.push({ id: item.id, quantity: item.quantity });

					// 	asnc.eachSeries(
					// 		products,
					// 		(it, callback) => {
					// 			Product.updateOne(
					// 				{
					// 					_id: it.id,
					// 				},
					// 				{
					// 					$inc: { sold: it.quantity },
					// 				},
					// 				{ new: false },
					// 				(err, updated) => {
					// 					if (err)
					// 						return res.status(400).json({ success: false, err });
					// 					return res.status(200).json({
					// 						success: true,
					// 						user: user,
					// 						cartDetail: [],
					// 					});
					// 				}
					// 			);
					// 		},
					// 		(err) => {
					// 			if (err) return res.status(400).json({ success: false, err });
					// 			return;
					// 		}
					// 	);
					// });

					return res.status(200).json({
						success: true,
						user: user,
						cartDetail: [],
					});
				})
				.catch((err) => {
					return res.status(400).json({ success: false, err });
				});
		})
		.catch((err) => {
			return res.status(400).json({ success: false, err });
		});
});
module.exports = router;
