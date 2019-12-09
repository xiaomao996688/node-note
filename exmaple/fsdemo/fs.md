## fs模块
- 在Node.js中,使用fs模块来实现所有有关文件及目录的创建、写入及删除
- 在fs模块中，所有的方法都分为同步和异步俩种实现
- 具有sync后缀的方法为同步,不具有sync后缀的方法为异步

## 整体读取文件
1. 异步读取
fs.readFile(path[, options], callback)
- path是文件名字或者文件目录
- option可以配置encoding和flag,encoding默认为null,flag默认为'r'.
<br>flag:
<br>'a' 打开文件用于追加,如果文件不存在，则重新创建一个。
<br>'ax' 与a类似,但是如果这个路径存在，则失败
<br>'a+' 打开文件读取和追加,如果这个文件不存在，则创建这个文件。
<br>'ax+'像a+类似,但是如果这个文件存在，则失败
<br>'as' 以同步模式打开文件用于追加，如果这个文件不存在，则创建这个文件。
<br>'as+'以同步模式打开文件用于读取和追加,如果这个文件不存在，则创建这个文件。
<br>'r' 打开文件读取,如果文件不存在，则发生异常。
<br>'r+'打开文件用于读和写。如果这个文件不存在，则异常发生。
<br>'rs+' 用同步模式打开用于读取和写入，指示操作系统取绕开本地文件系统缓存。
<br>这是根本上非常有用的对于打开文件在NFS加载文件系统，它允许跳过潜在陈旧本地缓存,他是一个非常真影响在I/O性能，所以要使用这个flag是不推荐的除非它是被需要的。
<br>这是不存才fs.open()或者fsPromises.open()进去一个同步块调用，如果是同步操作是被需要，可以像这样fs.openSync()这样来使用。
<br>‘w‘ Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
<br>'wx''Like 'w' but fails if the path exists.
<br>'w+' Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
<br>'wx+' - Like 'w+' but fails if the path exists.
<br>flag can also be a number as documented by open(2); commonly used constants are available from fs.constants. On Windows, flags are translated to their equivalent ones where applicable, e.g. O_WRONLY to FILE_GENERIC_WRITE, or O_EXCL|O_CREAT to CREATE_NEW, as accepted by CreateFileW. <br>

The exclusive flag 'x' (O_EXCL flag in open(2)) ensures that path is newly created. On POSIX systems, path is considered to exist even if it is a symlink to a non-existent file. The exclusive flag may or may not work with network file systems.
<br>
On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.<br>

Modifying a file rather than replacing it may require a flags mode of 'r+' rather than the default mode 'w'.<br>

The behavior of some flags are platform-specific. As such, opening a directory on macOS and Linux with the 'a+' flag - see example below - will return an error. In contrast, on Windows and FreeBSD, a file descriptor or a FileHandle will be returned.
```js
// macOS and Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows and FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```
On Windows, opening an existing hidden file using the 'w' flag (either through fs.open() or fs.writeFile() or fsPromises.open()) will fail with EPERM. Existing hidden files can be opened for writing with the 'r+' flag.
<br>A call to fs.ftruncate() or filehandle.truncate() can be used to reset the file contents.
- callback 有俩个参数err和data
<br>
2. 同步读取
fs.readFileSync(path[, options])
- path
- option可以配置encoding和flag,encoding默认为null,flag默认为'r'.


## fs.open(pathfilename,flag,mode,callback(err,fd))
fd文件描述符 file discriptor文件描述文符
fd是从0开始的，打开一个文件就是0，打开俩个文件就是1，打开
三个文件就是2。<br>
其中0对应标准输入，对应键盘<br>
1标准出去stdout <br>
2错误输出stderr
```js
const fs = require('fs')

fs.open('./1.txt','r',0o666,(err,fd)=>{
	console.log(fd);//3
});

// 标准输入，输入的数打出来
process.stdin.on('data',(data)=>{
	console.log(data);
})
// 标准输出，
process.stdout.write('helle')
// 错误输出
process.stderr.write('wrong')
```
## fs.read(fd,buff,offset.length,position,callback)
buff:存的id
length:表示读几个字节长度
offset:从第几个字节开始写
postion:从文件的第几个字节开始取，position不传，表示从当前位置开始
```js
	fs.open('./1.txt','r',0o666,(err,fd)=>{
	console.log(fd);
	let buff = Buffer.alloc(3)
	fs.read(fd,buff,0,3,0,function(err,bytesRead,buffer){
		console.log(buff.toString());
	})
});
```
<!-- 精确写入 -->
## fs.write(fd,Buffer.from('str'),offset,length,position,callback(err,bytesWriten))
bytesWriten实际写入字节数
```js
	
当写入完成之后缓存区可能还存在一些数据
// 调用fs.fsync强行把缓存区的数据写入文件，并且关闭
fs.fsync(fd,function(err){
	fs.close(function(){
		console.log('关闭');
	})
})
```
## fs.close()
关闭
## 拷贝文件

```


```
## 创建目录
fs.mkdir('a',function(err){
	
})
## 判断一个目录是否存在
fs.access('a',0o)