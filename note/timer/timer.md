###### setTimeout 函数与cleaerTimeout函数
setTimeout全局函数，指定回调函数描述在1-214748647，广义上不能超过24.8天
setTimeout(cb,ms,[arg])<br>
###### setInterval 函数与clearInterval
全局函数
###### 定时器对象unref方法和ref方法
setTimeout和setInterval函数均返回一个定时对象,<br>
为定时器对象定义了一个unref方法与ref方法。
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

````

