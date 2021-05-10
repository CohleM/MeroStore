const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	try {




	const token = req.header("x-auth-token");

	if (!token) return res.status(401).json({ msg: "no token" });

	console.log('this is try');
		const decodedValue = jwt.verify(token, "SEcretKey");

		//req.user looks like this

		// {
		//     "id": "5f1c57068882ef2684e5083f",
		//     "iat": 1595693638
		// }
		console.log("Authenticateddddd");
		req.user = decodedValue;
		//console.log(req.user);
		next();
	} catch (e) {

	console.log( 'this is from catch error ', e);
		res.status(400).json({ msg: "token not valid" });
	}
}

module.exports = auth;
