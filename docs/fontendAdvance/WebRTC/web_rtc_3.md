# WebRTC（三）利用浏览器实现拍照功能

### 利用浏览器实现拍照功能

> 在正式讲解如何进行拍照之前，你需要先了解非编码帧（解码帧）和编码帧这两个知识点，这会有利于你对后面拍照实现内容的理解。

## 非编码帧与编码帧

### 1.编码帧

相对于非编码帧，通过编码器（如 H264/H265、VP8/VP9）压缩后的帧称为编码帧。这里我们以 H264 为例，经过 H264 编码的帧包括以下三种类型。

**I 帧**：关键帧。压缩率低，可以单独解码成一幅完整的图像。

**P 帧**：参考帧。压缩率较高，解码时依赖于前面已解码的数据。

**B 帧**：前后参考帧。压缩率最高，解码时不光依赖前面已经解码的帧，而且还依赖它后面的 P 帧。换句话说就是，B 帧后面的 P 帧要优先于它进行解码，然后才能将 B 帧解码。

### 2.非编码帧

我们小时候应该都学过，在几张空白的纸上画同一个物体，并让物体之间稍有一些变化，然后连续快速地翻动这几张纸，它就形成了一个小动画。

音视频播放器就是利用这样的原理来播放音视频文件的。当你要播放某个视频文件时，播放器会按照一定的时间间隔连续地播放从音视频文件中解码后的视频帧，这样视频就动起来了。同理，播放从摄像头获取的视频帧也是如此，只不过从摄像头获取的本来就是非编码视频帧，所以就不需要解码了。

> 通过上面的描述，你应该能得到以下两点信息：

1. 播放的视频帧之间的时间间隔是非常小的。如按每秒钟 20 帧的帧率计算，每帧之间的间隔是 50ms。
2. 播放器播的是非编码帧（解码后的帧），这些非编码帧就是一幅幅独立的图像。

> 从摄像头里采集的帧或通过解码器解码后的帧都是非编码帧。非编码帧的格式一般是 YUV 格式或是 RGB 格式。

### 关于视频格式

当实物光通过镜头进行到摄像机后，它通过视频设备的模数转换（A/D）模块，即光学传感器， 将光转换成数字信号，即 `RGB（Red、Green、Blue）`数据。

获得 RGB 数据后，还要通过 DSP（Digital Signal Processer）进行优化处理，如自动增强、白平衡、色彩饱和等都属于这一阶段要做的事情。

通过 DSP 优化处理后，你就得到了 24 位的真彩色图片。因为每一种颜色由 8 位组成，而一个像素由 RGB 三种颜色构成，所以一个像素就需要用 24 位表示，故称之为 24 位真彩色。

另外，此时获得的 RGB 图像只是临时数据。因最终的图像数据还要进行压缩、传输，而编码器一般使用的输入格式为` YUV I420`，所以在摄像头内部还有一个专门的模块用于将 `RGB` 图像转为 `YUV` 格式的图像。

那什么是 `YUV` 呢？YUV 也是一种色彩编码方法，主要用于电视系统以及模拟视频领域。它将`亮度信息（Y）`与`色彩信息（UV）`分离，即使没有 UV 信息一样可以显示完整的图像，只不过是黑白的，这样的设计很好地解决了彩色电视机与黑白电视的兼容问题。

## 实现拍照功能

1.创建html部分

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Realtime communication with WebRTC</title>
        <link rel="stylesheet", href="css/client.css" />
        <style>
            .none {
                 -webkit-filter: none;
            }
            .blur {
                 -webkit-filter: blur(3px);
            }
            .grayscale {
                 -webkit-filter: grayscale(1);
            }
            .invert {
                 -webkit-filter: invert(1);
            }
            .sepia {
                 -webkit-filter: sepia(1);
            }
       </style>
    </head>
    <body>
        <select id="filter">
            <option value="none">None</option>
            <option value="blur">blur</option>
            <option value="grayscale">Grayscale</option>
            <option value="invert">Invert</option>
            <option value="sepia">sepia</option>
        </select>
        <button id="TakePhoto">Take</button>
        <button id="save">save</button>
        <canvas id="picture"></canvas>
        <video autoplay playsinline></video>
        <script src="js/client1.js"></script>
    </body>
