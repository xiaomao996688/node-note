const fs = require('fs')
const path = require('path')

/**
异步先序深度优先遍历
*/
//a a/b a/b/d a/b/e a/c  a/c/f a/c/g h.txt
function preDeep(dir,callback){
	console.log(dir);	

	fs.readdir(dir,(err,files)=>{
		!function next(i){
			if(i>=files.length) return callback()
			let child = path.join(dir,files[i]);
			fs.stat(child,(err,stat)=>{
				if(stat.isDirectory())
				{
					preDeep(child,()=>next(i+1))
				}
				else
				{
					console.log(child);
					next(i+1)
				}
			})

			// files[i].
		}(0)
	})

}
preDeep('a',()=>{
	console.log('全部迭代完毕');
})