/*
* @Date:   2019-06-01 18:08:39
* @Last Modified time: 2019-06-01 18:08:51
*/
const util = require('util')
var person={
	name :'12',
	home: {country:"China"}
}
//depath为层级
// 定义为1展示对象的1个层级
// 定义为2展示对象的2个层级
console.log(util.inspect(person,{depth:0}))