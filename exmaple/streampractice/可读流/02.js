let fs = require('fs');

let rs = fs.createReadStream('./1.txt',{
  highWaterMark:3,
  // 对文件的操作权限
  mode:0o666,
  // 从索引为3的位置开始读
  start:3,
  // 读到索引为8的时候结束，包括索引8 的位置
  end:8,
  // 对文件进行如何操作
  flags:'r',
  encoding:'utf8'
})
rs.on('open',function(){
  console.log('文件打开')
})
//  监听它的data事件, 当你一旦开始监听data事件，流就可以读取文件的内容并且发射data事件
// 默认情况下，当你监听data事件之后，会不停的读取数据，然后触发data事件，然后发射data事件
rs.on('data',function(data){
  console.log(data)
  // 停止读取和发射data事件
  rs.pause();
  setTimeout(function(){
    // 恢复读取并触发data事件
    rs.resume()
  },2000)
})
rs.on('error',()=>{
  console.log('error')
})
rs.on('end',()=>{
  console.log('已经结束');
})
rs.on('close',function(){
  console.log('文件关闭')
})