</html>
```

2.js部分

```javascript
//获取HTML页面中的video标签  
var videoplay = document.querySelector('video');
//播放视频流
function gotMediaStream(stream){
        videoplay.srcObject = stream;
}
function handleError(err){
        console.log('getUserMedia error:', err);
}
//对采集的数据做一些限制
var constraints = {
                        video : {
                                width: 1280,
                                height: 720,
                                frameRate:15,
                        },
                        audio : false
                   }
//采集音视频数据流
navigator.mediaDevices.getUserMedia(constraints)
                        .then(gotMediaStream)
                        .catch(handleError);




// picture.drawImage(image, dx, dy, dWidth, dHeight);

function downLoad(url){
    var oA = document.createElement("a");
    oA.download = 'photo';// 设置下载的文件名，默认是'下载'
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
}
let filtersSelect = document.querySelector("select#filter")
// 拍照功能
document.querySelector("button#TakePhoto").onclick = function (){
        var filterMap = {
                blur: "blur(3px)",
                grayscale: "grayscale(1)",
                invert: "invert(1)",
                sepia: "sepia(1)",
                none: "none"
              };
 var picture = document.querySelector('canvas#picture');
 var ctx  = picture.getContext('2d')
  picture.width = 640;
  picture.height = 480;
  ctx.filter = filterMap[filtersSelect.value]; //给保存的图片添加滤镜
  ctx.drawImage(videoplay, 0, 0, picture.width, picture.height);
}
// 下载功能
document.querySelector("button#save").onclick = function (){
var canvas = document.querySelector('canvas#picture');
    downLoad(canvas.toDataURL("image/jpeg"));
}
```

### 拍照功能

在上面的 JavaScript 代码中，首先获得 HTML 中的 Canvas 标签，并设置了 Canvas 的宽高； 然后调用 Canvas 上下文的 `drawImage` 方法，这样就可以从视频流中抓取当时正在显示的图片了。

- **image**：可以是一幅图片，或 HTMLVideoElement。
- **dx, dy**：图片起点的 x、y 坐标。
- **dWidth**：图片的宽度。
- **dHeight**：图片的高度。

### 保存照片

> 在上面的代码中，当用户点击保存按钮时，会调用一个匿名函数。该函数的逻辑如下：

- 首先，通过 Canvas 的 toDataURL 方法获得图片的 URL 地址；
- 然后，将该 URL 地址当作参数传给 downLoad 函数；
- 最后，downLoad 函数做的事儿比较简单，就是创建一个 a 标签，当用户点击时就将图片下载下来。

通过上面的代码，你就可以通过浏览器为自己拍照，并同时将拍下来的照片保存到文件系统中了。

### 滤镜实现

> 在浏览器中对于图片的滤镜处理是通过 CSS 来控制的。像前面一样，首先在 HTML 中增加 CSS 的滤镜代码如下：

```css
<style>

.none {

-webkit-filter: none;

}

.blur {

-webkit-filter: blur(3px);

}

.grayscale {

-webkit-filter: grayscale(1);

}

.invert {

-webkit-filter: invert(1);

}

.sepia {

-webkit-filter: sepia(1);

}

</style>
```

- blur：模糊度
- grayscale：灰度（黑白）
- invert：反转
- sepia：深褐色

> 滤镜实现关键:

```javascript
// 这个不用写
// picture.className = filtersSelect.value; // 该方法给照片添加滤镜但是下载下来没有
ctx.filter = filterMap[filtersSelect.value]; //给下载的图片添加滤镜
```

