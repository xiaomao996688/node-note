###### global
Node.js定义了一个global对象，代表Node.js中全局命名空间，任何全局变量、函数或对象都是该对象的一个属性。
###### setTimeout 函数与cleaerTimeout函数
setTimeout全局函数与leaerTimeout函数<br>
setTimeout(cb,ms,[arg])<br>
指定的回调函数的毫秒数在1-s214748647，广义上将不能超过24.8天。

###### setInterval函数与clearInterval函数
也是全局函数。

###### 定时器对象unref方法和ref方法

setTimeout和setInterval函数均返回一个定时对象,为定时器对象定义了一个unref方法与ref方法。
<br>
当使用settimeout函数指定过多少毫秒调用某个回调函数。<br>
当使用setInterval函数指定每个多少毫秒调用某个函数后，<br>
可以使用setTimeout函数或setInterval函数<br>
返回定时器对象的unref方法取消setTimeout <br>
函数或setInterval函数中指定的回调函数调用。<br>
ref则课恢复函数的调用。
```js
	var test= function (){
		console.log('callback function executed')
	}
	var timer = setInterval(test,3000)
	timer.unref();
	// 取消了test方法执行
	// 过多unref对象可能会有负面影响。谨慎使用
	timer.ref()
	// test方法又重新执行
```
##### 与模块相关的全局函数及对象
###### 使用require函数来加模块
require函数是一个参数，参数值可以为带有完整路径的模块文件名,也可以为模块名。
<br>
模块在首次加载后将缓存到内存区中，这意味这，对于相同模块多次引用得到的都是同一个模块对象。
<br>
对于相同模块的多次引用不会引起模块内代码的多次执行
```js
app.js
const testModule = require('./testModule.js')
const testModule1= require('./testModule.js')

//可以穿传参数
testModule.outputTestVar('moult')
testModule1.outputTestVar('aaaa');

testModule.js
var outputTestVar =function  outputTestVar(args){

}
exports.testVar = testVar;
exports.outputTestVar=outputTestVa
```
###### require.resolve函数查询完整模块名 

在Node.js中，可以使用require.resovle函数来查询某个模块文件带有完整路径的文件名。
```js
require('./01.js')

```

###### require.cache 对象

在Node.js中，定义了一个require.cache对象，该对象，代表缓存了所以已被加载模块的缓存去。在REPL运行环境中，可以使用console.log(require.cache);表达式来查看缓存区中的内容。


###### __filename变量与__dirname变量

```js
__filename变量：用于获取当模块文件的filename变量
var testModule = require('./test.js')

console.log(__dirname);//E:/test.js


__dirname 变量：用于获取当前目录的__dirname
console.log(__dirname)

```

###### 事件处理机制及事件环机制

###### EventEmitter 类
在Node.js用于实现各种事件处理的event模块中，定义了EventEmitter类，所有可能触发事件的对象都是一个继承了EventEmitter类的子类的实例对象。
###### EventEmitter 类的各种方法
EventEmitter类的on方法或addListener。
这俩个方法的区别仅仅在于方法名而已，内部实现同样的处理。
<br>
```js
emitter.on(event,listener)
emitter.addlistener(evnet,listener)

```
第一个参数为指定事件名称，第二个参数为该事件处理的函数。

```js
var http = require('http')
var server = http.createServer()

// 监听requst事件
server.on('request',function(req,res){
	console.log(req.url)
	res.end()	
})
server.on('request',function(req,res){
	console.log(req.url)
	res.end()	
})
listen(1111,"127..0.0.1")
// 可以通多个on方法的执行来对通一个事件绑定多个事件处理函数。
```
###### SetMaxListeners
可以通过SetMaxListeners方法最多可以绑定事件处理的数量

```
  emitter.setMaxListeners(n)
 // n为整数参数，代表最多可以指定事件处理函数数量
  emiter.setMaxListener(event)
//   参数指定事件名，该方法返回由该事件的所有事件处理函数构成的数组。

listener方法使用一个参数，参数为指定事件名。该方法返回该事件的所有事件处理函数构成的数组。
console.log(server.listener('request))

```

