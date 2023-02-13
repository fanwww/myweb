# WebRTC（七）媒体协商

### 媒体协商

## 创建连接和信令

- **创建连接**，指的是创建 RTCPeerConnection，它负责端与端之间彼此建立 P2P 连接。在后面 RTCPeerConnection 一节中，我们还会对其做进一步的介绍。
- **信令**，指的是客户端通过信令服务器交换 SDP 信息。

## WebRTC 中媒体协商的作用

**媒体协商的作用**就是让**双方**找到**共同支持的媒体能力**，如双方都支持的编解码器，从而最终实现彼此之间的音视频通信。

- 首先，通信双方将它们各自的媒体信息，如编解码器、媒体流的 SSRC、传输协议、IP 地址和端口等，按 SDP 格式整理好。
- 然后，通信双方通过信令服务器交换 SDP 信息，并待彼此拿到对方的 SDP 信息后，找出它们共同支持的媒体能力。
- 最后，双方按照协商好的媒体能力开始音视频通信

### RTCPeerConnection

> **RTCPeerConnection** 类， 顾名思义，它表示的就是端与端之间建立的**连接**, **端到端之间的媒体协商，就是基于 RTCPeerConnection 对象实现的**。

```javascript
var pcConfig = null;
var pc = new RTCPeerConnection(pcConfig);
```

在 JavaScript 下创建 RTCPeerConnection 对象非常简单，如上所述，只要通过 new 关键字创建即可。

在创建 RTCPeerConnection 对象时，还可以给它传一个参数 pcConfig，该参数的结构非常复杂，这里我们先将其设置为 null

## 媒体协商的过程

> 在通讯双方都创建好 **RTCPeerConnection** 对象后，它们就可以开始进行媒体协商了。不过在进行媒体协商之前，有两个重要的概念，即 **Offer** 与 **Answer** ，你必须要弄清楚。

`Offer` 与 `Answer` 是什么呢？对于 1 对 1 通信的双方来说，我们称首先发送媒体协商消息的一方为呼叫方，而另一方则为被呼叫方。

**Offer**，在双方通讯时，呼叫方发送的 SDP 消息称为 Offer。

**Answer**，在双方通讯时，被呼叫方发送的 SDP 消息称为 Answer。

- **首先**，呼叫方创建 Offer 类型的 SDP 消息。创建完成后，调用 setLocalDescriptoin 方法将该 Offer 保存到本地 Local 域，然后通过信令将 Offer 发送给被呼叫方。
- 被呼叫方收到 Offer 类型的 SDP 消息后，调用 setRemoteDescription 方法将 Offer 保存到它的 Remote 域。作为应答，被呼叫方要创建 Answer 类型的 SDP 消息，Answer 消息创建成功后，再调用 setLocalDescription 方法将 Answer 类型的 SDP 消息保存到本地的 Local 域。最后，被呼叫方将 Answer 消息通过信令发送给呼叫方。至此，被呼叫方的工作就完部完成了。
- 接下来是呼叫方的收尾工作，呼叫方收到 Answer 类型的消息后，调用 RTCPeerConnecton 对象的 setRemoteDescription 方法，将 Answer 保存到它的 Remote 域。
- 至此，整个媒体协商过程处理完毕。

## 媒体协商的代码实现

了解了 WebRTC 的媒体协商过程之后，我们再看一下如何使用 JavaScript 代码来实现这一功能。浏览器提供了几个非常方便的 API，这些 API 是对底层 WebRTC API 的封装。如下所示：

**createOffer** ，创建 Offer；

**createAnswer**，创建 Answer；

**setLocalDescription**，设置本地 SDP 信息；

**setRemoteDescription**，设置远端的 SDP 信息。

### 1. 呼叫方创建 Offer

```javascript
function doCall() {

console.log('Sending offer to peer');

pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);

}
```

如果 createOffer 函数调用成功的话，浏览器会回调我们设置的 setLocalAndSendMessage 方法，你可以在 setLocalAndSendMessage 方法里获取到 RTCSessionDescription 类型的 SDP 信息；如果出错则会回调 handleCreateOfferError 方法。

最终，在 setLocalAndSendMessage 回调方法中，通过 setLocalDescription() 方法将本地 SDP 描述信息设置到 WebRTC 的 Local 域。然后通过信令通道将此会话描述发送给被呼叫方。代码如下所示：

```javascript
function setLocalAndSendMessage(sessionDescription) {

pc.setLocalDescription(sessionDescription);

sendMessage(sessionDescription);

}
```

### 2. 被呼叫方收到 Offer

被呼叫方收到 Offer 后，调用 setRemoteDescription 方法设置呼叫方发送给它的 Offer 作为远端描述。代码如下：

```javascript
socket.on('message', function(message) {

...

} else if (message.type === 'offer') {

pc.setRemoteDescription(new RTCSessionDescription(message));

doAnswer();

} else if (...) {

...

}

....

});
```

### 3. 被呼叫方创建 Answer

然后，被呼叫方调用 RTCPeerConnection 对象的 createAnswer 方法，它会生成一个与远程会话兼容的本地会话，并最终将该会话描述发送给呼叫方。

```javascript
function doAnswer() {

pc.createAnswer().then(

setLocalAndSendMessage,

onCreateSessionDescriptionError

);

}
```

### 4. 呼叫方收到 Answer

当呼叫方得到被呼叫方的会话描述，即 SDP 时，调用 setRemoteDescription 方法，将收到的会话描述设置为一个远程会话。代码如下：

```javascript
socket.on('message', function(message) {

...

} else if (message.type === 'answer') {

pc.setRemoteDescription(new RTCSessionDescription(message));

} else if (...) {

...

}

....

});
```

**需要特别注意的是，通信双方链路的建立是在设置本地媒体能力，即调用 setLocalDescription 函数之后才进行的。**