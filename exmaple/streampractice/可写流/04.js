let fs = require('fs')
let rs = fs.createReadStream('./2.txt',{
  highWaterMark:3,
  // 对文件的操作权限
  mode:0o666,
  // 从索引为0的位置开始读
  start:0,
  // 读到索引为8的时候结束，包括索引8 的位置
  // end:8,
  // 对文件进行如何操作
  flags:'r',
  encoding:'utf8'
})

let ws = fs.createWriteStream('./2.txt',{
  flags:'w',
  mode:0o666,
  start:0,
  highWaterMark:3
})
rs.on('open',function(){
  console.log('文件打开')
})
// 当监听可读流data的事件的时候会触发回调函数执行
// 可以实现数据的生成和消费者速度均衡

rs.on('data',function(data){
   console.log(data);
   let flag = ws.write(data);
   if(!flag)
   {
     rs.pause();
   }
 })
 // 监听可写流缓存清空事件，当所有要写入的数据写入完成后，接着恢复从可读流里读取并触发data事件
ws.on('drain',function(){
  console.log();
  rs.resume()
})