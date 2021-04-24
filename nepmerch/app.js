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


//
//process.on('message', (msg) => {
//	console.log('Message from parent:', msg);
//});
//
//let counter = 0;
//
//setInterval(() => {
//	process.send({ counter: counter++ });
//}, 1000);
//
//

const { spawn } = require('child_process');

var path = require('path'),
        projectPath = path.resolve(process.cwd() );


console.log(projectPath);
const child = spawn('npm', ['run','dev'], {'cwd': projectPath});
//const child = spawn('ls', {'cwd': projectPath});



console.log('this is npmerch');

child.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

child.on('error', (error) => {
  console.error(`error: ${error.message}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});




process.on('message', (msg) => {
	console.log('Message from parent:', msg);
});
//
//let counter = 0;
//
//setInterval(() => {
//	process.send({ counter: counter++ });
//}, 1000);
