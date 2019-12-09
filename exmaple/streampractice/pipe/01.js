// pipe
 const fs = require('fs')

 rs.pipe(ws)
 // 移除目标可写流
 re.unpipe(ws)

 // 当监听可读流data事件的时候