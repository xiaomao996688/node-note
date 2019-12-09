{
	let fs = require('fs')
	// 读取数据是buffer
	fs.readFile('../01.txt',{encoding:'utf8'},function(err,data){
		if(err){
			console.error(err)
		}
		else
		{
			console.log(data);
		}
	})
	// mode0o666权限位，
	fs.writeFile('./1.txt','data',{encoding:'utf8',flag:'a',mode:0o666},function(err,data){
		if(err)
		{
			console.log(err);
		}

	})
}