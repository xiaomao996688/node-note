###### npm 

* 全局安装
npm install <package-name> -g 

* 在全局安装的模式下，npm 会把包安装到全局目录，通过此命令可以查看当前全局目录的位置
npm root -g 
* 如果要修改全局安装目录，可以使用
 
 npm config set prefix "F:\node.js\node_global"
 路径要用双引号括起来 

* 如果包里有可执行文件，会把可执行文件安装到node_modules的上一级目录

C:\Users\administrator\AppData\Roaming\npm\ 

* 全局安装的一般是需要在任意目录下面执行的命令，比如babel

npm install babel-cli -g
