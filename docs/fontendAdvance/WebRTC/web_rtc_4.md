# WebRTC（四）视频的录制

# 服务端录制和客户端录制

- **服务端录制**：优点是不用担心客户因自身电脑问题造成录制失败（如磁盘空间不足），也不会因录制时抢占资源（CPU 占用率过高）而导致其他应用出现问题等；缺点是实现的复杂度很高。
- **客户端录制**：优点是方便录制方（如老师）操控，并且所录制的视频清晰度高，实现相对简单。这里可以和服务端录制做个对比，一般客户端摄像头的分辨率都非常高的（如 1280x720），所以客户端录制可以录制出非常清晰的视频；但服务端录制要做到这点就很困难了，本地高清的视频在上传服务端时由于网络带宽不足，视频的分辨率很有可能会被自动缩小到了 640x360，这就导致用户回看时视频特别模糊，用户体验差。不过客户端录制也有很明显的缺点，其中最主要的缺点就是录制失败率高。因为客户端在进行录制时会开启第二路编码器，这样会特别耗 CPU。而 CPU 占用过高后，就很容易造成应用程序卡死。除此之外，它对内存、硬盘的要求也特别高。

## 如何录制本地音视频

> WebRTC 为我们提供了一个非常方便的类，即 MediaRecorder。创建 MediaRecorder 对象的格式如下：

```javascript
var mediaRecorder = new MediaRecorder(stream[, options]);
```

其参数含义如下：

- **stream**，通过 getUserMedia 获取的本地视频流或通过 RTCPeerConnection 获取的远程视频流。
- **options**，可选项，指定视频格式、编解码器、码率等相关信息，如 mimeType: 'video/webm;codecs=vp8'。

**MediaRecorder** 对象还有一个特别重要的事件，即 **ondataavailable** 事件。当 **MediaRecoder** 捕获到数据时就会触发该事件。通过它，我们才能将音视频数据录制下来。

## 视频录取

### 1.创建html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频录取</title>
</head>
<body>
    
    <video id="recvideo"></video>
    <button id="record">Start Record</button>
    <button id="recplay">Play</button>
    <button id="download">Download</button>
    <video autoplay playsinline id="vi"></video>
    <script src="./js/video.js"></script>
</body>
</html>
```

### 2.创建js

```javascript
var buffer;
// stream，通过 getUserMedia 获取的本地视频流或通过 RTCPeerConnection 获取的远程视频流。
// options，可选项，指定视频格式、编解码器、码率等相关信息，如 mimeType: 'video/webm;codecs=vp8'。
// MediaRecorder 对象还有一个特别重要的事件，即 ondataavailable 事件。当 MediaRecoder 捕获到数据时就会触发该事件。通过它，我们才能将音视频数据录制下来。
//当该函数被触发后，将数据压入到blob中
function handleDataAvailable(e){
        if(e && e.data && e.data.size > 0){
                buffer.push(e.data);
        }
}

let mediaRecorder;
function startRecord(){
        buffer = [];

        //设置录制下来的多媒体格式 
        var options = {
                mimeType: 'video/webm;codecs=vp8'
        }
        //判断浏览器是否支持录制
        if(!MediaRecorder.isTypeSupported(options.mimeType)){
                console.error(`${options.mimeType} is not supported!`);
                return;
        }
        try{
                //创建录制对象
                mediaRecorder = new MediaRecorder(window.stream, options);
        }catch(e){
                console.error('Failed to create MediaRecorder:', e);
                return;
        }
        //当有音视频数据来了之后触发该事件
        mediaRecorder.ondataavailable = handleDataAvailable;
        //开始录制
        mediaRecorder.start(10);
        recvideo = null
}
function stopRecord(){
	mediaRecorder.stop();
}
```

当你点击 **Record** 按钮的时候，就会调用 **startRecord** 函数。在该函数中首先判断浏览器是否支持指定的多媒体格式，如 webm。 如果支持的话，再创建 **MediaRecorder** 对象，将音视频流录制成指定的媒体格式文件。

实际存储时，是通过 **ondataavailable** 事件操作的。每当 **ondataavailable** 事件触发时，就会调用 **handleDataAvailable** 函数。该函数的实现就特别简单了，直接将数据 push 到 buffer 中，实际在浏览器底层使用的是 Blob 对象。

另外，在开启录制时，可以设置一个毫秒级的时间片，这样录制的媒体数据会按照你设置的值分割成一个个单独的区块，否则默认的方式是录制一个非常大的整块内容。分成一块一块的区块会提高效率和可靠性，如果是一整块数据，随着时间的推移，数据块越来越大，读写效率就会变差，而且增加了写入文件的失败率。

## 2. 回放录制文件

### 添加js代码

下面的 JavaScript 是将录制内容与标签联接到一起：

```javascript
var blob = new Blob(buffer, {type: 'video/webm'});

recvideo.src = window.URL.createObjectURL(blob);

recvideo.srcObject = null;

recvideo.controls = true;

recvideo.play();
```

## 下载录制好的文件

```javascript
tnDownload.onclick = ()=> {

var blob = new Blob(buffer, {type: 'video/webm'});

var url = window.URL.createObjectURL(blob);

var a = document.createElement('a');

a.href = url;

a.style.display = 'none';

a.download = 'aaa.webm';

a.click();

}
```

