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



process.on('message', (msg) => {
	console.log('Message from parent:', msg);
});

let counter = 0;

setInterval(() => {
	process.send({ counter: counter++ });
}, 1000);
