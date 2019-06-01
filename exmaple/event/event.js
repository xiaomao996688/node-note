/*
* @Date:   2019-06-01 18:11:56
* @Last Modified time: 2019-06-01 18:12:07
*/
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


// 微任务，宏任务