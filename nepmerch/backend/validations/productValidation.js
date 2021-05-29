const Joi = require("@hapi/joi");

//Register Validation

const productValidation = (data) => {
	//data means req.body
	const schema = Joi.object({
		title: Joi.string().min(6).required(),
		description: Joi.string().min(6).required(),
		images: Joi.array(),

		price: Joi.number().integer().required(),
		vendor: Joi.string().min(6),
		inventory: Joi.string().min(6).required(),
		typ: Joi.string().min(6),
	});
	const validation = schema.validate(data);
	return validation;
};

module.exports.productValidation = productValidation;
