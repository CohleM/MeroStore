const Joi = require("@hapi/joi");

//Register Validation

const storeValidation = (data) => {
	//data means req.body
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	const validation = schema.validate(data);
	return validation;
};



module.exports.storeValidation = storeValidation;

