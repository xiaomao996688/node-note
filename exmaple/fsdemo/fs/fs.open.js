const fs = require('fs')

// fs.open('./1.txt','r',0o666,(err,fd)=>{
// 	console.log(fd);
// 	let buff = Buffer.alloc(3)
// 	fs.read(fd,buff,0,3,0,function(err,bytesRead,buffer){
// 		console.log(buff.toString());
// 	})

// });
// 标准输入，输入的数打出来
// process.stdin.on('data',(data)=>{
// 	console.log(data);
// })
// 标准输出，
// process.stdout.write('helle')
// // 错误输出
// process.stderr.write('wrong')
// w 清空并写入
// a 追加写入
fs.open('./2.txt','r+',0o666,function(err,fd){
	// 从0开始写入3个字节，在文件的第一个字节开始
	fs.write(fd,Buffer.from('asdoaas'),3,3,3,function(err,bytesWritten){
		console.log(bytesWritten);
		fs.fsync(fd,function(){
			fs.close()
		});
	})
}) 