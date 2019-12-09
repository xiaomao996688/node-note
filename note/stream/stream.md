## 流的概念
流是一组有序的，有起点和重点的字节数据传输手段<br>
它不关系文件的整体内容,只关注是否从文件中读到了数据，以及读到数据之后的处理<br>
流是一个抽象接口,被Node中的很多对象所实现,比如HTTP服务request和response对象都是流。
## stream（流）
流是Node.js 中处理流式数据的抽象接口。stream模块用于构建实现了流接口的对象。
Node.js提供了多种流对象。例如，HTTP服务器的请求和proces.stdout都是流的实例。
流可以是可读的、可写的、或者可读可写的。所有的流都是EventEmitter的实例。
使用方法如下：
```js
const stream = require('stream')
```
尽管理解流的工作方式很重要,但是stream的模块主要用于开发者创建新类型的流实例。对于以消费流为对象为主的开发者，极少需要直接使用stream模块。
## 流的类型
Node.js中有四种基本的流类型：
+ Writable -可写入数据的流(例如：fs.createWriteStream())
- Readable -可读取数据的流(例如：fs.createReadStream())
- Duplex -可读又可写的流(例如：net.Socket)
- Transform -在读写过程中可以修改或者转换数据的Duplex流(例如zlib.createDeflate())
##对象模式
Node.js创建的流都是运作在字符串和Buffer(或Unit8Array)上。当然,流的实现也可以使用它类型的JavaScript的值(除了null)。这些流会以“对象模式”进行操作。
当创建流时，可以使用obejctMode选项把流实例切换到对象模式。将已存在的流切换到对象模式是不安全的。
## 缓冲
可写流和可读流都会在内部的缓冲器中存储，可以分别使用writeable.wirteableBuffer或readable.readableBuffer来获取。<br>可缓冲的数据大小取决于传入流构造函数的highWaterMark选项。对于普通的流，highWaterMark指定了自己的总数。对于对象模式的流，highWaterMark指定了对象的总数。<br>
当调用stream.push(chunk)时，数据会被缓冲在可读流中。如果流的消费者没有调用stream.read(),则数据会保存在内部队列中知道被消费。<br>
一旦内部的可读缓冲的总大小达到highWaterMark指定的阀值时，就会暂停从底层资源读取数据，直到当前缓冲的数据被消费(也就是说，流会停止调用内部的用于填充可读缓冲的readable_read())。<br>
当调用Writeable.write(chunk)时，数据会被缓冲在可写流中。当内部可写缓冲的总大小小于highWahterMark设置的阀值时，调用writeable.write()会返回true。一旦内部缓冲的大小达到或超过highWaterMkark时,则会返回false。<br>
streamAPI的主要目标，特别是stream.pipe(),是为了限制数据的缓冲到可接受的程度，也就是读取速度不一致的源头与目的地不会压垮内存。<br>
因为Duplex和Transform都是可读又可写的，所以它们各自维护着相互独立的内部缓冲器用于读取和写入,这使得它们在维护数据流时,读取和写入俩边可以各自独立地运作。例如，net.Socket实例是Duplex流,它的可读端可以消费从soket接收的数据, 而可写端则可以将数据写入到socket。因为数据写入到socket的速度可能比接收数据的速度快或者慢，所以在读写俩端独立地进行操作(或缓冲)就显得很重要了。

