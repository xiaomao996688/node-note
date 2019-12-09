###### Node.js中的控制台
console.log对象代表控制台(在操作系统中的表现形式为一个操作系统中指定的字符界面)

###### console 

* console.log 向控制台打印日志

* console.error 向控制台打印错误信息。
* console.dir 方法用于查看对象内容并将其输出到控制台中。
```js
var a = {
	b:1,
	c:2
}
console.dir(a)//{ b: 1, c: 2 }
```
* console.time 与 console.timerEnd 
这俩个方法配合使用，time用于标记开始时间
end用于标记结束时间。最后输出的时间为time与end之间代码运行的时间。

* console.trace 用于将当前位置处的栈信息作为标准错误信息进行输出
trace跟踪
```js
> var user= new Object()
undefined
> user.name ='Hello'
'Hello'
> user.getName = function (){
... return this.name
... }
[Function]
> user.setName = function (){
... this.name = name
... }
[Function]
> console.trace('trace')
Trace: trace
    at repl:1:9
    at Script.runInContext (vm.js:74:29)
    at REPLServer.defaultEval (repl.js:246:29)
    at bound (domain.js:375:14)
    at REPLServer.runBound [as eval] (domain.js:388:12)
    at REPLServer.onLine (repl.js:492:10)
    at REPLServer.emit (events.js:180:13)
    at REPLServer.emit (domain.js:421:20)
    at REPLServer.Interface._onLine (readline.js:285:10)
    at REPLServer.Interface._line (readline.js:638:8)
undefined

```

* console.assert 
用于对一个表达式的执行结果进行评估，如果该表达式的执行结果为false，则输出一个消息字符串爆出AssertionError异常
```js
> console.assert(1==a,'this is Error')
AssertionError [ERR_ASSERTION]: this is Error
    at Console.assert (console.js:197:23)
>
```

##### 打印日志放入文件之中
```js
新建文件console.js 
文件内输入
console.log('1')
console.log('2')
切换到cmd
输入命令 ：node console.js > a.log 
这样会把输出入的日志
1 
2 
存放在当前目下的a.log 中
> 代表（没有错误的日志）导入a.log，默认省略了1
node console.js 1> a.log
````
```js
新建文件 error.js 
文件内输入
console.warn(2)
console.error(2)
切换到 cmd 
输入命令 :node error.js 2 > b.log 
2
2
会把‘22’输入到b.log 中
2> 2代表把错误输或警告输出
_________________________

切换到cmd 
输入命令 ： node error.js 1> a.log 2>&1 
2代表错误输出 重新定向到标准输入1中
````

程序是从上到下一行一行的执行
栈是先进后出的。

<!-- 栈 -->
3
2
1

——》3先出去然后2出去，最后1