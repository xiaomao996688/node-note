##### REPL(read-eval-print-loop)可交互运行环境。
REPL环境内部使用eval函数来评估改表示的结果。
###### 在REPL运行环境中使用下划线字符。
在repl运行环境中，可以通过下划线字符的使用来访问最近使用的表达式。
###### 在repl环境中直接运行函数
可以在repel运行环境中直接运行某个函数。在REPL运行环境中，可以将表示分为多行进行书写，
当该表达式未完成时，REPL运行环境将为改表达式的每一行，除第一行外添加英文省略符(三个小圆点)
###### REPL 运行环境的上下文对象。
```js
var repl = require('repl')

var con = repl.start().context;

con.msg="示例消息"

con.testFunction = function (){
	console.log(con.msg)
}
```
###### REPL 运行环境中的基础命令
* .break 当你书写一个多行函数的中途想要放弃书写或重新书写该函数时，可该命令可以烦你返回到命令提示符的起点处，使你可以重新书写新的表达式或重新写书写该函数。
* .clear 用于清除REPL运行环境上下文对象中保存的所有变量与函数。
* .exit 该命令用于退出repl运行环境。
* .help 该命令将在窗口中显示REPL运行环境中的所有基础命令。
* .save 该命令把你在REPL运行环境中输入的所有表达式保存到一个文件中。
* .load 该命令将把某个文件中保存的所有表达式依次加载到了REPL运行环境中。

```js
 //使用.save .load
.save ./save.js

.load ./save.js
```