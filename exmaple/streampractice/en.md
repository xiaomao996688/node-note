## Stream 
A stream is on abstract interface for working with stream data in Node.js.
The stream module provides an API for implementing the the stream interface.
There are many stream objects provided by Node.js. For instance, a request to an HTTP server and process.stdout are both stream instances.For instance, a request to an HTTP server and process.stdout are both stream instances.
To access the stream module: 
````js
 const stream = require('stream')
`````
The stream module is useful for creating new types of stream instance .It is usually not necessary to use the stream module to consume streams.
```js
abstract:
adj. 纯理论的；抽象的；抽象派的
n. 摘要；抽象；抽象的概念；抽象派艺术作品
v. 摘要；提取；抽象化；退出；转移；使心不在焉
interface：
n. 界面；<计>接口；交界面
v. （使通过界面或接口）接合，连接；[计算机]使联系
vi. 相互作用（或影响）；交流，交谈
consume:
vt. 消耗，消费；使…着迷；挥霍
vi. 耗尽，毁灭；耗尽生命
```
## Organization of this Document 
This document contains two primary sections and a third section for notes.The first section explains how to use exising streams within an application .The second section explains how to create new types of streams.

```js
explains:
v. 解释；说明（explain的三单形式）
````
## Types of Streams 
There are four fundamental stream types within Node.js
- Writable-streams to which data canbe written (for example fs.createWriteSteam())
- Readable-streams from which data can be read(for example fs.createReadStream())
- Duplex-streams that are both Readable and Writeable(for example,net.Socket)
- Transform- Duplex streams that can modify or transform the data as it is written and read(for example zlib.createDeflate()).
Additionally,this module includes the utility functions stream.pipleline(),stream.finished() and stream.Readable.from().
```js
fundamental :
n. 基本原理；基本原则
adj. 基本的，根本的
 Duplex:双工
 n. 成对物；连栋式的两栋住宅，联式房屋；占两层楼的公寓套房，复式住宅；半独立式房屋；双股多核苷酸分子
n. (Duplex) （美、英、法、秘鲁、俄）迪普莱（人名）
adj. 二倍的，双重的；复式的，占两层楼的；双层的；双螺旋的；双面打印的；（信号）双向的
````

## Object Mode
All stream created by Node.js APIs operater on string and Buffer(or Unit8Array)object.It is possible,however,for stream implementations to
```js
implementations:
n. 安装启用，履行（implementation的复数形式）

````