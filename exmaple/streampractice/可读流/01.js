
// 可读流
// 缓存区在内存中能提升效率
// 默认为64k，也就 是64个字节
const  fs = require('fs')

// 通过创建一个可读流
// 设置缓存区大小,字节
let rs = fs.createReadStream('1.txt',{
	highWaterMark:3,
	flags:'r', //
	mode:0o666,
	encodeing:'utf8',
	start:  3,  //从索引为3的位置开始读
	// 唯一一个包括结束索引的
	end:8 //读到索引为8的位置结束.

})
// 被触发2次第一次456第二次789
// 
rs.on('open',function(){
	console.log('文件打开');
})
// 设置编码
rs.setEncoding('utf8')
// 默认情况下，会不停的读数据，会触发data事件，触发完data事件，再次读数据
// 希望有流有一个暂停和恢复触发的机制

// 监听它的data时间，当你一旦开始监听data事件的时候,流就可以读取文件内容并且发射data
rs.on('data',function(data){
	console.log(data);
	// 暂停读取和发射data事件
	rs.pause()
	setTimeout(function(){
		//恢复读取并触发data事件
		rs.resume() 
	},2000)
})
// 如果读取文件出错了会触发error事件
rs.on('error',function(err){
	console.log(err);
})
rs.on('end',function(){
	console.log('end');
})
rs.on('close',function(){
	console.log('文件关闭');
})