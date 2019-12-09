/*
* @Author: zll
* @Date:   2019-08-31 15:04:50
* @Last Modified by:   zll
* @Last Modified time: 2019-08-31 15:21:15
*/
// 写在写一个类，然后可以传入一个文件路径得到实例
// 然后我们可以监听它的newLine事件，当这个行读取器每次读到一行的时候,

let  EventEmitter = require('event');
let util = require('util');
let fs = require('fs')

// 在ACSII中 对应
const NEW_LINE = 0x0A // /n
const RETURN = 0x0D // /r

function LineReader (path) {

	EventEmitter.call(this);

	this._reader = fs.createReadStream(path); 
	// 当给一个对象添加一个新的监听函数时候会触发newListener事件
	this.on('newListener', (type, listener) => {
		// 如果说你添加了newLine和监听，那么就开始读取文件内容并安航发射数据
		if(type == 'newLine')
		{
			// 当我们监听了一个可读流的readeable的事件，会调用底层的读取文件的API方法填充缓存区,填充完之后向外发射readable事件
			let buffers = []
			this._reader.on('readable', () => {
				let char // buffer 
				while(null != (char = this._reader.read(1))){
					switch (char[0]){
					case NEW_LINE:
					break;
					case RETURN:
					this.emit('newLine',Buffer.from(buffers))
					let nChar = this._reader.read(1)
					if(nChar[0] == NEW_LINE)
					{
						buffers.push(nChar[0])
					}
					break;
					default :
					buffers.push(char[0])
					}

				}
			})
		}
	})
}