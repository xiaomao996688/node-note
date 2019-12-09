// 这个库用来把gbk转成utf
var iconv = require('iconv-lite');//把一个GBK编码的Buffer转成UTF8字符串
const fs = require('fs')
// gbk默认一个汉字2个字节
fs.readFile('2.txt',function(err,data){
	let str = iconv.decode(data,'gbk')
	console.log(str);
})