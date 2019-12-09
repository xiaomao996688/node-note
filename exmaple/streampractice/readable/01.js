const fs = require('fs')

const rs = fs.createReadStream('./1.txt');

rs.on('readable',()=>{
	console.log('readable');
	console.info();
})
rs.on('end',()=>{
	console.info('a');
})