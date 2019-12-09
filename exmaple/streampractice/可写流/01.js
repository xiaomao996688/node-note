// 可以写流，就是往里面写

const fs = require('fs')

// 当你往科协里了写数据的时候，不会立刻写入文件的，而是会先写入缓存区，换区的大小就是highWaterMark，默认值是16k。然后等缓存区满了只会再次真正的写入文件里。


let ws = fs.createWriteStream('1.txt',{
	flags:'w',
	mode:0o666,
	start:0,
	highWaterMark:3
})

//如果缓存区已满，返回false，如果缓存区未满换回true
//按理说如果返回false，就不能再往里面写了，但是如果真的写了
// 数据也不会丢失，会缓存在内存，等缓存区清空之后再从内存里读出来
let flag = ws.write('1');
console.log(flag);
flag = ws.write('2');
console.log(flag);
flag = ws.write('3');
console.log(flag);
flag = ws.write('4');
console.log(flag);
flag = ws.write('5')
ws.on('drain',()=>{
	console.log('drain');
})
ws.end('结束');
ws.on('finish',()=>{
	console.log('写入完成')
})