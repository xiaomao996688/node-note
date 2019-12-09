let fs = require('fs')

let ws = fs.createWriteStream('./1.txt',{
	flags:'w',
	mode:0o666,
	autoClose:true,
	highWaterMark:3 ,//默认写是16k，这里设置了3k
	encoding:'utf8',
	start:0
})

// 写入的数据必须是字符串或者buffer
// flag代表是否能继续写
//表示如果缓存区已满，返回false，如果缓存区未满换回true
//按理说如果返回false，就不能再往里面写了，但是如果真的写了
// 数据也不会丢失，会缓存在内存，等缓存区清空之后再从内存里读出来

let flag = ws.write(1+'','utf8',()=>{})//异步
console.log(flag);

flag =ws.write(1+'','utf8',()=>{})
console.log(flag);

flag = ws.write(1+'','utf8',()=>{})
console.log(flag);

// ws.end('ok');//写完后就能不能继续再写

// ws.write('123') //write after end,入过end后继续写会报错

// 抽干方法 当都写入完成后悔触发drain事件
// 必须缓存区满了 满了后被清空才会触发drain事件

ws.on('drain',function(){ // 如果前面已经end，就不能再触发drain
	console.log('drain');
})

// 可读流 配合可写流 写一个pipe方法
// 
// fs.read(文件描述符,读取到哪个Buffer,内容从buffer的哪个位置上开始，读取稳重内容的长度，读取文件的位置)