
console.info('------ stream readable event');
console.info();
const fs = require('fs')

// var rs = fs.createReadStream('./2.txt');
rs=fs.readFile('./2.txt',function(err,data){
	console.log(data.toString());
});

console.log(rs);