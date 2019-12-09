const fs = require('fs')
const path = require('path')
let aaa = path.join(__dirname,'1.txt')
// console.info(aaa);
let rs = fs.createReadStream(aaa,{
	highWaterMark:3
});
// readable事件处理函数
// 当一个数据块可以从流中被读取时，
// 则会触发一个readable事件

rs.on('readable',function(){
	console.log(`${rs.read()}`);
	console.info('readable event emitted.');
	console.info();
})
