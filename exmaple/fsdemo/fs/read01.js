// a append  mode:权限位
// 编码是在要把数值转成2进制的时候用的
const fs = require('fs')
fs.writeFile('./1.txt','readFile',{encoding:'utf8',flag:'a',mode:'666'},(err)=>{
		if(err)
		{
			console.error(err)
		}
})

/*
readFile
和
writeFile
都是对文件整体操作的
当文件大于内存的时候
是无法这样操作的
性能非常低
*/
