const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 6556;

const { fork } = require('child_process');

const path = require('path'), projectPath = path.resolve( process.cwd());

//const forked = fork('../nepalimerchandise/script.js',  { 'cwd': projectPath}
//);
const forked = fork('../nepmerch/app.js',  { 'cwd': '../nepmerch' }
);


//forked.on('message', (msg) => {
//  console.log('Message from child', msg);
//});

forked.send({ hello: 'world' });

//const { spawn } = require('child_process');
//
//const child = spawn('nodemon', ['app']);
//
//
//child.on('exit', function (code, signal) {
//  console.log('child process exited with ' +
//              `code ${code} and signal ${signal}`);
//});
//
//child.stdout.on('data', (data) => {
//  console.log(`child stdout:\n${data}`);
//});
//
//child.stderr.on('data', (data) => {
//  console.error(`child stderr:\n${data}`);
//});

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
