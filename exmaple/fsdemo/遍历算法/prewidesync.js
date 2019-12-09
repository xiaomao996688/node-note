/**
同步的广度优先先序遍历
a a/b a/c a/h.txt  a/b/d a/b/e a/c/f a/c/g a/b/d/d1.txt
*/

const fs = require('fs')
const path  = require('path')

function wide(dir){
	let arr = [dir];
	while(arr.length>0)
	{
		let current = arr.shift() //取出队列最左边的那个元素
		console.log(current);
		let stat = fs.statSync(current);
		if(stat.isDirectory())
		{
			let files = fs.readdirSync(current);
			files.forEach(item=>{
				arr.push(path.join(current,item))
			
			})
		}
	}
}
wide('a')