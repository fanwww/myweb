# WebRTC（一）getUserMedia 使用

## 什么是`WebRTC`?

> - WebRTC，网页即时通信（Web Real-Time Communication），实现了基于网页的视频会议。WebRTC具有免安装，方便接入的特点，它不需要安装任何插件，在浏览器上就可以实现网页端的实时通信。在浏览器之间快速地实现音视频通信。
>
> - WebRTC是一个开源项目，旨在使得浏览器能为实时通信（RTC）提供简单的JavaScript接口。说的简单明了一点就是让浏览器提供JS的即时通信接口。这个接口所创立的信道并不是像WebSocket一样，打通一个浏览器与WebSocket服务器之间的通信，而是通过一系列的信令，建立一个浏览器与浏览器之间（peer-to-peer）的信道，这个信道可以发送任何数据，而不需要经过服务器。并且WebRTC通过实现MediaStream，通过浏览器调用设备的摄像头、话筒，使得浏览器之间可以传递音频和视频。

## 音视频采集基本概念

在正式介绍 JavaScript 采集音视频数据的 API 之前，你还需要了解一些基本概念。这些概念虽然都不难理解，但在后面讲解 API 时都会用到它们，很是重要，所以在这里我还是给你着重汇总和强调下。

- **摄像头** ：用于捕捉（采集）图像和视频。
- **帧率**：现在的摄像头功能已非常强大，一般情况下，一秒钟可以采集 30 张以上的图像，一些好的摄像头甚至可以采集 100 张以上。我们把摄像头一秒钟采集图像的次数称为帧率。帧率越高，视频就越平滑流畅。然而，在直播系统中一般不会设置太高的帧率，因为帧率越高，占的网络带宽就越多。
- **分辨率**：摄像头除了可以设置帧率之外，还可以调整分辨率。我们常见的分辨率有 2K、1080P、720P、420P 等。分辨率越高图像就越清晰，但同时也带来一个问题，即占用的带宽也就越多。所以，在直播系统中，分辨率的高低与网络带宽有紧密的联系。也就是说，分辨率会跟据你的网络带宽进行动态调整。
- **宽高比**：分辨率一般分为两种宽高比，即 16:9 或 4:3。4:3 的宽高比是从黑白电视而来，而 16:9 的宽高比是从显示器而来。现在一般情况下都采用 16:9 的比例。
- **麦克风**：用于采集音频数据。它与视频一样，可以指定一秒内采样的次数，称为采样率。每个采样用几个 bit 表示，称为采样位深或采样大小。
- **轨（Track）**：WebRTC 中的“轨”借鉴了多媒体的概念。火车轨道的特性你应该非常清楚，两条轨永远不会相交。“轨”在多媒体中表达的就是每条轨数据都是独立的，不会与其他轨相交，如 MP4 中的音频轨、视频轨，它们在 MP4 文件中是被分别存储的。
- **流（Stream）**：可以理解为容器。在 WebRTC 中，“流”可以分为媒体流（MediaStream）和数据流（DataStream）。其中，媒体流可以存放 0 个或多个音频轨或视频轨；数据流可以存 0 个或多个数据轨。

## 音视频采集

### 1. getUserMedia 方法

在浏览器中访问音视频设备非常简单，只要调用 getUserMedia 这个 API 即可。该 API 的基本格式如下：

```javascript
// 参数对于音视频的描述
const constraints = {
    video: {
        frameRate: {min: 20},  //视频的帧率最小 20 帧每秒
        width: {min: 640, ideal: 1280}, //最小宽度640，理想宽度1280
        height: {min: 360, ideal: 720},//最小高度640，理想高度1280
        aspectRatio: 16/9 //宽高比是 16:9
    },
    audio: {
        echoCancellation: true, //音频开启回音消除
        noiseSuppression: true, // 开启降噪
        autoGainControl: true // 开启自动增益功能
    }
};

let promise = navigator.mediaDevices.getUserMedia(constraints);
```

它返回一个 Promise 对象。

- 如果 getUserMedia 调用成功，则可以通过 Promise 获得 MediaStream 对象，也就是说现在我们已经从音视频设备中获取到音视频数据了。
- 如果调用失败，比如用户拒绝该 API 访问媒体设备（音频设备、视频设备），或者要访问的媒体设备不可用，则返回的 Promise 会得到 PermissionDeniedError 或 NotFoundError 等错误对象。

### 如何使用 getUserMedia API

1.创建html文件

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>Realtime communication with WebRTC</title>
        <link rel="stylesheet", href="css/client.css" />
    </head>
    <body>
        <h1>Realtime communication with WebRTC </h1>
        <video autoplay playsinline></video>
        <script src="js/client.js"></script>
    </body>
</html>
```

```js
 <video autoplay playsinline></video>
```

- autoplay，表示当页面加载时可以自动播放视频；
- playsinline，表示在 HTML5 页面内播放视频，而不是使用系统播放器播放视频

```javascript
const mediaStreamContrains = {
    video: true
};
const localVideo = document.querySelector('video');
function gotLocalMediaStream(mediaStream){
    localVideo.srcObject = mediaStream;
}
function handleLocalMediaStreamError(error){
    console.log('navigator.getUserMedia error: ', error);
}
navigator.mediaDevices.getUserMedia(mediaStreamContrains).then(
    gotLocalMediaStream
).catch(
    handleLocalMediaStreamError
);
```

- JavaScript 代码中首先执行 **getUserMedia()** 方法，该方法会请求访问 Camera。如果是第一次请求 Camera（摄像头），浏览器会向用户弹出提示窗口，让用户决定是否可以访问摄像头。如果用户允许访问，且设备可用，则调用 **gotLocalMediaStream** 方法。

- 在 **gotLocalMediaStream** 方法中，其输入参数为 **MediaStream** 对象，该对象中存放着 **getUserMedia** 方法采集到的音视频轨。我们将它作为视频源赋值给 HTML5 的 video 标签的 srcObject 属性。这样在 HTML 页面加载之后，就可以在该页面中看到摄像头采集到的视频数据了。

### getUserMedia API 控制设备的参数及其含义如下：

| 参数             | 含义                                                         | 备注                                                         |
| ---------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| width            | 视频宽度                                                     |                                                              |
| height           | 视频高度                                                     |                                                              |
| frameRate        | 帧率                                                         |                                                              |
| facingMode       | user：前置摄像头；enviroment：后置摄像头；left：前置左侧摄像头；right：前置右侧摄像头 |                                                              |
| resizeMode       | 是否允许调整图像大小                                         |                                                              |
| volume           | 音量大小                                                     |                                                              |
| sampleRate       | 音频采集率                                                   |                                                              |
| samoleSize       | 音频采集大小                                                 |                                                              |
| echoCancellation | 是否开启回音消除                                             |                                                              |
| noiseSuppression | 是否开启降噪                                                 |                                                              |
| autoGainControl  | 是否开启自动增益                                             |                                                              |
| latency          | 延迟大小                                                     |                                                              |
| channalCount     | 声道数                                                       |                                                              |
| deviceID         | 设备ID                                                       | 指定哪个输入/输出设备                                        |
| groupID          | 设置组ID                                                     | 如果两个设备属于同一个物理设备，则他们具有相同的 groupID。例如具有麦克风功能的耳机。 |