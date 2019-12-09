const fs = require('fs')

fs.watchFile('b',(curr,prev)=>{
	console.log(arguments);
	console.log(curr);
	console.log(prev);
});
// option{
		// persistent的布尔值，表明当文件正在被监视时，进程是否应该继续运行，
		// interval 表示目标应该每隔多少毫秒被轮询。默认{persistent：true，interval：5007}
// }
// fs.watchFile('message.text', (curr, prev) => {
//   console.log(`当前的最近修改时间是: ${curr.mtime}`);
//   console.log(`之前的最近修改时间是: ${prev.mtime}`);
// });