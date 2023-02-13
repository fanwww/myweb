# WebRTC（十一）实时传输文件

### WebRTC实时传输文件

## 基本原理

在 WebRTC 中，**实时文件的传输与实时文本消息传输的基本原理是一样的，都是使用 RTCDataChannel 对象进行传输**。但它们之间还是有一些差别的，一方面是**传输数据的类型**不一样，另一方面是**数据的大小**不一样

## 文件传输的具体实现

### 1. RTCDataChannel 对象的创建

```javascript
//创建 RTCDataChannel 对象的选项

var options = {

ordered: true,

maxRetransmits : 30

};

//创建 RTCPeerConnection 对象

var pc = new RTCPeerConnection();

//创建 RTCDataChannel 对象

var dc = pc.createDataChannel("dc", options);
```

通过对比，你可以看到它们之间的不同是：在实时文件传输中创建 RTCDataChannel 对象带了 options 参数，而实时文本聊天中并没有带该参数。

在这个示例中之所以要带 options 参数，是因为在端与端之间传输文件时，必须要保证文件内容的有序和完整，所以在创建 RTCDataChannel 对象时，你需要给它设置一些参数，即需要设置 **ordered** 和 **maxRetransmits** 选项。当 ordered 设置为真后，就可以保证数据的有序到达；而 maxRetransmits 设置为 30，则保证在有丢包的情况下可以对丢包进行重传，并且最多尝试重传 30 次。

通过实践证明，如果你在创建 RTCDataChannel 对象时不设置这两个参数的话，那么在传输大文件（如 800M 大小的文件）时就很容易失败。而设置了这两个参数后，传输大文件时基本就没再失败过了，由此可见这两个参数的重要性了。

### 2. 通过 RTCDataChannel 对象接收数据

> 创建好 RTCDataChannel 对象后，你仍然要实现 RTCDataChannel 对象的 4 个重要事件（打开、关闭、接收到消息以及出错时接收到事件）的回调函数，代码如下：

```javascript
dc.onerror = (error)=> {

...

};

dc.onopen = ()=> {

...

};

dc.onclose = () => {

...

};

dc.onmessage = (event)=>{

...

}
```

这四个事件的作用如下：

- **onerror**，是指当发生连接失败时的处理逻辑；
- **onopen**，是指当 datachannel 打开时的处理逻辑；
- **onclose**，是指当 datachannel 关闭时的处理逻辑；
- **onmessage**，是指当收到消息时的处理逻辑。

其中最重要的是 **onmessage** 事件，当有数据到达时就会触发该事件。那接下来，我们就看一下到底该如何实现这个事件处理函数，具体代码如下：

```javascript
var receiveBuffer = []; //存放数据的数组

var receiveSize = 0; //数据大小

...

onmessage = (event) => {

//每次事件被触发时，说明有数据来了，将收到的数据放到数组中

receiveBuffer.push(event.data);

//更新已经收到的数据的长度

receivedSize += event.data.byteLength;

//如果接收到的字节数与文件大小相同，则创建文件

if (receivedSize === fileSize) { //fileSize 是通过信令传过来的

//创建文件

var received = new Blob(receiveBuffer, {type: 'application/octet-stream'});

//将buffer和 size 清空，为下一次传文件做准备

receiveBuffer = [];

receiveSize = 0;

//生成下载地址

downloadAnchor.href = URL.createObjectURL(received);

downloadAnchor.download = fileName;

downloadAnchor.textContent =

`Click to download '${fileName}' (${fileSize} bytes)`;

downloadAnchor.style.display = 'block';

}

}
```

面这段代码的逻辑还是非常简单的，每当该函数被调用时，说明被传输文件的一部分数据已经到达了。这时你只需要简单地将收到的这块数据 push 到 receiveBuffer 数组中即可。

当文件的所有数据都收到后，即receivedSize === fileSize条件成立时，你就可以以 receiveBuffer[] 数组为参数创建一个 Blob 对象了。紧接着，再给这个 Blob 对象创建一个下载地址，这样接收端的用户就可以通过该地址获取到文件了。

### 3. 文件的读取与发送

```javascript
unction sendData(){

var offset = 0; //偏移量

var chunkSize = 16384; //每次传输的块大小

var file = fileInput.files[0]; //要传输的文件，它是通过HTML中的file获取的

...

//创建fileReader来读取文件

fileReader = new FileReader();

...

fileReader.onload = e => { //当数据被加载时触发该事件

...

dc.send(e.target.result); //发送数据

offset += e.target.result.byteLength; //更改已读数据的偏移量

...

if (offset < file.size) { //如果文件没有被读完

readSlice(offset); // 读取数据

}

}

var readSlice = o => {

const slice = file.slice(offset, o + chunkSize); //计算数据位置

fileReader.readAsArrayBuffer(slice); //读取 16K 数据

};

readSlice(0); //开始读取数据

}
```

在这段示例代码中，数据的读取是通过 sendData 函数实现的。在该函数中，使用 FileReader 对象每次从文件中读取 16K 的数据，然后再调用 RTCDataChannel 对象的 send 方法将其发送出去。

这段代码中有两个关键点：一是 sendData 整个函数的执行是 readSlice(0) 开始的；二是 FileReader 对象的 onload 事件是在有数据被读入到 FileReader 的缓冲区之后才触发的。掌握了这两个关键点，你就非常容易理解 sendData 函数的逻辑了。

那该怎么理解这两个关键点呢？实际上， sendData 函数在创建了 FileReader 对象之后，下面的代码都不会执行，直到调用 readSlice(0) 才开始从文件中读取数据；当数据被读到 FileReader 对象的缓冲区之后，就会触发 onload 事件，从而开始执行 onload 事件的回调函数。而在这个回调函数中是一个循环，不断地从文件中读取数据、发送数据，直到读到文件结束为止。以上就是 sendData 函数的逻辑。

### 4. 通过信令传递文件的基本信息

> 上面我已经将 RTCDataChannel 对象的创建、数据发送与接收的方法以及 JavaScript 对文件进行读取的操作向你做了详细的介绍。但还有一块儿重要的知识需要向你讲解，那就是：接收端是如何知道发送端所要传输的文件大小、类型以及文件名的呢？

```javascript
...

//获取文件相关的信息

fileName = file.name;

fileSize = file.size;

fileType = file.type;

lastModifyTime = file.lastModified;

//向信令服务器发送消息

sendMessage(roomid,

{

//将文件信息以 JSON 格式发磅

type: 'fileinfo',

name: file.name,

size: file.size,

filetype: file.type,

lastmodify: file.lastModified

}

);
```

在本段代码中，发送端首先获得被传输文件的基本信息，如文件名、文件类型、文件大小等，然后再通过 socket.io 以 JSON 的格式将这些信息发给信令服务器。

信令服务器收到该消息后不做其他处理，直接转发到接收端。下面是接收端收到消息后的处理逻辑，代码如下：

```javascript
socket.on('message', (roomid, data) => {

...

//如果是 fileinfo 类型的消息

if(data.hasOwnProperty('type') && data.type === 'fileinfo'){

//读出文件的基本信息

fileName = data.name;

fileType = data.filetype;

fileSize = data.size;

lastModifyTime = data.lastModify;

...

}

...

});
```

在接收端的 socket.io 一直在侦听 message 消息，当收到 message 消息且类型（type）为 fileinfo 时，说明对方已经将要传输文件的基本信息发送过来了。 接收到文件的基本信息后，接收端的处理逻辑也非常简单，只需要将传过来的基本信息保存起来就好了，等整个文件传输完成后，再根据这些信息生成对应的文件，这样接收端就可以将传输的文件拿到手了。