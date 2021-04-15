const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
//mongoose.connect(uri, {
//	useNewUrlParser: true,
//	useCreateIndex: true,
//	useUnifiedTopology: true,
//});
//
//const connection = mongoose.connection;
//connection.once("open", () => {
//	console.log("Mongoose database connection established");
//});
//
//mongoose.set("useFindAndModify", false);
//// const exerciseRouter = require('./routes/exercises');
//// const usersRouter = require('./routes/users');
//
//const userAuthRouter = require("./routes/userAuth");
//const product = require("./routes/product");
//// app.use('/exercises', exerciseRouter);
//// app.use('/users', usersRouter);
//app.use("/users", userAuthRouter);
//app.use("/product", product);
//
////var assetsPath = path.join(__dirname, '../uploads');
////this shit hurts
////hurt me for 2days
////be careful of file path structure
//app.use("/uploads", express.static("../uploads"));
//
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
	console.log(`Server is running on : ${port} `);
})
