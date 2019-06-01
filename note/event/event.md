##### 事件处理机制及事件环机制
###### EventEmitter 类
在Node.js用于实现各种事件处理的event模块中，定义了EventEmitter类，所有可能触发事件的对象都是一个继承了EventEmitter类的子类的实例对象。
###### EventEmitter类的各种方法
EventEmitter类的on方法或addListener。
这俩个方法的区别仅仅在于方法名而已，内部实现同样的处理。
```js
emitter.on(event,listener)
emitter.addlistener(evnet,listener)

```
第一个参数为指定事件名称，第二个参数为该事件处理的函数。
event 实现
```js

function EventEmitter(){

	// 会把所有的事件监听函数放在这个对象中保存
	this.events = {}
	// 给一个事件类型监听指定10个
	this._maxListeners= 10
}
EventEmitter.prototype.setMaxListners = function(setMaxListners){
	this._maxListeners =setMaxListners
}
// 给指定的事件绑定事件处理函数，1.事件类型，2.事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type,listener){

	if(this.events[type])
	{
		if(this.events[type].length!=0&& this.events[type].length>this._maxListeners)
		{
			console.error(`${type}大于${this._maxListeners}，`)
		}
		this.events[type].push(listener)
	}
	else
	{
		// 如果以前没有添加到次坚石的监听函数，则赋一个数组
			this.events[type] = [listener]
	}
}
EventEmitter.prototype.emit = function(type,...rest){
																																				// 用apply
	this.events[type] && this.events[type].forEach(listener=>listener.apply(this,rest))
}


EventEmitter.prototype.once=function(type,listener){

	// 用完销毁
	let wrapper= (...res)=>{
		listener.apply(this,rest)//先让原始函数执行
		this.removeListener(type,wrapper)
	}
	this.on(type,wrapper)

}
EventEmitter.prototype.removeListener = function(type,listener){
	if(this.events[type])
	{
		this.events[type] =this.events[type].filter(l=>l!=listener)
	}
}

// 移除每个事件的所以事件监听函数
EventEmitter.prototype.removeAllListeners = function(type){
	delete this.events[type]
}
EventEmitter.prototype.listeners = function(event){
	return this.events[event]
}
// 获取所有监听函数的数组
module.exports = EventEmitter

```
```js 
let EventEmitter = require('events');
let util = require('util')
// console.log(util)
util.inheritis(Parent,EventEmitter)
// 这是一个类
function Parent(){
	// 继承私有方法
	EventEmitter.call(this)
}
// 子类继承父类的公用方法
// Object.setPrototypeOf(ctor.prototype, superCtor.prototype)
// ctor.prototype.__proto__ = superCtor.prototype
// 进行了原型继承
// 继承公有属性


let child = new Parent()
child.on('')
```
###### setImmediate setInterval setTimeout
// nextTick setImmediate 区别和联系
// nextTick 把回调函数放在当前执行栈的底部，
// setImmediate 把回调函数放在事件队列的尾部

###### nextTick
nextTick 把回调函数放在当前执行栈的底部，（其实微任务）
 <br>
process.nextTick()方法会加在回调函数的next tick queue中，<br>
process.nextTick() 方法将 callback 添加到下一个时间点的队列。 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。
```js
function Super() {
	this.listener;

	this.listener()
}

Super.prototype.add = function (listener){
	this.listener = listener
}
/*
	当new Super的时候 Super中的函数已经执行了。
	再调用后面的add函数已经不会再执行 了
	解决办法

 */

let c = new Super()

c.add(()=>{
	console.log('ok')
})

// 解决例子

function suber (){

	this.listener 
	process.nextTick(()=>{
		this.listener()
	});

}

suber.prototype.add = function(listener){
	this.listener = listener
}

let d = new suber();

d.add(function(){
	console.log('hello')
})

```
###### setImmediate
setImmediate 把回调函数放在事件队列的尾部<br>
因为不会阻塞当前执行栈
###### util
实用工具
* 有inspect等方法，可以设置对象函数的展开层级
console.log(util.inspect(obj,{depth:2}))
```js
const util = require('util')
var person={
	name :'12',
	home: {country:"China"}
}
//depath为层级
// 定义为1展示对象的1个层级
// 定义为2展示对象的2个层级
console.log(util.inspect(person,{depth:2}))

```
