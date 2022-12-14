# 小程序的生命周期

小程序的生命周期分为: 应用的生命周期、页面的生命周期、组件的生命周期

## 应用的生命周期

##### onLaunch事件

在小程序代码包被注入宿主环境,初始化完毕后触发

##### onHide事件

在点击返回或Home健时,此时小程序进入后台,并没有被关闭,此时触发

##### onShow事件

在再次回到小程序,即后代的小程序从后台被唤醒时触发

##### onError事件

在代码运行出错时触发该事件

> 注意:
>
> 1.我们可以看到，App的生命周期是由微信客户端根据用户操作主动触发的。为了避免程序上的混乱，我们不应该从其他代码里主动调用App实例的生命周期函数。
>
> 2.在微信客户端中打开小程序有很多途径：从群聊会话里打开，从小程序列表中打开，通过微信扫一扫二维码打开，从另外一个小程序打开当前小程序等，针对不同途径的打开方式，小程序有时需要做不同的业务处理，所以微信客户端会把打开方式带给onLaunch和onShow的调用参数options
>
> 3.onLaunch, onShow 方法会返回一个参数对象， 里面包含了三个参数 ， path,query和scene ，path是打开小程序的路径,query是打开小程序页面url的参数，scene是打开小程序的场景值

## 页面的生命周期

##### onLoad事件

页面初次加载的时候,Page构造器参数所定义的onLoad方法会被调用

##### onReady事件

页面初次渲染之后触发

##### onHide事件

离开当前页面时触发

##### onUnload事件

当前页面从页面栈中被销毁时触发

> 注意:
>
> 1.onLoad在页面没被销毁之前只会触发1次，在onLoad的回调中，可以获取当前页面所调用的打开参数option。
> 页面显示之后，Page构造器参数所定义的onShow方法会被调用，一般从别的页面返回到当前页面时，当前页的onShow方法都会被调用。

## 组件的生命周期

##### created事件(与vue不同,此处不能进行数据操作)

在组件实例刚刚被创建时执行

##### attached事件(此处可以进行数据操作)

在组件实例进入页面节点树时执行

##### ready事件

在组件在视图层布局完成后执行

##### moved事件

在组件实例被移动到节点树另一个位置时执行

##### detached事件

在组件实例被从页面节点树移除时执行

##### error事件

每当组件方法抛出错误时执行

#### 组件所在页面的生命周期

##### show事件

组件所在的页面被展示时执行

##### hide事件

组件所在的页面被隐藏时执行

##### resize事件

组件所在的页面尺寸变化时执行

> 注意:
>
> 在 behaviors 中也可以编写生命周期方法(建议使用此方法)，同时不会与其他 behaviors 中的同名生命周期相互覆盖。但要注意，如果一个组件多次直接或间接引用同一个 behavior ，这个 behavior 中的生命周期函数在一个执行时机内只会执行一次。