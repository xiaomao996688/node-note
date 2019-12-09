
const fs = require('fs')

// fs.createReadStream()方法创建可读(Readable)流
let rs = fs.createReadStream('1.txt',{flags:'r',highWaterMark:3}) 


// 流Stream 模块---readable事件处理函数

rs.on('readable',function(){
	console.log('readble event emitted');
	console.info();
})
rs.on('data',function(chunk){
	console.log('data event emitted');
	console.info();
})
rs.on('finish',function(){
	console.log('finish');
})
rs.on('end',function(){
	console.log('end event emitted');
	console.info();
})
