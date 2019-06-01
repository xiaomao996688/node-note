/*
* @Date:   2019-06-01 18:10:30
* @Last Modified time: 2019-06-01 18:25:27
*/
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

// function suber (){

// 	this.listener 
// 	process.nextTick(()=>{
// 		this.listener()
// 	});

// }

// suber.prototype.add = function(listener){
// 	this.listener = listener
// }

// let d = new suber();

// d.add(function(){
// 	console.log('hello')
// })