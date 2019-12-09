function LinkedList(){
	let Node = function (element){
		this.element = element; 
		this.next = null; 
	}
	let head = null;
	let length = 0;
	this.append = function(element){

		let node = new Node(element)
		// first Node
		if(!head)
		{
			head = node 
		}
		else
		{
			let current = head 
			while(current.next)
			{
				current= current.next 
			}
			current.next = node 
		}
		length++
	}
	this.insert = function(position,element){
		// Juged range
		if(position > -1 && position <= length)
		{
			let node = new Node(element)
			let current = head,index=0,previous;
			if(position===0)
			{
				if(!head)
				{
					head = node 
				}
				else
				{
					// console.log(node);
				  node.next = head 
				  head = node 
				}
			}
			else
			{
			// 	while(index++ < position)
			// 	{
			// 		previous = current
			// 		currnet = previous.next 
			// 	}
			// 	node.next = current
			// 	previous.next = node 
			// }
				while(index++ < position)
				{
					previous = current
					current = previous.next 
				}
				node.next = current
				previous.next = node 
			}
			length++;
			return true 
		}
		else
		{
			return false 
		}
	}
	this.removeAt = function(position){
		//  
		if(position >-1 && position < length)
		{
			let current = head,index=0
			if(position===0)
			{
				head = current.next
			}
			else
			{
				
				while(index++ < position)
				{
					previous =current
					current = previous.next 				
				}
				previous.next = current.next 
					// node.next = current
				 //  previous.next = node 
			}
			length--
			return current.element
		}	
		else
		{
			return false 
		}
	}

	this.indexOf = function(element){
		let index = 0,current = head;
		while(current)
		{
			if(current.element = element)
			{
				return index 
			}
			index++
			current = current.next 
		}
		return index 
	}
	this.remove = function(element){
		this.removeAt(this.indexOf(element))
	}
	this.toString = function(){
		let str = '',current= head;
		str = current.element;
		while(current.next)
		{
			current = current.next 
			str+=','+ current.element 
		}
		return str 
	}
	this.print = function(){
		console.log(this.toString());
	}
}
// let list = new LinkedList()
// list.append(1)
// list.append(2)
// list.append(3)
// list.insert(0,1)
// list.insert(4,4)
// // 1,1,2,3,4
// list.removeAt(2)
// // 1,1,3,4
// list.remove(1)
// console.log(list.indexOf(1));
// list.insert(2,3)
// list.print()

function HashLinearProbing(){
	let table = [];

	let ValuePair = function(key, value){
		this.key = key 
		this.value = value 
		this.toString = function(){
			return `[${key}-${value}]`
		}
	}
}