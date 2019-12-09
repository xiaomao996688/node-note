/*
* @Author: zll
* @Date:   2019-12-09 12:12:34
* @Last Modified by:   zll
* @Last Modified time: 2019-12-09 12:12:42
*/

Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
	for(let i =sourceStart; i < sourceEnd; i++)
	{
		targetBuffer[targetStart++] = this[i]
	}
}
let buffer = Buffer.from('周三')
let buff = Buffer.alloc(6)

buffer.copy(buff,0,0,4)
buffer.copy(buff,3,3,6);
console.log(buff.toString());