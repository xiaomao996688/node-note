/*


*/
let fs = require('fs')
let path = require('path')
// 删除文件unlink
// 删除文件夹fs.rmdir,条件者一定要是一个空目录

// -rf递归删除 f表示false  r表示递归
// 同步
// function rmdirSync(dir){
// 	let files= fs.readdirSync(dir)

// 	files.forEach(item=>{

// 		let child = fs.statSync(path.join(dir,item));
// 		if(child.isDirectory())
// 		{
// 			rmdirSync(path.join(dir,item))
// 		}
// 		else
// 		{
// 			fs.unlinkSync(path.join(dir,item));
// 		}
// 	})
// 	fs.rmdirSync(dir);
// }
// rmdirSync('a')


// 异步递归删除非空文件夹
function rmdir(dir){
 	return new Promise(function(resolve,reject){
 		fs.stat(dir,(err,stat)=>{
 			if(err) return reject(err)
 			if(stat.isDirectory())
 			{
		 		fs.readdir(dir,(err,files)=>{//拿到数组
		 			if(err) return reject(err)
			 		// 先删除当前目录的子文件夹或文件,再删除自己
			 		// Promise.all(files.map(item)=>rmdir(path.join(dir,item))).then(()=>{
			 		// 	fs.rmdir(dir,resolve)
			 		// })
			 		Promise.all(files.map((item)=>rmdir(path.join(dir,item)))).then(()=>{
			 			fs.rmdir(dir, resolve);
			 		})
		 		})
 			}
 			else
 			{
 				// 文件
 				fs.unlink(dir,resolve);
 			}
 		})

 	})
}
rmdir('a').then(data=>{
	console.log(data);
}).catch(err=>{
	console.log(err);
})