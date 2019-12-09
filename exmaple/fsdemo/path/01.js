let path = require('path')

// 连接俩个项目
console.log(path.join('a','b'));
// 从当前路径出发，解析出一个绝对路径
// ..代表上一级目录
// .代表当前目录
// fs代表当前目录下的fs目录
console.log(path.resolve('..','.','fs'));

console.log(__filename);
// 环境变量路劲分隔符
// 因为在不同操作系统,分隔符不一样
console.log(path.delimiter);
console.log(path.win32.delimiter);
// linux下
console.log(path.posix.delimiter);
// 文件路径分隔符
console.log(path.sep);
console.log(path.win32.sep);
console.log(path.posix.sep);
// path.relative获得俩个路径之间的相对路径

//basename获取的是文件名aa
console.log(path.basename('aa.jpg'));
console.log(path.basename('aa.jpg','.jpg'));
	// 获取文件的扩展平
console.log(path.extname('aa.jpg'));
// console.log(path.extname('aa.jpg','jpg'));