###### once
指定事件绑定事件处理函数，区别在于，当事件处理函数执行一次后立即解除。该事件处理函数只会被执行一次。
```js
emiter.once(event,listener)
```
###### removeListener(evnet,listener)
removeListener方法解除某个时间处理函数
```js
emitter.removeListener(event,listener)
event事件名，listener事件处理函数
```
###### removeAllListener
接收一个参数，参数值为需要被解除时间处理函数的事件名。
<br>
如果在removeAllListener方法中使用事件名参数时，将取消该事件的所有事件处理函数；<br>
如果removeAllListener方法不使用事件名参数时，将取消所以已被指定的事件。
```js
 let http = require('http')
 let server = http.createServer();
 let testFunction = function (req,res){
	 if(req.url!=="/favicon.ico")
	 {
		 console.log('发送完成')
	 }
	 server.on('requse',function(req,res){
		 if(req.url!=="favicon.ico")
		 {
			 console.log(req.url)
		 }
		 res.end()
	 })
server.on('requset',testFunction);
server.removeAllListener('requset')
server.on('requse',function(req,res){
	if(req.url!=='/favicon.ico')
	{

		console.log('hello')
	}
	res.end()
})
server.listen(1100,"127.0.0.1")
```
###### emit
当需要手工触发某个对象的一个事件，可以使用emit
```js
emitter.emit(event,[args],...[])
第一个参数为需要手工触发的事件名
第二个参数开始为需要传递给事件处理函数的参数
```
###### 获取指定事件的事件吃力函数的数量
###### listenerCount
此方法可以用来获取某个对象的指定事件的事件处理函数的数量
```js
EventEmitter.listennerCount(emiiter,event)[已经被废弃掉了]
第一个参数用于指定需要获取哪个*对象*的事件处理函数的数量
第二个参数用于指定需要获取哪个*事件*的事件处理函数的数量
```
###### EventEmitter类自身所用于的事件。
在event模块中，为EventEmitter类本身定义了俩个事件：

* newListner事件
* removeListener事件

任何时候，当对继承了EventEmitter的子类实例对象绑定事件处理函数时，都将处罚EventEmiter类的newListener事件。可以使用如下所示的方法编写该事件的处理函数。
```js
emitter.on('newListener',function(e,f){
	//事件处理函数代码
})
第一个参数为绑定的事件名，
第二个参数为绑定的事件处理函数
```
* removeListener事件。
当对继承了EventEmitter类独栋子类实例对象取消事件处理函数时，都将处罚EventEmitter类的removeListener事件。
```js
emitter.on('removeListener',function(){
	// 事件处理函数代码
})
可以使用俩个参数，其中第一个参数为被取消事件处理函数的事件名，第二个参数为被取消事件处理函数
```

###### process

###### chdir (change directory)

改变当前工作目录
process.chidir('..')//切换到上级目录
###### cwd(current working dirctory)

当前工作的目录<br>
console.log(cwd())

###### nextTick（非常重要的API）
nextTick 把回调函数放在当前执行栈的底部，（其实微任务）
 <br>
process.nextTick()方法会加在回调函数的next tick queue中，<br>
process.nextTick() 方法将 callback 添加到下一个时间点的队列。 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。

###### setImmediate(node建议使用此方法)

setImmediate 把回调函数放在事件队列的尾部<br>
因为不会阻塞当前执行栈
###### util
实用工具
* 有inspect等方法，可以设置对象函数的展开层级

```js
const util = require('util')
var person={
	name :'12',
	home: {country:"China"}
}
depath为层级
console.log(util.inspect(obj,{depth:2}))
```
* util.isBuffer()
* util.isUndefined()

###### stdout

###### stderr

###### stdin

###### Buffer

###### clearImmediate clerInterval clearTimeout

###### setImmediate setInterval setTimeout

###### argv 

###### memoryUsage (检测当前内存使用量)
V8引擎最大使用1.7G
* rss: 20369408,常驻内存
 * heapTotal: 7159808,堆内存的总申请量
 * heapUsed: 4767216,已经使用的量
 * external: 8224 }外部内存的使用的量

###### 断点调试
```
调试可以进入debugger
c
n 
s 
o 
p
监控变量的意思
watch("a")
```
