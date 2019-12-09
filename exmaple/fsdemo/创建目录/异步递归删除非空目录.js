const fs = require('fs')

/*function rmdirp(dir){
	let files = fs.readdirSync(dir)//[a,b,c]
	console.log(files,'files');
	console.log(dir);
	// 读取这个相应的目录下是否有文件
	files.forEach(function(file){ //a,b,c
		let current = dir+'/'+file 
		let child = fs.statSync(dir+'/'+file);
		console.log(current,'目录');
		console.log(child,'文件信息');
		// console.log(child.isDirectory());
		if(!child.isDirectory())//判断这个拿到的文件信息是否是目录
		{
			rmdirp(dir+'/'+file)
			console.log('aaaaaaaaaa');
			// console.log(12);
		}
		else
		{
			console.log(current,'aaa');
			fs.unlinkSync(current);
			// console.log(12);
		}
	})
	fs.unlinkSync();
}
//同步删除一个文件
rmdirp('a')*/

function rmdir(dir){
	let files = fs.readdirSync(dir);
	files.forEach((file)=>{
		let current = dir+'/'+file 
		let child = fs.statSync(dir+'/'+file);
		if(child.isDirectory())
		{
			console.log(12);
			rmdir(current)
		}
		else
		{
			fs.unlinkSync(current);
			console.log(12);
		}
	})
	fs.rmdirSync(dir);
}
rmdir('a')