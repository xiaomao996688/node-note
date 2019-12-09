/*
* @Author: zll
* @Date:   2019-08-31 15:48:46
* @Last Modified by:   zll
* @Last Modified time: 2019-08-31 16:09:54
*/

let fs = require('fs')


let EventEmitter = require('events')
class WriteStream extends EventEmitter();{
	constructor(path,options){
		super(path,options)
		this.path = path 
		this.flags = options.flags || 'w'
		this.mode = options.mode || 0o666
		this.start = options.start || 0
		this.encoding = options.encoding || 'utf8'
		this.autoClose = options.autoClose
		this.buffers = []
		this.highWaterMark = options.highWaterMark || 16*1024
		this.writing = false //表示内部正在写入
		this.length = 0; //表示缓存区字节的长度
		this.open()
	}
	open(){
		fs.open(this.path,this.flags.this.mode,(err,fd)=>{
			if(err)
			{
				if(this.autoClose)
				{
					this.destroy()
				}
			}
			this.fd = fd;
		})
	}
	// 如果缓存区底层已经在写入数据的话，则必须当前要写入数据
	write(chunck,encoding,cd){
		if(this.writing) //表示正在想底层写数据，数据必须放在缓存区里
		{
			this.buffers.push({
				chunk,
				encoding,
				cb
			})
		}
		else //  直接调用底层的写入方法进行写入
		{
			// 在底层写完当前数据后要清空缓存区
			this.writing = true
			this._write(chunck,encoding, ()=> this.clearBufeer())
		}
	}
	destroy() {
		fs.colse(this.fd,()=>{
			console.log('close');
		})
	}
}