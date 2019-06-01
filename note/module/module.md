###### 模块
模块发展
* 0.命名空间
* 1.闭包 执行函数
* 2.require.js AMD(不再维护)可以了解
* 3.sea.js CMD(不再维护)
* 4.node.js common.js 
* 5.es6 module
* 7.umd == amd+cmd_common+es+module
<br>

在Node.js中，以模块为单位划分所有功能。一个Node.js应用程序由大量的模块组件，没有模块都是一个JavaScript脚本文件。
<br>
在Node.js 中，模块是一个非常重要的概念，它允许我们将第三方类库引入到外面的应用程序中。
<br>
在Node.js中，几种模块文件：
 
 * 1）后缀名为.js的JavaScript脚本文件 
 * 2）后缀名为.json 的JSON文本文件。
 * 3) 后缀名为.node 的经过编译后的二进制模块文件
###### 1.JS模块化规范 
###### 2.CommonJS规范 
封装功能<br>
封闭作用域<br>
可能解决依赖问题<br>
工作效率更高，重构方便
###### Node中CommonJS
1.在nodejs里面每一个单独的文件都是一个单独的模块 
2.通过调用require方法实现模块间的依赖管理 
###### 核心模块与文件模块
在Node.js中，以模块为单位划分所有功能。
在nodejs中加载模块是同步的。

*  1.找到这个文件 
*  2.读取次模块的内容 
*  3.把他封装在一个函数里立刻执行
*  4.然后把把模块的module.exports对象赋给一个变量

* 为什么node是同步加载模块？<br>
因为有缓存，当第一次加载这个模块之后，会缓存这个模块的exports对象。
以后如果再次加载这个模块的话，则直接从缓存中取，不需要再次加载了
缓存的key是什么？
```
console.log(require.cache)//缓存文件的绝对路径
 console.log(module)
 Module:{
 id: '.', //当前模块ID 入口模块的ID永远为.
 exports: {},//到处对象，默认是一个空对象
 parent: null,//父模块 此模块是谁哪个模块来加载的
 filename:'E:\\node\\module\\test\\01.js',//当前模块的绝对路径
 loaded: false, //是否加载完成
 children: [],//此模块加载了哪些模块
paths: 第三方模块的查找路径
   [ 'E:\\node\\module\\test\\node_modules',
     'E:\\node\\module\\node_modules',
     'E:\\node\\node_modules',
     'E:\\node_modules' ] }
```
###### require
require函数是一个参数，参数值可以为带有完整路径的模块文件名,也可以为模块名。
会先找file,找不到会找file.js如果还找不到file.json,如果还找不到继续找file.node
```
console.log(require)
{ [Function: require]
  resolve: { [Function: resolve] paths: [Function: paths] },//当想知道这个文件的绝对路径，但又不想去加载这个模块
  main: //指的是入口模块 require.main() 文件路径
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: 'E:\\node-note\\exmaple\\module\\01.js',
     loaded: false,
     children: [],
     paths: 
      [ 'E:\\node-note\\exmaple\\module\\node_modules',
        'E:\\node-note\\exmaple\\node_modules',
        'E:\\node-note\\node_modules',
        'E:\\node_modules' ] },
  extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
  cache: 
   { 'E:\\node-note\\exmaple\\module\\01.js': 
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename: 'E:\\node-note\\exmaple\\module\\01.js',
        loaded: false,
        children: [],
        paths: [Array] } } }
```
 //在node里模块类型有三种
  1.js模块  是require加载的
  2.json模块  也是通过require
  3.node C++扩展二进制模块 
  extensions是不同模块的加载函数
<br>
模块在首次加载后将缓存到内存区中，这意味这，对于相同模块多次引用得到的都是同一个模块对象。
<br>
对于相同模块的多次引用不会引起模块内代码的多次执行
```js
// 文件app.js 
const testModule = require('./testModule.js')
const testModule1= require('./testModule.js')

//可以穿传参数
testModule.outputTestVar('moult')
testModule1.outputTestVar('aaaa');

testModule.js
var outputTestVar =function  outputTestVar(args){

}
exports.testVar = testVar;
exports.outputTestVar=outputTestVar

```
* require.resolve()
在Node.js中，可以使用require.resovle函数来查询某个模块文件带有完整路径的文件名。
```js

require('./test.js')
```
* require.cache
在Node.js中，定义了一个require.cache对象，该对象，代表缓存了所以已被加载模块的缓存去。在REPL运行环境中，可以使用console.log(require.cache);表达式来查看缓存区中的内容。

###### 模块分类
* 原生模块
http path fs util events编译成二进制加载，加载速度最快，原来模块通过名称来加载
内置模块放在了node.exe之中
* 文件模块
在硬盘某个位置，加载速度非常快，文件模块通过名称或路径来加载文件，文件模块的后缀有三种(js,json,node)
 * js需要先读取内存再运行

* require加模块<br>
1.检测是否在缓存中，<br>
2.然后看原生模块 
```js 
let load = require('load')
//当前模块的查找路径全局的模块路径
//会找到module.paths 
  paths: 
      [ 'E:\\node\\module\\test\\node_modules',
        'E:\\node\\module\\node_modules',
        'E:\\node\\node_modules',
        'E:\\node_modules' ] },
//global module 
//环境变量中的NODE_PATH指向的目录


```

######  从模块外部访问模块内部的成员
* 使用exports对象
在一个模块文件中定义的本地(即非函数内定义的)变量、函数或对象只在该模块内有效，当你要想从模块外部引用这些变量、函数或对象时，需要在该模块文件内使用exports对象。
```js
 var myMSG= 'heelo'
 var functionname = function (){
 	return 'i m functionname function'
 };
 exports.msg = myMsg;
 exports.funcname =functionname


```