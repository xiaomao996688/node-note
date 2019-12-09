// 移除bom
let fs = require('fs')
// 你是是6个字节，但是输出出来是9个字节，多了三个要过滤掉。
fs.readFile('1.txt',(err,data)=>{

	if(data[0] ==0xef&& data[1] == 0xbb && data[2] ==0xbf )
	{
		data = data.slice();
	}
	console.log(data.toString());
})