// let fs = require('fs')

// fs.readFile('./1.txt',(err,data)=>{
//   console.log(data)//31 32 33 0d 0a 34 35 36 0d 0a 37 38 39
// })
// 
/**
 *  我们选择可以写一个类，然后可以传入一个文件路径得到类的实力，然后我们可以监听它的newLine事件，当这个读取到一行的时候，就会想歪发射newLine事件，当读取到结束的时候会发射end事件。
 *  
 */
let EventEmitter = require('events')
let util = require('util')

const NEW_LINE =0x0A; // /n
const RETURN =0x0D;// /r
function LineReader(){
	EventEmitter.call(this)
	this._reader = fs.createReadStream(path);
	// 当给一个对象添加一个新的监听函数时候会触发newListener事件
	this.on('newListener',(type,listener)=>{
		// 如果你添加了newLine和监听，那么就开始读取文件内容，并按行开始发射数据
		if(type == 'newLine'){
			// 当我们监听了一个可读流的readable的事件，流会调用底层读取文件的API方法填充缓存区，填充完之后向外发射readable事件
			this._reader.on('readable')
			
		}
	})
}
util.inherits(LineReader, EventEmitter);