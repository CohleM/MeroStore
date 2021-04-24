const { spawn } = require('child_process');

var path = require('path'),
        projectPath = path.resolve(process.cwd() );


console.log(projectPath);
const child = spawn('npm', ['run','dev'], {'cwd': projectPath});


console.log('this is npmerch');

child.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});



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
