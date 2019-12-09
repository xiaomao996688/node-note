let fs = require('fs')
// 处理文件路径的
let path = require('path')
// 读取文件列表
// files是a目下的文件目录，是一个数组
fs.readdir('./a',function(err,files){
	console.log(files);
	files.forEach(file=>{
		// path.join可以吧俩个路径加在一起
		let child = path.join('a',file)
		// 拿到文件详细信息
		fs.stat(child,function(err,stat){
			console.log(stat);
		})
	})

// dev设备编号
// mode：16822,进制不一样。变成了10进制
// uid用户id
// gid做你过户id
// accesstime
// midifytime	修改文件就会更新
// createtime 修改内容的时候更新
