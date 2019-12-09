## 宏任务
JavaScript(主程序代码)、setTimeout、setInterval /setImmediate I/O操作 UI渲染、requsetAnimationFrame
## 微任务
MuationObsever precess.nextTick() muation Object.observe

## demo 执行顺序

```js
console.info('main1');

process.nextTick(function(){
	console.info('process.nextTick1'); // 微任务 
});

setTimeout(function(){
	console.info('setTimeout');
	process.nextTick(function(){
		console.info('process.nextTick');
	});
}, 0);


new Promise(function(resolve, reject){ // 微任务
	console.info('promise');
	resolve()
}).then(function(){
	console.info('promise then');
})

console.info('main2');

```
## 执行顺序
js优先执行宏任务，然后执行微任务。每次执行宏任务，先看宏任务里的微任务，把他们加入微任务队列。每次宏任务执行完成后会清空(执行)当前宏任务中的微任务队列。promise的优先级低于process.next。在执行setTimeout的时候会但开一个线程。
```js
执行结果如下
// 首先执行宏任务 主程序中的JavaScript

main 
//process.next1 遇到微任务，加入队列
// 继续执行
// 遇到timeout是宏任务,异步执行,等到时间了进行执行，挂起
// 遇到Promise 微任务 ，执行到console.log('promise')是主程序
 promise 
// 继续执行到
// 遇到 main2
main2
// 主程序执行完成 ，进行微任务
process.nextTick1
// 继续执行
promise then 
// 宏任务中的setTimeout
setTimeout 
process.nextTick 

```
