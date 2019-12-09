let fs = require('fs')

let rs = fs.createReadStream('./1.txt',{
	
	highWaterMark:3
});