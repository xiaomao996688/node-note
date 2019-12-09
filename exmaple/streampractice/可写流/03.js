
let fs = require('fs')
let rs = fs.createReadStream('./2.txt',{
  flags:'r',
  mode:0o666,
  start:0,
  highWaterMark:3
})
let ws = fs.createWriteStream('./2.txt',{
  flags:'w',
  mode:0o666,
  start:0,
  highWaterMark:3
})
// 当你往可写流里写数据的时候，不会立刻写入文件，会先写入缓存区，当缓存区满了之后才会写入文件之中

//  写入的时候会返回一个boolean
// 如果缓存区已满返回false
// 如果缓存区未满返回true ，
// 按理说返回false，就不能往里面写了，但是如果false之后继续写也不会报错，会缓存在内存之中，等缓存区清空之后，再从内存中读出来
let  flag ;
flag = ws.write('1');
console.log(flag)
flag = ws.write('2');
console.log(flag)
flag = ws.write('3');
console.log(flag)
flag = ws.write('4');
console.log(flag)


// 监听可写流缓存清空事件，当所有要写入的数据写入完成后，接着恢复从可读流里读取并触发data事件


ws.on('drain',function(){
  console.log();
  re.resume()
})