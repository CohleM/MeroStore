const router = require("express").Router();
const multer = require("multer");
const { Store } = require("../models/store");

const bcrypt = require("bcryptjs");

const {

	storeValidation,
} = require("../validations/storeValidation");








router.post("/register", async (req, res) => {
	console.log("this is body :", req.body);


	const { error } = storeValidation(req.body);

	if (error)
		return res.status(400).send({
			message: error.details[0].message,
			type: error.details[0].path[0],
		});
	//	if (error) return res.status(400).send(error.details[0].message);

	//checkIf email already exists
	const emailExists = await Store.findOne({ email: req.body.email });
	if (emailExists) { 
		return res
			.status(400)
			.send({ message: "email has already been used ", type: "email" });

	}

	const storeExists = await Store.findOne({ name : req.body.name });
	if (storeExists) { 
		return res
			.status(400)
			.send({ message: "store with this name already exists ", type: "storename" });

	}
	//   res.send(error);

	//hashing password
	const salt = await bcrypt.genSaltSync(10);
	const hashPassword = await bcrypt.hashSync(req.body.password, salt);

	const store  = new Store({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});
	//console.log(user);

	// await user.save()
	//     .then((user) => res.send(user))
	//     .catch(err =>  res.status(400).send(err))

	await store
		.save()
		.then((store) => {
						res.json({
							
							store,
						});
			
		})
		.catch((err) => res.status(400).send(err));
});


module.exports = router;
