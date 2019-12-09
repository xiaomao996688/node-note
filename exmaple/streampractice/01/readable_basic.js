
const fs = require('fs')

var rs = fs.createReadStream('./1.txt')

rs.setEncoding('utf8')

rs.on('readable',function(){
	console.info('readable event emitted');
	console.info();
})

rs.on('data',function(chunk){
	console.log('data event emitted');
	console.info();
})
rs.on('error',function(){
	console.log('error event emitted');
	console.info();
})
rs.on('end',function(){
	console.log('end event emitted');
	console.info();
})

rs.on('close',function(){
	console.info('close event emitted');
	console.info();
})