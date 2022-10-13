# websocket

#### 属性和方法

和使用`XMLHttpRequest`对象一样，我们首先要实例化一个`WebSocket`对象：

```js
var ws = new WebSocket(url)
```

url 为响应WebSocket请求的地址，根据后台开启的服务来写。

同样类似AJAX的是，`WebSocket`对象也有一个`readyState`属性，用来表示对象实例当前所处的链接状态，有四个值：

- **0**：表示正在连接中（CONNECTING）；
- **1**：表示连接成功，可以通信（OPEN）；
- **2**：表示连接正在关闭（CLOSING）；
- **3**：表示连接已经关闭或打开连接失败（CLOSED）；

我们可以通过判断这个值来执行我们相应的代码。

除此之外，`WebSocket`对象还提供给我们一系列事件属性，使我们控制连接过程中的通信行为：

- `onopen`：用于指定连接成功后的回调函数；
- `onclose`：用于指定连接关闭后的回调函数；
- `onmessage`：用于指定收到服务器数据后的回调函数，通过`形参.data`获取到返回的数据 ；
- `onerror`：用于指定报错时的回调函数；

通过`.send()`方法，我们拥有了向服务器发送数据的能力。