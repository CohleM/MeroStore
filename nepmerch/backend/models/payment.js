const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { connectionsArr } = require("../connections");
const PaymentSchema = mongoose.Schema(
	{
		user: {
			type: Array,
			default: [],
		},
		data: {
			type: Array,
			default: [],
		},

		product: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

//creating index for searching items

//const Payment = mongoose.model("Payment", PaymentSchema);
//module.exports = { Payment };
//

//module.exports = User;


let paymentModel  = [];
connectionsArr.forEach((element, index) => {
	paymentModel.push(element.model("Payment" + index, PaymentSchema));
});


//async function paymentModel() {
//	let payment = [];
//	await connArr().then((res) => {
//		res.forEach((element, index) => {
//			payment.push(element.model("Payment" + index, PaymentSchema));
//		});
//	});
//
//	return payment;
//}
//
//module.exports = User;
module.exports = { paymentModel };
