e// 可读流俩种模式flowing

// flowing,可读流自动从系统底层读取数据，并通过EventEmitter接口的事件尽快将数据提供给应用
// paused：必须显示掉stream.read()方法从流中读取数据
// 所有初始工作模式为paused 的Readbale
// 可以通过下面三种途径切换到flowing模式
// 监听data事件
// 调用stream.resume()方法
// 调用stream.pipe()方法将数据发送到Writable
// 可读流可以通过途径切换到pause模式

let fs = require('fs')
let rs = fs.createReadStream('1.txt');
// 流动模式不缓存，直接读取下次的数据
// 而且没有消费，数据就白白丢掉了
// rs.on('data',chunk=>{
// 	console.log(chunk);
// })
// rs.on('end',function(){
// 	console.log('end');
// })

// 流动模式一直流
// 暂停模式，流一下停一下
// 当监听readable事件的时候，会进入暂停模式
// 当监听readabe事件的时候，可读流会马上去底层读取文件,然后把读到的文件放在缓存区里
// 源码位置
// const state = this._readableState
// self.read(0),只填充了缓存区，不会发射data事件，
// 但是会发射stream.emit('readable')事件
rs.on('readable',function(){
	// length就是缓存区数据的大小
	console.log(rs._readableState.length);
	// read如果不加参数表示读取整个缓存区数据
	//读取一个字段，如果可读流发现你要读的字节小于等于缓存字节大小，直接返回let ch =rs.read(1)
	let ch = rs.read(1);
	console.log(ch);
	// 当你读取完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小了，则会立马再次读取填满，最高水位线
	let ch1 = rs.read(1);
	console.log(ch1);
	setTimeout(function(){
			console.log(rs._readableState.length);
	});
})