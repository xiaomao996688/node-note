let fs = require('fs')


let rs = fs.createReadStream('./1.txt',{
	highWaterMark:3
});
rs.on('data',function(data){
	console.log(data);
})

rs.on('end',function(){
	console.log('end');
})
// 流动模式模式不缓存，直接发射，然后读取下次数据。如果你用流动模式，而没有消费，数据就白丢失了。
// 当你监听readable事件的时候，会进入暂停模式
// 当监听readable事件的时候,可读流会马上去向底层读取文件,然后把读到的文件放在缓存区里const state = this._readableState
// self.read(0);只填充缓存，但是并不会发送data事件
rs.on('readable',function(){
// read如果不加参数表读取整个缓存数据
// 读取一个字段,如果可读流发现你要读取字节小于等于缓存字节大小,则直接返回
// rs.read()
})