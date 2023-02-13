# WebRTC（二）获取音视频设备列表

## 获取音视频设备列表

- `MediaDevices`，该接口提供了访问（连接到计算机上的）媒体设备（如摄像头、麦克风）以及截取屏幕的方法。实际上，它允许你访问任何硬件媒体设备。而咱们要获取可用的音视频设备列表，就是通过该接口中的方法来实现的。

> 通过调用 MediaDevices 的 `enumerateDevices` 方法就可以获取到媒体输入和输出设备列表

## 使用方法

```javascript
//判断浏览器是否支持这些 API

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {

console.log("enumerateDevices() not supported.");

return;

}

// 枚举 cameras and microphones.

navigator.mediaDevices.enumerateDevices()

.then(function(deviceInfos) {

//打印出每一个设备的信息

deviceInfos.forEach(function(deviceInfo) {

console.log(deviceInfo.kind + ": " + deviceInfo.label +

" id = " + deviceInfo.deviceId);

});

})

.catch(function(err) {

console.log(err.name + ": " + err.message);

});
```

1. 首先，判断浏览器是否支持 MediaDevice 接口（老版本浏览器可能不支持）。
2. 如果支持，则调用navigator.mediaDevices.enumerateDevices()方法获取音视频设备列表，该方法会返回一个 Promise 对象。
3. 如果返回 Promise 对象成功，则执行 then 中的函数。而 then 分支中的函数非常简单，它遍历每一个 MediaDeviceInfo，并将每个 MediaDeviceInfo 中的基本信息打印出来，也就是我们想要的每个音视频设备的基本信息。
4. 但如果失败的话，则执行 catch 中的函数。

## 设备信息中每个字段的含义：

- **deviceID**，设备的唯一标识；
- **label**，设备名称；
- **kind**，设备种类，可用于识别出是音频设备还是视频设备，是输入设备还是输出设备。