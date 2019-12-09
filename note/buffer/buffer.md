## buffer
js不能处理二进制。
nodejs提供了一个buffer对象来提供二进制数操作。

一个buffer是三个字节，一个字节8位。
buffer存的是2进制，表示为了方便所以用16进制表示
## 定义buffer的方式
### Buffer.alloc(size[,fill,[encoding]])
- size创建的buffer长度，
- fill要填充buffer内容 默认填充为0
- encoding 填充编码方式，默认utf8
- 这种方式非常消耗内存，因为要固定腾出一块内存，清除然后使用
表示分配，一个长度为6个字节的buffer
会把所有的字节设置为0
let buffer = Buffer.alloc(6);
如果不想为了0，可以设置第二个参数
let buffer = Buffer.alloc(6,2)
这样填充了buffer为
<buffer 02 02 02 02 02 02>
let buffer = Buffer.alloc(6)

### Buffer.allocUnsage(size)

- size创建buffer的长度
- 分配的是一块没有初始化的内存
- 这种方式不安全，因为可能存放的是他人的数据
let buffer =Buffer.allocUnsage(6)

### Buffer.from(string,encoding)

- string创建buffer所存储的内容
- encoding 编码方式
-存放一个字符串的buffer
let buffer = Buffer.from('周天')
一个汉字6个字节，一个字节8位
<Buffer e5 91 a8 e5 a4 a9>

### Buffer.fill(value[, offset[, end]][, encoding])

- value 要填充的值
- offset第几位开始填充
- end 填充到第几位
- encoding编码方式
let buf =Buffer.alloc(4)
第一个参数要填充的值
第二参数偏移量，从第几位开始填充
第三参数值，结束位置
buf.fill(3,1,2)

### Buffer.write(string[, offset[, length]][, encoding])

- string写入buffer的内容
- offset从buffer的第几个字节开始写入,默认从0开始
- length 写入内容的长度 默认长度为buffer.length - offset
- encoding 编码方式，默认utf8
let buffer =Buffer.alloc(6)
<!--  -->
buffer.write('周天',0,3,'utf8')
buffer.write('天'3,3'utf8')
console.log(buffer)


### Buffer.writeInt8(value[, offset])

- 写入一个8位的整数
- value要写入buffer的数字
- offset从第几位开始写
let buffer = Buffer.alloc(6)

在0的位置写入一个8位的整数
buffer.writeInt8(0,0)
在1的位置写入一个8位的整数
buffer.writeInt8(16,1)
在1的位置写入一个8位的整数
buffer.writeInt8(32,1)


### Buffer.writeInt16BE()

- 写入一个16位的数从高位搞地位

let buffer = Buffer.alloc(6)

高位在前
01 00 00 00
buffer.writeInt16BE(256,0)
从第0位开始读
buffer.readInt16BE(0)
低位在前
16位俩个字节，所有从第二字节开写入
buffer.writeInt16LE(256,2)

怎么写入，就需要怎么读出来
buffer.writeInt16LE(2)

### Buffer.toString([encoding[, start[, end]]])

- encoding 这个buffer的编码方式Default: 'utf8'.
- start 第几位开始Default: 0.
- end 第几位结束Default: buf.length.
返回一个解码过的 string 类型
把buffer转成字符串

### Buffer.slice()

- 返回一个新的buffer对象,这个新buffer和老buffer公用一个内存。

let buffer = Buffer.alloc(6,1)
<!-- q浅拷贝 -->
buffer.slice(2,6)
console.log(buffer)


### string_decoder
为了解决乱码问题

let buffer = Buffer.from('周天吃饭')
let buff = buffer.slice(0,5)
let buf =buffer.slice(5)

解决乱码问题：
let {StringDecoder} = require('string_decoder')

let s = new StringDecoder()

<!-- 检查是否是一个完整的字节 ，如果不是一个完整的字节，
就把他缓存在这个buffer里面，等下次传来的字节然后补齐-->
write就是读取buffer的内容，返回一个字符串
write的时候就会判断是不是一个字符，如果是的话就输出
不是的话则缓存在对象内部，等下一次write的时候会把前面
缓存的字符加到第二次write的buffer上再进行判断
console.log(s.write(buff))
console.log(s.write(buf))

## Buffer.copy(targetBuffer,[targetStart],[sourceStart],[sourceEnd])
- targetBuffer 目标buffer，执行复制替换的buffer
- targetStart 目标buffer数据替换的起始位置
- sourceStart 源buffer数据复制的起始位置
- sourceEnd 源buffer数据复制的结束位置
<!-- 创建一个26个字节的buffer -->
let buffer = Buffer.allocUnsafe(26)
<!-- 创建一个26个字节的buffer用‘！’填充 -->
let buff = Buffer.allocUnsafe(26).fill('!')

for(let i=0;i < 26; i++)
{
	<!-- buffer存入26个数据 -->
	buffer[i] = i+97
	<!-- 存入的是ASCII值，从a开始 -->
}
<!-- 把buffer从第16到20个字节，复制到buff中第8个字节开始的位置 -->
 buffer.copy(buff,8,16,20)
 console.log(buff.toString())
 <!-- !!!!!!!!qrst!!!!!!!!!!!!! -->
<pre>
//实现Buffer.copy
Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
	
	for(let i = sourceStart; i < sourceEnd;i++ )
	{
		targetBuffer[i]=this[i]
	}
}	
</pre>
## Buffer.concat(list[,totalLength])
- list{array}需要连接的buffer对象数组
- totalLength{number}需要被连接的Buffer的长度
返回一个连接了 list 中所有 Buffer 的新 Buffer 。
如果 list 中没有项目，或者当 totalLength 为 0 时，将返回一个 0 长度（zero-length）的 Buffer 。
如果没有提供 totalLength ，它将计算 list 中的 Buffer（以获得该值）。然而，这增加了额外的函数循环，提供精准的长度将加速计算。
let buffer = Buffer.from('con')
let bufer = Buffer.from('cat')
let buf = Buffer.concat([buffer,bufer])
console.log(buf.toString())
```js
Buffer.prototype.concat = function(list){
	// buffer是固定长度的
	let totalLength = list.reduce((total,item)=>total+item.length,0)
	if(list.length === 0)
	{
		return list[0]
	}
	let index=0
	let newBuffer =Buffer.alloc(totalLength)
	for(let buffer of list)
	{
		for(let byte in buffer)
		{
			if(index>=total)
			{
				newBuffer
			}
			else
			{
				newBuffer[index++] = byte
			}
		}
	}
	return newBuffer
}

```