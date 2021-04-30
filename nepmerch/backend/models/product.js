const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { userConnection } = require("../connections");

const { connectionsArr } = require('../connections');
const productSchema = mongoose.Schema(
	{
		writer: {
			///type : Schema.Types.ObjectId,
			type: String,
			ref: "User",
		},
		title: {
			type: String,
			maxlength: 50,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
			default: [],
		},

		continents: {
			type: Number,
			default: 1,
		},
		sold: {
			type: Number,
			maxlength: 100,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

//creating index for searching items
productSchema.index(
	{
		title: "text",
		description: "text",
	},
	{
		//weight defines which will be searched first , bigger has higher priority
		weights: {
			title: 5,
			description: 1,
		},
	}
);

//const Product = userConnection.model('Product',productSchema)
//module.exports = { Product };
//
//
let productModel = [];
connectionsArr.forEach((element, index) => {
	productModel.push(element.model("Product" + (index), productSchema));
});


console.log('this is productmodel', productModel);
//module.exports = User;
module.exports =  { productModel };
