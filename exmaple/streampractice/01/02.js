const fs = require('fs');
const rr = fs.createReadStream('1.txt');
rr.on('readable', () => {
  console.log(`读取的数据: ${rr.read()}`);
});

rr.on('data',function(chunk){
	console.log('data event emitted');
	console.info();
})


rr.on('end', () => {
  console.log('结束');
});