## 用于消费的API
几乎所有的Node.js应用在某种程度上使用了流。下面一个例子，使用流实现了一个HTTP服务：
```js
const http = require('http')
const server = http.createServer((req,res)=>{
	// req是一个http.IncomingMessage实例,它是可读流
	// res是一个http.ServerResponse实例,它是可写流
	let body = ''
	// 接收数据为utf8字符串
	// 如果没有设置字符编码,则会接收到Buffer对象
	
	req.setEncoding('utf8')
	// 如果添加了监视器,则可读流触发'data'事件
	req.on('data',(chunk)=>{
		body+=chunk
	})
	// 'end'事件表明整个请求体已被拒收
	req.on('end',()=>{
		try{
			const data = JSON.parse(body)
			// 响应信息给用户
			res.write(typeof data)
			res.end()
		}catch(err){
			// json解析失败
			res.statusCode =400;
			return res.end(`错误：${er.message}`)
		}
	})
})
// server.listen(1337);
// curl localhost:1336 -d "{}"
// object 
// curl localhost:1337 -d "\"foo\""
// string 
// curl locahost:1337 -d "not json"
// 错误：unexpected token o in JSON at position 1
```
可写流(比如例子中的res)会暴露一些方法,比如write()和end用于写入数据到流。<br>当数据可以从流读取时,可读流会使用EventEmmiterAPI来通知应用程序。从流读取数据的方式有很多中。<br>
可写流和可读流都通过多种方式使用EventEmitterAPI来通讯流当前的状态。<br>
Duplex流和Transform流都是可写又可读的。<br>
对于只需写入数据到流或从流消费数据的的应用程序，并不需要直接实现流的接口，通常也不需要require('stream'）<br>
对于需要实现新类型的流的开发者，可以产生于用于实现流API的章节http://nodejs.cn/api/stream.html#stream_api_for_stream_implementers
## 可写流
可写流是对数据要被写入的目的地的一种抽象。
可写流的例子包括：
- 客户端的HTTP请求
- 服务器的HTTP相应
- fs的写入流
- zlib流
- crypto流
- TCPsoket
- 子进程stdin
- process.stdout、process.stderr
上面的一些例子事实上是实现了可写流接口的Duplex流。<br>
所有可写流都实现了stream.Writeabe类定义的接口。<br>
尽管可写流的具体事例可能略有差别,但所有的可写流都遵循同一基本的使用模式,入一下例子所示。
```js
const myStream = getWriteableStreamSomehow()
myStream.write('一些数据')
myStream.write('更多数据')
myStream.end('完成写入数据')
```

## stream.Writable类
### close事件
当流或其底层资源(比如文件描述)被关闭时触发。表明不会再触发其他事件,也不会再发生操作。
不是所有可写流都会触发'close'事件
### drain事件
如果调用stream.write(chunk)返回false,则当可以继续写入数据到流时会触发'drain'事件。
```js
// 像可写流中写入数据一百万次
// 留意背压(back-pressure)
function WriteOneMillionTimes(writer,data,encoding,callback){
	let i = 1000000;
	write();
	function write(){
		let ok = true 
		do{
			i--
			if(i===0)
			{
				writer.write(data,encoding,callback)
			}
			else
			{
				// 检查是否可以继续写入。
				// 不要传入回调，因为写还有结束
				ok = writer.write(data,encoding)
			}
		}while(i >0 && ok)
		if(i >0){
			// 被提前中止
			// 当被触发'drain'事件继续写入
			wirer.once('drain',write)
		}
	}
}
```
## error事件
当写入数据发生错误时触发。
当触发'error'事件，流还未被关闭
## finish事件
调用stream.end()且缓冲数据都已经传给底层系统之后触发
```js
const writer = getWritableStreamSomehow()
for(let i =0 ; i < 100; i++)
{
	writer.write(`写入#${i}!\n`)
}
writer.end('写入结尾\n');
writer.on('finish',()=>{
	console.log('写入已经完成');
})
```
## pipe事件
src<stream.Readable> 通过管道流入到可写流的来源流。
当在可读流上调用stream.pipe()时触发。
```js
const writer = getWriteableStreamSomehow()
const reader = getReadableStreamSomehow()
writer.on('pipe',(src)=>{
	console.log('有数据正通过管道流血写入器')
	assert.equal(src,reader);

})
reader.pipe(writer);
```
## unpipes事件
src <stream.Readable>被移除可写流管道的来源。
当在可读流伤调用stream.unpipe时触发.
当可读流通过管道流向可写流发货所能错误时,也会触发'unpipe'事件。
```js
const writer = getWritableStreamSomehow()
const reader = getReadableStreamSomehow()
writer.on('unpipe',(src)=>{
	console.log('已经移除可写流管道');
	assert.equal(src,reader);
})
reader.pipe(writer);
reader.unpipe(writer);
```
## Writable.cork()
强制把所有写入的数据都冲倒内存中。当调用stream.uncork()或stream.end()时,缓冲的数据才会被输出。
当写入大量小块数据到流时，内存缓冲可能失效。从而导致性能下降,writeable.cork()蛀牙用于避免这种情况。对这种情况，实现了writeable.\_writev()的流可以用更忧的方式对写入流的数据进行缓冲。

## writable.destrory([error])
- error<Error>
- 返回:<this>
销毁流,并触发'error'事件且传入error参数。调用该方法后,可写流结束了,之后再调用write()或end()会导致ERR_STREAM_DESTROYED错误。实现流时不应该重写这个方法,而是重写writeable.\_destory()。

## writable.end([chunk][,encoding][,callback])

<br> chunk<\string>/\|<\buffer>\|<\Unit8Array>\|<\any>要写入的数据。对于非对象模式的流，chunk必须是字符串、Buffer、或Unit8Array。对于对象模式的流，chunk可以是任何JavaScript值,除了null。
- encoding<\string>如果chunk是字符串，则指定字符编码。
<br>callback<\Function> 当流结束时的回调函数
<br>返回: <\this>
调用writeable.end()表明已没有数据要被写入可写流。可选的chunk和encoding参数可以在关闭流之前再写入一块数据。如果传入了callback函数,则会作为监听器添加到'finish'事件<br>
调用stream.end()之后再调用stream.write()会导致错误
```js
// 写写入‘hello','结束前再写入'‘world’
const fs = require('fs')
const file = fs.createWriteStream('1.txt')
file.write('helle,');
file.end('word!')
// 后面再不允许写入数据
```

## writable.setDefaultEncoding(encoding)
- encoding<string>默认的字符编码
- 返回this
为可写流设置默认的encoding

## writable.uncork()

将调用stream.cork() 后缓冲的所有数据输出到目标<br>
当使用writable.cork() 和writable.uncork()来管理流的写入缓冲时，建议使用 process.nextTick()来延迟调用writable.uncork()。通过这种方式, 可以对单个Node.js事件循环中调用所有writable.write()进行批处理。
```js
stream.cork()
stream.write('一些')
stream.write('数据')
process.nextTick(()=>stream.uncork());
```
如果一个流上多次调用writable.cork(),则必须调用相同次数的writable.uncork()才能输出缓冲的数据
```js
stream.cork()
stream.write('一些')
stream.cork();
stream.write('数据')
process.nextTick(()=>{
	stream.uncork();
	// 数据不会被输出，直到第二次调用uncork()
	stream.uncork()
})

