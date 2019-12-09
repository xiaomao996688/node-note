
let fs = require('fs')

let rs = fs.createReadStream('./1.txt',{
	mode:0o666,
	encoding:'utf8',
	highWaterMark:3,
	start:0
})
let ws = fs.createWriteStream('./2.txt',{
	mode:0o666,
	encoding:'utf8',
	highWaterMark:3,
	start:0
})
rs.on('data',(data)=>{
	console.log(data);
	let flag = ws.write(data)
	if(!flag)
	{
		rs.pause()
	}
})
ws.on('drain',()=>{
	rs.resume()
})