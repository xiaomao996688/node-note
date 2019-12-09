let fs = require('fs')

// 当创建目录的时候，必须父目录是存在的
// fs.mkdir('a',function(err){
// 	console.log(err);
// });


// 判断一个文件或目录是否存在
// fs.constants.R_OK是否有这个权限读取这个目录
// 如果有这目录err返回null
// fs.access('a',fs.constants.R_OK,function(err){
// 	console.log(err);
// })

// 递归异步创建目录

function mkdirp(dir){
	let paths = dir.split('|');
	!function next(index){
		if(index >paths.length) return 
		let current = paths.slice(0,index).join('/');
		fs.access(current,fs.constants.R_OK,function(err){
			if(err){
				fs.mkdir(current,0o666,next.bind(null,index+1))
			}
			else
			{
				next(index+1)
			}
		})
	}(1);
}
mkdirp('a/b/c')
// // 递归异步删除非空目录
// function rmdirp(){

// }
// rmdirp('a')
// let path = require('path')
// // 获取一个目录下的所有文件或目录
// fs.readdir()
// // 删除一个文件
// fs.unlink(path)
// // 删除一个空目录
// fs.rmdir('a')

function rmdirp(dir){
	let files = fs.readdirSync(dir);
	files.forEach(function(file){
		let current = dir+'/'+file
		let child = fs.statSync(dir+'/'+file)
		if(child.isDirecotry()){
			rmdirp(current)
		}
		else
		{
			fs.unlinkSync(current);
		}
	})
	// 把一个目录下面的文件或目录全部删除，
	// 最后要删除自己
	fs.rmdirSync(dir)
}