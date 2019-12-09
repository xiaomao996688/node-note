// 监控监视文件变化,当文件发生变化之后执行对应回调函数

let fs = require('fs')
fs.watchFile('a', function(prevStat,newStat){
	console.log(123);
	// console.log(arguments);
	// 表示以前的文件没有
	if(Date.parse(prevStat.actime) == 0)
	{
		// x
		console.log('新增加的文件');
	}
	else if(Date.parse(prevStat.ctime) !=Date.parse(newStat.ctime))
	{
		console.log('文件被修改了');
	}
	// if(Date.parse(PrevStat.ctime)==0)
	else 
	{
		console.log('文件被删除了');
	}
});