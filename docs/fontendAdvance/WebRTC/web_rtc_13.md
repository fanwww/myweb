# WebRTC（十三）一对一音视频通话

## 获取媒体信息

```js
function start(){
	if (!navigator.mediaDevices||
		!navigator.mediaDevices.getUserMedia) {
		console.error('the getUserMedia is not supported!');
		return;
	} else {
	
		var constraints={
			video:true,
			audio:true
		}
		navigator.mediaDevices.getUserMedia(constraints)
				 .then(getMediaStream)
				 .catch(handleError)
	}
}
```

## 本地媒体流显示到localVideo

```js
function getMediaStream(stream){ 
localVideo.srcObject=stream; 
localStream=stream;
}
```

## 创建媒体协商

```js
function call(){
	pc1 = new RTCPeerConnection();
	pc2 = new RTCPeerConnection();
	pc1.onicecandidate=(e)=>{
		pc2.addIceCandidate(e.candidate);
	}
	pc2.onicecandidate=(e)=>{
		pc1.addIceCandidate(e.candidate);
	}
	
	pc2.ontrack=getRemoteStream;
	
	localStream.getTracks().forEach((track)=>{
		pc1.addTrack(track,localStream);
	});
	
	var offerOptions={
		offerToRecieveAudio:1,
		offerToRecieveVideo:1
	}

	pc1.createOffer(offerOptions)
	   .then(getOffer)
	   .catch(handleOfferError);
}

//本地媒体流显示到remoteVideo
function getRemoteStream(e){
	remoteVideo.srcObject = e.streams[0];
}
```

## 将sdp写入本地1和本地2并创建访问

```js
function getOffer(desc){
	pc1.setLocalDescription(desc);
	
	pc2.setRemoteDescription(desc);
	pc2.createAnswer()
	   .then(getAnswer)
	   .catch(handleAnswerError);
}
```

## 将sdp写入本地1和本地2并创建回答

```js
function getAnswer(desc){
	pc2.setLocalDescription(desc);
	pc1.setRemoteDescription(desc);
	
}
```

## 挂断

```js
function hangup(){
    pc1.close();
    pc2.close();
    pc1 = null;
    pc2 = null;
  }
```