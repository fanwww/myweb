# WebRTC（六）你不知道SDP！

# SDP 是什么

**SDP**（Session Description Protocal）说直白点就是用文本描述的**各端**（PC 端、Mac 端、Android 端、iOS 端等）的**能力**。这里的能力指的是各端所支持的音频编解码器是什么，这些编解码器设定的参数是什么，使用的传输协议是什么，以及包括的音视频媒体是什么等等。

```javascript
v=0

o=- 3409821183230872764 2 IN IP4 127.0.0.1

...

m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126

...

a=rtpmap:111 opus/48000/2

a=rtpmap:103 ISAC/16000

a=rtpmap:104 ISAC/32000
```

> 如上面的 **SDP** 片段所示，该 SDP 中描述了一路音频流，即**m=audio**，该音频支持的 Payload ( 即数据负载 ) 类型包括 111、103、104 等等。 在该 SDP 片段中又进一步对 111、103、104 等 Payload 类型做了更详细的描述，如 **a=rtpmap:111 opus/48000/2**表示 **Payload** 类型为 **111** 的数据是 **OPUS** 编码的音频数据，并且它的采样率是 48000，使用双声道。以此类推，你也就可以知道** a=rtpmap:104 ISAC/32000** 的含义是音频数据使用 **ISAC** 编码，采样频率是 **32000**，使用单声道。

## 交换 SDP 信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a901b60dc6948c3afbc2f925b53c71e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 如上图所示，两个客户端 / 浏览器进行 1 对 1 通话时，首先要进行信令交互，而交互的一个重要信息就是 SDP 的交换。

## 标准 SDP 规范

主要包括 **SDP 描述格式**和 **SDP 结构**，而 SDP 结构由**会话描述**和**媒体信息**描述两个部分组成。

> 其中，媒体信息描述是整个 SDP 规范中最重要的知识，它又包括了：

- 媒体类型
- 媒体格式
- 传输协议
- 传输的 IP 和端口

### 1. SDP 的格式

SDP 是由多个 type=value 这样的表达式组成的。其中，type是一个字符，value是一个字符串。需要特别注意的是，“=” 两边是不能有空格的。如下所示：

```javascript
v=0

o=- 7017624586836067756 2 IN IP4 127.0.0.1

s=-

t=0 0
```

SDP 由一个**会话级描述**（session level description）和**多个媒体级描述**（media level description）组成。

- **会话级**（session level）的作用域是整个会话，其位置是从 v= 行开始到第一个媒体描述为止。
- **媒体级**（media level）是对单个的媒体流进行描述，其位置是从 m= 行开始到下一个媒体描述（即下一个 m=）为止。

### 2. SDP 的结构

了解了 SDP 的格式，下面我们来看一下 SDP 的结构，它由会话描述和媒体描述两部分组成。

#### （1）会话描述

会话描述的字段比较多，下面四个字段比较重要，我们来重点介绍一下。

- **第一个**，v=（protocol version，必选）。例子：v=0 ，表示 SDP 的版本号，但不包括次版本号。
- **第二个**，o=（owner/creator and session identifier，必选）。例子：o=`username`, `session id`, `version`, `network type`, `address type`, `address`，该例子是对一个会话发起者的描述。其中， o= 表示的是对会话发起者的描述；

1. `username`：用户名，当不关心用户名时，可以用 “－” 代替 ；
2. `session id` ：数字串，在整个会话中，必须是唯一的，建议使用 NTP 时间戳；
3. `version`：版本号，每次会话数据修改后，该版本值会递增；
4. `network type` ：网络类型，一般为“IN”，表示“internet”；
5. `address type`：地址类型，一般为 IP4；
6. `address`：IP 地址。

- **第三个**，Session Name（必选）。例子：s=`session name`，该例子表示一个会话，在整个 SDP 中有且只有一个会话，也就是只有一个 s=。
- **第四个**，t=（time the session is active，必选）。例子：t=`start time` `stop time`，该例子描述了会话的开始时间和结束时间。其中， `start time` 和 `stop time` 为 NTP 时间，单位是秒；当`start time`和`stop time`均为零时，表示持久会话。

#### （2）媒体描述

- **第一个**，m=（media name and transport address，可选）。例子：m=media port transport fmt list，表示一个会话。在一个 SDP 中一般会有多个媒体描述。每个媒体描述以“m=”开始到下一个“m=”结束。其中，

1. **media**：媒体类型，比如 audio/video 等；
2. **port**：端口；
3. **transport**：传输协议，有两种——RTP/AVP 和 UDP； fmt list：媒体格式，即数据负载类型 (Payload Type) 列表。

