# WebRTC（五）桌面抓取

### 使用getDisplayMedia抓取桌面

## 共享桌面的基本原理

- **对于共享者**，每秒钟抓取多次屏幕（可以是 3 次、5 次等），每次抓取的屏幕都与上一次抓取的屏幕做比较，取它们的差值，然后对差值进行压缩；如果是第一次抓屏或切幕的情况，即本次抓取的屏幕与上一次抓取屏幕的变化率超过 80% 时，就做全屏的帧内压缩，其过程与 JPEG 图像压缩类似（有兴趣的可以自行学习）。最后再将压缩后的数据通过传输模块传送到观看端；数据到达观看端后，再进行解码，这样即可还原出整幅图片并显示出来。
- **对于远程控制端**，当用户通过鼠标点击共享桌面的某个位置时，会首先计算出鼠标实际点击的位置，然后将其作为参数，通过信令发送给共享端。共享端收到信令后，会模拟本地鼠标，即调用相关的 API，完成最终的操作。一般情况下，当操作完成后，共享端桌面也发生了一些变化，此时就又回到上面共享者的流程了，我就不再赘述了。

通过上面的描述，可以总结出共享桌面的处理过程为：**抓屏**、**压缩编码**、**传输**、**解码**、**显示**、**控制**这几步，你应该可以看出它与音视频的处理过程几乎是一模一样的。

> 远程桌面协议一般分为桌面数据处理与信令控制两部分:

- **桌面数据**：包括了桌面的抓取 (采集)、编码（压缩）、传输、解码和渲染。
- **信令控制**：包括键盘事件、鼠标事件以及接收到这些事件消息后的相关处理等。

## 如何共享桌面

```javascript
//得到桌面数据流

function getDeskStream(stream){

localStream = stream;

}

//抓取桌面

function shareDesktop(){

//只有在 PC 下才能抓取桌面

if(IsPC()){

//开始捕获桌面数据

navigator.mediaDevices.getDisplayMedia({video: true})

.then(getDeskStream)

.catch(handleError);

return true;

}

return false;

}
```

> 通过上面的方法，就可以获得桌面数据了，让我们来看一下效果图吧

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3839239cfeeb4fa8b9d9ffb145595c61~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 桌面的展示

首先，在 HTML 中增加下面的代码，其中标签用于播放抓取的桌面内容：

```html
    <video autoplay playsinline id="deskVideo"></video>
```

下面的 JavaScript 则将桌面内容与标签联接到一起：

```javascript
var deskVideo = document.querySelect("video/deskVideo");

function getDeskStream(stream){

localStream = stream;

deskVideo.srcObject = stream;
}
```

在 JavaScript 中调用 getDisplayMedia 方法抓取桌面数据，当桌面数据被抓到之后，会触发 getDeskStream 函数。我们再在该函数中将获取到的 stream 与 video 标签联系起来，这样当数据获取到时就从播放器里显示出来了。

## 录制桌面

html部分添加

```html
    <button id="record">Start Record</button>
```

js关联部分

```javascript
var buffer;

function handleDataAvailable(e){

if(e && e.data && e.data.size > 0){

buffer.push(e.data);

}

}

function startRecord(){

//定义一个数组，用于缓存桌面数据，最终将数据存储到文件中

buffer = [];

var options = {

mimeType: 'video/webm;codecs=vp8'

}

if(!MediaRecorder.isTypeSupported(options.mimeType)){

console.error(`${options.mimeType} is not supported!`);

return;

}

try{

//创建录制对象，用于将桌面数据录制下来

mediaRecorder = new MediaRecorder(localStream, options);

}catch(e){

console.error('Failed to create MediaRecorder:', e);

return;

}

//当捕获到桌面数据后，该事件触发

mediaRecorder.ondataavailable = handleDataAvailable;

mediaRecorder.start(10);

}
```

当用户点击 **Record** 按钮的时候，就会调用 **startRecord** 函数。在该函数中首先判断浏览器是否支持指定的多媒体格式，如 webm。 如果支持的话，再创建 MediaRecorder 对象，将桌面流录制成指定的媒体格式文件。

当从 localStream 获取到数据后，会触发 ondataavailable 事件。也就是会调用 handleDataAvailable 方法，最终将数据存放到 Blob 中。