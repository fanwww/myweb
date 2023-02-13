# WebRTC（十二）统计信息

# 统计信息

## 1. 引入第三方库

```html
html>

...

<body>

...

<script src="js/client.js"></script>

//引入第三方库 graph.js

<script src="js/third_party/graph.js"></script>

...

</body>

</html>
```

## client.js 代码的实现

```javascript
// 图标绘制
//定义绘制比特率图形相关的变量
var bitrateGraph;
var bitrateSeries;

var lastResult;

var packetGraph;
var packetSeries;

//bitrateSeries用于绘制点
bitrateSeries = new TimelineDataSeries();
//bitrateGraph用于将bitrateSeries绘制的点展示出来
bitrateGraph = new TimelineGraphView('bitrateGraph', 'bitrateCanvas');
bitrateGraph.updateEndDate(); //绘制时间轴
//与上面一样，只不是用于绘制包相关的图
packetSeries = new TimelineDataSeries();
packetGraph = new TimelineGraphView('packetGraph', 'packetCanvas');
packetGraph.updateEndDate();

console.log(packetSeries,'packetSeries');

window.setInterval(() => {
  if (!pc) { //如果 pc 没有创建直接返回
    return;
  }
  //从 pc 中获取发送者对象
  const sender = pc.getSenders()[0];
  if (!sender) {
    return;
  }
  sender.getStats().then(res => { //获取到所有的 Report
    res.forEach(report => { //遍历每个 Report
      let bytes;
      let packets;
      //我们只对 outbound-rtp 型的 Report 做处理
      if (report.type === 'outbound-rtp') { 
        if (report.isRemote) { //只对本地的做处理
          return;
        }
        const now = report.timestamp;
        bytes = report.bytesSent; //获取到发送的字节
        packets = report.packetsSent; //获取到发送的包数
        //因为计算的是每秒与上一秒的数据的对比，所以这里要做个判断
        //如果是第一次就不进行绘制
        if (lastResult && lastResult.has(report.id)) {
          
          //计算这一秒与上一秒之间发送数据的差值
          var mybytes= (bytes - lastResult.get(report.id).bytesSent);
          //计算走过的时间，因为定时器是秒级的，而时间戳是豪秒级的
          var mytime = (now - lastResult.get(report.id).timestamp);
          const bitrate = 8 * mybytes / mytime * 1000; //将数据转成比特位
          //绘制点
          bitrateSeries.addPoint(now, bitrate);
          //将会制的数据显示出来
          bitrateGraph.setDataSeries([bitrateSeries]);
          bitrateGraph.updateEndDate();//更新时间
          //下面是与包相关的绘制
          packetSeries.addPoint(now, packets -
                               lastResult.get(report.id).packetsSent);
          packetGraph.setDataSeries([packetSeries]);
          packetGraph.updateEndDate();
        }
      }
    });
    //记录上一次的报告
    lastResult = res;
  });
}, 1000); //每秒钟触发一次
```

在该代码中，最重要的是 32～89 行的代码，因为这其中实现了一个定时器——每秒钟执行一次。每次定时器被触发时，都会调用 sender 的 getStats 方法获取与传输相关的统计信息。

然后对获取到的 RTCStats 类型做判断，只取 RTCStats 类型为 outbound-rtp 的统计信息。最后将本次统计信息的数据与上一次信息的数据做差值，从而得到它们之间的增量，并将增量绘制出来。

## 谷歌统计分析功能

> chrome://webrtc-internals/

可以直接打开这个链接来查看统计分析的状态。