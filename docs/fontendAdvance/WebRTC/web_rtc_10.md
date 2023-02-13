# WebRTC（十）文本聊天的实现

### 文本聊天的实现

## 配置 RTCDataChannel

```javascript
var pc = new RTCPeerConnection(); //创建 RTCPeerConnection 对象
var dc = pc.createDataChannel("dc", options); //创建 RTCDataChannel对象
```

- 第一个参数是一个标签（字符串），相当于给 RTCDataChannel 起了一个名字；
- 第二个参数是 options，其形式如下：

```javascript
var options = {

ordered: false,

maxPacketLifeTime: 3000

};
```

> 下面我就向你详细介绍一下 options 所支持的选项。

- **ordered**：消息的传递是否有序。
- **maxPacketLifeTime**：重传消息失败的最长时间。也就是说超过这个时间后，即使消息重传失败了也不再进行重传了。
- **maxRetransmits**：重传消息失败的最大次数。
- **protocol**：用户自定义的子协议，也就是说可以根据用户自己的业务需求而定义的私有协议，默认为空。
- **negotiated**：如果为 true，则会删除另一方数据通道的自动设置。这也意味着你可以通过自己的方式在另一侧创建具有相同 ID 的数据通道。
- **id**：当 negotiated 为 true 时，允许你提供自己的 ID 与 channel 进行绑定。

在上面的选项中，前三项是经常使用的，也是你要重点搞清楚的。不过需要特别说明的是， **maxRetransmits** 与 **maxPacketLifeTime** 是互斥的，也就是说这**两者不能同时存在**，只能二选一。

## 代码实现

### 1. 添加事件

```javascript
var startButton = document.querySelector('button#startButton');

var callButton = document.querySelector('button#callButton');

var sendButton = document.querySelector('button#sendButton');

var closeButton = document.querySelector('button#closeButton');

startButton.onclick = connectServer; //createConnection;

callButton.onclick = call;

sendButton.onclick = sendData;

closeButton.onclick = closeDataChannels;
```

> 在这个段代码中定义了 4 个 button，其中 Start 按钮用于与信令服务器建立连接；Call 用于创建 RTCDataChannel 对象；Send 用于发送文本数据；Close 用于关闭连接释放资源。

### 2. 创建连接

用户在页面上点击 Start 按钮时，会调用 connectServer 方法。具体代码如下：

```javascript
function connectServer(){

socket = io.connect(); //与服务器建立连接

...

socket.on('created', function(room) { //第一个用户加入后收到的消息

createConnection();

});

socket.on('joined', function(room) { //第二个用户加入后收到的消息

createConnection();

});

...

}
```

从代码中可以看到，connectServer 函数首先调用 io.connect() 连接信令服务器，然后再根据信令服务器下发的消息做不同的处理。

> 需要注意的是，在本例中我们使用了 socket.io 库与信令服务器建立连接

如果消息是 created 或 joined，则调用 createConnection 创建 RTCPeerConnection。其代码如下：

```javascript
var servers = {
 "iceServers": [{ "url": "stun:stun.1.google.com:19302" }] 
};

pc = new RTCPeerConnection(servers, pcConstraint);

pc.onicecandidate = handleIceCandidate; //收集候选者

pc.ondatachannel = onDataChannelAdded; //当对接创建数据通道时会回调该方法。
```

### 3. 创建 RTCDataChannel

```javascript
dc = pc.createDataChannel('sendDataChannel',

dataConstraint); //一端主动创建 RTCDataChannel

...

dc.onmessage = receivedMessage; //当有文本数据来时，回调该函数。

pc.createOffer(setLocalAndSendMessage,

onCreateSessionDescriptionError); //创建offer，如果成功，则在 setLocalAndSendMessage 函数中将 SDP 发送给远端
```

当其中一方创建了 RTCDataChannel 且通信双方完成了媒体协商、交换了 SDP 之后，另一端收到发送端的消息，ondatachannel 事件就会被触发。此时就会调用它的回调函数 onDataChannelAdded ，通过 onDataChannelAdded 函数的参数 event 你就可以获取到另一端的 RTCDataChannel 对象了。具体如下所示：

```javascript
function onDataChannelAdded(event) {

dc = event.channel;

dc.onmessage = receivedMessage;

...

}
```

### 4. 数据的发送与接收

数据的发送非常简单，当用户点击 Send 按钮后，文本数据就会通过 RTCDataChannel 传输到远端。其代码如下：

```javascript
function sendData() {

var data = dataChannelSend.value;

dc.send(data);

}
```

而对于接收数据，则是通过 RTCDataChannel 的 onmessage 事件实现的。当该事件触发后，会调用 receivedMessage 方法。通过其参数就可以获取到对端发送的文本数据了。具体代码如下：

```javascript
function receivedMessage(e) {

var msg = e.data;

if (msg) {

dataChannelReceive.value += "<- " + msg + "\n";

}

};
```