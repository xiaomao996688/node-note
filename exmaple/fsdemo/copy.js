// 要有缓存机制,j节约内存，读一点写一点
const fs = require('fs')
// 定义缓存读一点写一点
const BUFFER_SIZE =3;//缓存大小三个字节
function copy(src,target){
	fs.open(src,'r',0o666,function(err,readFd){
		fs.open(target,'w',0o666,function(err,writeFd){
			let buff = Buffer.alloc(BUFFER_SIZE)

			!function next(){																	
				//bytesRead实际读到的字节数
				fs.read(readFd,buff,0,BUFFER_SIZE,null,function(err,bytesRead,buffer){
					if(bytesRead>0)
					fs.write(writeFd,buffer,0,bytesRead,null,next)
				})
			}()
		})
	})

}
copy('1.txt','2.txt')