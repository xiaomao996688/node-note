/*
* @Author: zll
* @Date:   2019-08-31 15:48:32
* @Last Modified by:   zll
* @Last Modified time: 2019-08-31 16:02:25
*/

let fs = require('fs')

let ws = fs.createWriteStream('./1.txt',{
	highWaterMark:3,
	flags:'w',
	mode:0o666,
	start:0,
	encoding: 'utf8',
	autoClose: true//当流写完后自动关闭文件
});
let n = 9
ws.on('error',(err)=>{
	console.log(err);
})
function write() {
	let flag = true;

	while(flag && n > 0)
	{
		flag = ws.write(n+"")
		n--
		console.log(flag);
	}
	ws.once('drain',()=>{
		console.log('drain');
		write()
	})
}
write()