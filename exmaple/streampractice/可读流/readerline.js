/*
* @Author: zll
* @Date:   2019-08-31 15:02:39
* @Last Modified by:   zll
* @Last Modified time: 2019-08-31 15:28:26
*/
// 回车换行的意思 先回到行的头，然后再到下一行
// UnIX系统里的换行 \n 
// mac系统里，每行结尾是"carrage return" 即'r'
// windows 是\r\n
let fs = require('fs')
fs.readFile('./2.txt',function(){

});
const reader = new LineReader()
reader.on('newLinstener',(data)=>{
	
})