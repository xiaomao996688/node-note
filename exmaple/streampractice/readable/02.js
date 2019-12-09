/*
* @Author: zll
* @Date:   2019-08-31 15:44:35
* @Last Modified by:   zll
* @Last Modified time: 2019-08-31 15:47:57
*/

// 当你读取一个字节后，发现只剩下2个字节，不够highWaterMark,会再读highwatermark字节并填到缓存区内

let fs  = require('fs')