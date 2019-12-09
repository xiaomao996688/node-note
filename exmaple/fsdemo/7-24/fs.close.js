let str = '小白'
let fs = require('fs')
// 当我们调用write方法写入文件的时候，并不会直接写入物理文件，而是先写入缓存区，再批量写入物理文件。
fs.open('1.txt','w',0o666,(err,fd)=>{
	let buff = Buffer.from(str);
	fs.write(fd,Buffer.from(str),0,3,null,(err,bytesWritten)=>{
		console.log(bytesWritten);
		fs.write(fd,buff,3,3,null,(err,bytesWritten)=>{
			// 迫使操作系统立刻马上把缓存区的内容写入物理文件
			fs.fsync(fd,()=>{
				fs.close(fd,()=>{
					console.log('关闭文件完成');
				})
			})
		})
	})
})