```
## writable.wriable
Is true if it is safe to call[writable.write()][].

## writable.writableHighWaterMark
返回构造可写流时传入的highWaterMark的值。

## writable.writableLength

返回队列中准备被写入的字节数(或对象数)

## writale.write(chunk[,encoding],[callback])
- chunk string\|Buffer\|Unit8Array\|any 要写入的数据。对于非空对象模式流，chunk必须是字符串、buffer或unit8Array。对于对象模式的流，chunk可以是任何JavaScript值，除了null。
- encoding string 如果chunk是字符串，则指定字符串编码
- callback Function 当数据块被输出到目标后的回调函数。
- 返回boolean 如果流需要等待'drain'事件触发才能继续写入更多的数据，则返回false，否则返回true。
writable.write()写入数据到流,并在数据被完全处理之后调用callback。如果发生错误,则callback可能被调用也可能不被调用。为了可靠地检测错误,可以为'error'事件添加监听器。<br>在接收到chunk后,如果内部的缓冲小于创建流时的配置的highWaterMark,则返回true。如果返回false，则应该停止向流写入数据,知道'drain'事件被触发。
当流还未被排空时,调用write()会缓冲chunk,返回false。一旦所有当前缓冲的数据块都被排空了(被操作系统接收并传输),则触发"drain"事件。建议一旦write()返回false，则不再写入任何数据库，直到‘drain'事件被触发。当流还未被排空时,也是可以调用write(),Node.js会缓冲所有被写入的数据块,直到达到最大内存占用，这时它会无条件终止。甚至在它中止之前，高内存占用将会导致垃圾回收期的性能变差和RSS变高(即使内存不再需要,通常也不会被释放回系统)。如果远程的另一端没有读取数据,TCP的socket可能永远也不会排空，所以写入到一个不会排空的socket可能会导致远程可利用的漏洞。
对于Transform,写入数据到一个不会排空的流尤其成问题，因为Tansform流默认会被暂停，直到它们被pipe或者添加了’data‘或'readable'事件句柄。<br>
如果要被写入的数据可以根据要生成或者取得,建议将逻辑封装为一个可读流并且使用stream.pipe()。如果要优先调用write(),则可以使用'drain'事件来防止背压与避免内存问题：
```js

function write(data,cb){
	if(!stream.write(data))
	{
		stream.once('drain',cb)
	}
	else
	{
		process.nextTick(cb)
	}
}
// 在回调函数被执行后再进行其他的写入
write('hello',()=>{
	console.log('完成写入,可以进行更多的写入');
})
```
##行读取器 
##换行符和回车
以前的打印要每秒可以打印10个字,换行要0.2秒,挣好可以打俩个字符
回车是回到开始,换行是换到下一行

###换行的三种情况
- Unix 系统里,每行结尾只有换行"(line feed)"即"\n"
- windows系统里面，没行结尾是"<回车><换行>",即"\r\n"
- Mac系统里，每行结尾是“回车”（carriage return),即"\r"
- 在ASCII码里
  - 换行\n 10 0A
  - 回车\r 13 0D