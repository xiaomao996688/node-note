let fs  = require('fs')

let rs = fs.createReadStream('./1.txt',{
	 highWaterMark:3
});

rs.on('data',function(data){
	console.log(data);
})

rs.on('end',function(){
	console.log('end');
})