- **第二个**，a=*（zero or more media attribute lines，可选）。例子：a=`TYPE`或 a=`TYPE:VALUES`， 表示属性，用于进一步描述媒体信息；在例子中，指属性的类型， a= 有两个特别的属性类型，即下面要介绍的 `rtpmap` 和 `fmtp`。
- **第三个**，rtpmap（可选）。例子：a=`rtpmap`:`payload` `type` `encoding` `name`/`clock rate`[/`encodingparameters`]。 rtpmap 是 rtp 与 map 的结合，即 RTP 参数映射表。

1. `payload type` ：负载类型，对应 RTP 包中的音视频数据负载类型。
2. `encoding name`：编码器名称，如 VP8、VP9、OPUS 等。
3. `sample rate`：采样率，如音频的采样率频率 32000、48000 等。
4. `encodingparameters`：编码参数，如音频是否是双声道，默认为单声道。

- **第四个**，**fmtp**。例子：a=fmtp:`payload type` `format specific parameters`。 **fmtp**，格式参数，即 format parameters； `payload type` ，负载类型，同样对应 RTP 包中的音视频数据负载类型； `format specific parameters`指具体参数。

## WebRTC 中的 SDP

WebRTC 对标准 SDP 规范做了一些调整，它将 SDP 按功能分成几大块：

- **Session Metadata**，会话元数据
- **Network Description**，网络描述
- **Stream Description**，流描述
- **Security Descriptions**，安全描述
- **Qos Grouping Descriptions**， 服务质量描述

```javascript
//=============会话描述====================

v=0

o=- 7017624586836067756 2 IN IP4 127.0.0.1

s=-

t=0 0

...

//================媒体描述=================

//================音频媒体=================

/*

* 音频使用端口1024收发数据

* UDP/TLS/RTP/SAVPF 表示使用 dtls/srtp 协议对数据加密传输

* 111、103 ... 表示本会话音频数据的 Payload Type

*/

m=audio 1024 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126

//==============网络描述==================

//指明接收或者发送音频使用的IP地址，由于WebRTC使用ICE传输，这个被忽略。

c=IN IP4 0.0.0.0

//用来设置rtcp地址和端口，WebRTC不使用

a=rtcp:9 IN IP4 0.0.0.0

...

//==============音频安全描述================

//ICE协商过程中的安全验证信息

a=ice-ufrag:khLS

a=ice-pwd:cxLzteJaJBou3DspNaPsJhlQ

a=fingerprint:sha-256 FA:14:42:3B:C7:97:1B:E8:AE:0C2:71:03:05:05:16:8F:B9:C7:98:E9:60:43:4B:5B:2C:28:EE:5C:8F3:17

...

//==============音频流媒体描述================

a=rtpmap:111 opus/48000/2

//minptime代表最小打包时长是10ms，useinbandfec=1代表使用opus编码内置fec特性

a=fmtp:111 minptime=10;useinbandfec=1

...

a=rtpmap:103 ISAC/16000

a=rtpmap:104 ISAC/32000

a=rtpmap:9 G722/8000

...

//=================视频媒体=================

m=video 9 UDP/TLS/RTP/SAVPF 100 101 107 116 117 96 97 99 98

...

//=================网络描述=================

c=IN IP4 0.0.0.0

a=rtcp:9 IN IP4 0.0.0.0

...

//=================视频安全描述=================

a=ice-ufrag:khLS

a=ice-pwd:cxLzteJaJBou3DspNaPsJhlQ

a=fingerprint:sha-256 FA:14:42:3B:C7:97:1B:E8:AE:0C2:71:03:05:05:16:8F:B9:C7:98:E9:60:43:4B:5B:2C:28:EE:5C:8F3:17

...

//================视频流描述===============

a=mid:video

...

a=rtpmap:100 VP8/90000

//================服务质量描述===============

a=rtcp-fb:100 ccm fir

a=rtcp-fb:100 nack //支持丢包重传，参考rfc4585

a=rtcp-fb:100 nack pli

a=rtcp-fb:100 goog-remb //支持使用rtcp包来控制发送方的码流

a=rtcp-fb:100 transport-cc
```

> 从上面这段 SDP 中你应该可以总结出：SDP 是由一个**会话层**和**多个媒体层**组成的；而对于每个**媒体层**，WebRTC 又将其细划为四部分，即**媒体流、网络描述、安全描述和服务质量描述**。