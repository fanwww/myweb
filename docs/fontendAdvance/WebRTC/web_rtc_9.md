# WebRTC（九）简单的信令服务搭建

## WebRTC 信令服务器的作用

你若想要实现 WebRTC 信令服务器，首先就要知道它在 WebRTC 1 对 1 通信中所起的作用。实际上它的功能是蛮简单的，就是**进行信令的交换，但作用却十分关键。在通信双方彼此连接、传输媒体数据之前，它们要通过信令服务器交换一些信息，如媒体协商。**

举个例子，假设 A 与 B 要进行音视频通信，那么 A 要知道 B 已经上线了，同样，B 也要知道 A 在等着与它通信呢。也就是说，**只有双方都知道彼此存在，才能由一方向另一方发起音视频通信请求，并最终实现音视频通话**

> 那在 WebRTC 信令服务器上要实现哪些功能，才能实现上述结果呢？我想至少要实现下面两个功能：

**房间管理**。即每个用户都要加入到一个具体的房间里，比如两个用户 A 与 B 要进行通话，那么它们必须加入到同一个房间里。

**信令的交换**。即在同一个房间里的用户之间可以相互发送信令。

## 信令服务器的实现

### 1.安装与使用 Node.js

在 Ubuntu 系统下执行：

> apt install nodejs

或在 Mac 系统下执行：

> brew install nodejs

### 2.安装 NPM

除了安装 Node.js 之外，还要安装 NPM（Node Package Manager），也就是 Node.js 的包管理器，或叫包安装工具。它与 Ubuntu 下的 APT（Advanced Package Tool）命令或 Mac 系统下的 BREW 命令类似，是专门用来管理各种依赖库的。 以 Linux 为例，在 APT 没有出现之前，在 Linux 上安装软件是件特别麻烦的事儿，比如要安装一个编辑器，其基本步骤有如下:

- 先将这个工具（编辑器）的源码下载下来；
- 执行./configure 生成 Makefile 文件；
- 执行 make 命令对源码进行编译；
- 如果编译成功，执行 make install 将其安装到指定目录下；
- 如果编译过程中发现还需要其他库，则要对依赖库执行前面的 4 步，也就是先将依赖库安装好，然后再来安装该工具。

**NPM 就是相当于 Linux 下的 APT 工具，它的出现大大提高了 JavaScript 开发人员的工作效率。** 在 Ubuntu 下执行：

> apt install npm

或在 Mac 下执行：

> brew install npm

## Socket.io 的使用

- 给本次连接发消息

> socket.emit()

- 给某个房间内所有人发消息

> io.in(room).emit()

- 除本连接外，给某个房间内所有人发消息

> socket.to(room).emit()

- 除本连接外，给所有人发消息

> socket.broadcast.emit()

你也可以看看下面的例子，其中 S 表示服务器，C 表示客户端，它们是发送消息与接收消息的比对。

- 发送 command 命令

```javascript
S: socket.emit('cmd’);

C: socket.on('cmd',function(){...});
```

- 发送了一个 command 命令，带 data 数据

```javascript
S: socket.emit('action', data);

C: socket.on('action',function(data){...});
```

- 发送了 command 命令，还有两个数据

```javascript
S: socket.emit(action,arg1,arg2);
C: socket.on('action',function(arg1,arg2){...});
```

有了以上这些知识，你就可以实现信令数据通讯了。

## 实现信令服务器

### 1.客户端代码

客户端html

```html
<!DOCTYPE html>
<html>
<head>
<title>WebRTC client</title>
</head>
<body>
<script src='/socket.io/socket.io.js'></script>
<script src='js/client.js'></script>
</body>
</html>
```

client.js

```javascript
var isInitiator;

room = prompt('Enter room name:'); //弹出一个输入窗口

const socket = io.connect(); //与服务端建立socket连接

if (room !== '') { //如果房间不空，则发送 "create or join" 消息

console.log('Joining room ' + room);

socket.emit('create or join', room);

}

socket.on('full', (room) => { //如果从服务端收到 "full" 消息

console.log('Room ' + room + ' is full');

});

socket.on('empty', (room) => { //如果从服务端收到 "empty" 消息

isInitiator = true;

console.log('Room ' + room + ' is empty');

});

socket.on('join', (room) => { //如果从服务端收到 “join" 消息

console.log('Making request to join room ' + room);

console.log('You are the initiator!');

});

socket.on('log', (array) => {

console.log.apply(console, array);

});
```

服务器端代码，server.js 是这样的：

```javascript
const static = require('node-static');

const http = require('http');

const file = new(static.Server)();

const app = http.createServer(function (req, res) {

file.serve(req, res);

}).listen(2013);

const io = require('socket.io').listen(app); //侦听 2013

io.sockets.on('connection', (socket) => {

// convenience function to log server messages to the client

function log(){

const array = ['>>> Message from server: '];

for (var i = 0; i < arguments.length; i++) {

array.push(arguments[i]);

}

socket.emit('log', array);

}

socket.on('message', (message) => { //收到message时，进行广播

log('Got message:', message);

// for a real app, would be room only (not broadcast)

socket.broadcast.emit('message', message); //在真实的应用中，应该只在房间内广播

});

socket.on('create or join', (room) => { //收到 “create or join” 消息

var clientsInRoom = io.sockets.adapter.rooms[room];

var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0; //房间里的人数

log('Room ' + room + ' has ' + numClients + ' client(s)');

log('Request to create or join room ' + room);

if (numClients === 0){ //如果房间里没人

socket.join(room);

socket.emit('created', room); //发送 "created" 消息

} else if (numClients === 1) { //如果房间里有一个人

io.sockets.in(room).emit('join', room);

socket.join(room);

socket.emit('joined', room); //发送 “joined”消息

} else { // max two clients

socket.emit('full', room); //发送 "full" 消息

}

socket.emit('emit(): client ' + socket.id +

' joined room ' + room);

socket.broadcast.emit('broadcast(): client ' + socket.id +

' joined room ' + room);

});

});
```

> 服务端侦听 2013 这个端口，对不同的消息做相应的处理：

- 服务器收到 message 消息时，它会直接进行广播，这样所有连接到该服务器的客户端都会收到广播的消息。
- 服务端收到“create or join”消息时，它会对房间里的人数进行统计，如果房间里没有人，则发送“created”消息；如果房间里有一个人，发送“join”消息和“joined”消息；如果超过两个人，则发送“full”消息。

## 启动服务器并测试

通过上面的步骤，你就使用“Socket.io + Node.js”实现了一个信令服务器。现在你还可以通过下面的命令将服务启动起来了：

> node server.js

如果你是在本机上搭建的服务，则可以在浏览器中输入“localhost:2013”，然后在浏览器中新建一个 tab ，在里边再次输入“localhost:2013”。这时，你就可以通过浏览器的控制台去看看发生了什么吧！