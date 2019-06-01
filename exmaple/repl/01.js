/*
* @Date:   2019-06-01 17:14:10
* @Last Modified time: 2019-06-01 17:14:16
*/
var repl = require('repl')

var con = repl.start().context;

con.msg="示例消息"

con.testFunction = function (){
	console.log(con.msg)
}