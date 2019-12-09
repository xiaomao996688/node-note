/*
* @Author: zll
* @Date:   2019-12-09 12:12:17
* @Last Modified by:   zll
* @Last Modified time: 2019-12-09 12:12:24
*/
Buffer.concat = function(list){
		// reduce((total,currentvalue,currentIndex,arr)=>{},initialValue)
		// 				 初始值(或者计算结束后返回的值)，当前的值，当前值的index，当前数组，初始值设置
		let totalLength = list.reduce((len,item)=>len+item.length,0)
		if(list.length == 0)
		{
			return list[0]
		}
		let newBuffer = Buffer.alloc(totalLength);
		let index = 0;
		for(let buffer of list) 
		{
			for(let byte of buffer)
			{
				newBuffer[index++] = byte
				console.log(index);
				console.log(newBuffer[index++]);
			}
		}
		console.log(index);
		return newBuffer
}
	let buffer= Buffer.from('周')
	let buff= Buffer.from('三')
	let buf =Buffer.concat([buffer,buff])
	console.log(buf.toString());
{
		Buffer.prototype.copy12 = function(targetBuffer,targetStart,sourceStart,sourceEnd){
	    for(let i=sourceStart;i<sourceEnd;i++){
	        targetBuffer[targetStart++] = this[i];
	    }
		}
		let buffer = Buffer.alloc(4,'11')
    let buff = Buffer.alloc(4,'!')
     buffer.copy12(buff,2,2,4)
    console.log(buff.toString());
}
