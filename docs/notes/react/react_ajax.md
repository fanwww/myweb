# Ⅲ-React ajax

> 此部分需要预备技术栈:ajax、Axios,相关笔记已经记录在隔壁文件夹且学习完成

### 1、React中配置代理(`proxy`)

>1. `简单代理`:在package.json中追加如下配置 :`"proxy":http://localhost:5000`
>   - ps:当你请求`http://localhost:5000`产生跨域(本身在3000端口)时,添加此代码, 之后你请求时用`http://localhost:3000`进行请求,当其在`3000`端口中找不到资源时将会自动转发至`5000`端口进行请求,不产生跨域问题
>   - 优点：配置简单，前端请求资源时可以不加任何前缀。
>   - 缺点：不能配置多个代理
>   - 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）
>2. 方法二: 在src下创建配置文件：`src/setupProxy.js`
>   - ps:必须是这个文件名,react项目运行的时候会自动查找这个文件,并将其加入webpack的配置中,所以当你修改此文件后,你需要重新启动项目
>   - 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
>   - 缺点：配置繁琐，前端请求资源时必须加前缀。
>
>```js
>//代码示例
>const proxy = require('http-proxy-middleware')
> module.exports = function(app) {
>   app.use(
>     proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
>       target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
>       changeOrigin: true, //控制服务器接收到的请求头中host字段的值
>       /*
>       	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
>       	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
>       	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
>       */
>       pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
>     }),
>     proxy('/api2', { 
>       target: 'http://localhost:5001',
>       changeOrigin: true,
>       pathRewrite: {'^/api2': ''}
>     })
>   )
>}
>```

### 2、补充知识点

#### Ⅰ-ES6小知识点:`连续赋值解构`+重命名

>```js
>let obj = {a:{b:1}}
>const {a} = obj; //传统解构赋值
>const {a:{b}} = obj; //连续解构赋值
>const {a:{b:value}} = obj; //连续解构赋值+重命名
>```

#### Ⅱ-消息订阅与发布机制 --->  工具库: PubSubJS

> 1.先订阅，再发布（理解：有一种隔空对话的感觉）
>
> 2.适用于任意组件间通信
>
> 3.要在组件的componentWillUnmount中取消订阅
>
> ```js
> //下载: npm install pubsub-js --save
> //使用举例
> 1)	import PubSub from 'pubsub-js' //引入
> 2)	PubSub.subscribe('delete', function(data){ }); //订阅
> 3)	PubSub.publish('delete', data) //发布消息
> //*------------------------------使用----------------------------------------------------
> 	componentDidMount(){
> 		this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
> 			this.setState(stateObj)
> 		})
> 	}
> 
> 	componentWillUnmount(){
> 		PubSub.unsubscribe(this.token)
> 	}
> //----------------------------------使用---------------------------------------------------
> 		//发送请求前通知List更新状态
> 		PubSub.publish('atguigu',{isFirst:false,isLoading:true})
> 		//发送网络请求---使用fetch发送（优化）
> 		try {
> 			const response= await fetch(`/api1/search/users2?q=${keyWord}`)
> 			const data = await response.json()
> 			console.log(data);
> 			PubSub.publish('atguigu',{isLoading:false,users:data.items})
> 		} catch (error) {
> 			console.log('请求出错',error);
> 			PubSub.publish('atguigu',{isLoading:false,err:error.message})
> 		}
> 	}
> ```

#### Ⅲ-消息订阅与发布机制 --->  工具库: mitt

>这是本人后来在githyb中找到并应用在项目代码中的,此工具库代码量特别少,可以阅读源码,会有很大好处
>
>此方法用的是[`mitt`]实现,其实本质上就是注册一个全局变量进行监听 --> [mitt源码地址](https://github.com/developit/mitt)
>
>可以自己实现,此处因为人家写的不错了,就以此作为例子
>
>1. 安装或者直接复制使用
>
> ```sh
>npm install --save mitt
> ```
>
>2. 使用示例
>
> ```tsx
>//
>-------------- 首先要定义一个公用全局变量  --------------------------
> //文件 utils/index.ts
> import mitt from './mitt';
> //此处声明,将其变为全局变量
> const eventBus = mitt();
> export { eventBus }
> ---------------- 发送值的组件(要修改别人的组件)  ---------------------
> //导入共有变量
> import { eventBus } from '~/utils';
>   <a
>   onClick={() => {
> 	//延迟发送是本人此之前有一个跳转动作,跳转到接收方组件
>     // 防止修改了值的时候但是接收组件未注册  正常情况直接发送即可     
>     //setTimeout(() => {
>     // eventBus.emit('foo', data);
>     //}, 100);
>     eventBus.emit('foo', data);    
>    }}
>   />;
>
> ------------------ 接受方组件(接受发送方的组件)  -------------------------------------
>
> const Search: FC<IProps> = (props) => {
>   useEffect(() => {
>     //替换为mitt写法,此时已经接收到了
>     eventBus.on('foo', (searchParams) => {console.log('接受到值了',searchParams) }
>     });
>   }, []);
> } 
> ```
>
>3. mitt源码
>
> ```ts
> export type EventType = string | symbol;
>
> // An event handler can take an optional event argument
> // and should not return a value
> export type Handler<T = unknown> = (event: T) => void;
> export type WildcardHandler<T = Record<string, unknown>> = (
>   type: keyof T,
>   event: T[keyof T]
> ) => void;
>
> // An array of all currently registered event handlers for a type
> export type EventHandlerList<T = unknown> = Array<Handler<T>>;
> export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
>   WildcardHandler<T>
> >;
>
> // A map of event types and their corresponding event handlers.
> export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
>   keyof Events | '*',
>   EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
> >;
>
> export interface Emitter<Events extends Record<EventType, unknown>> {
>   all: EventHandlerMap<Events>;
>
>   on: (<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) => void) & ((type: '*', handler: WildcardHandler<Events>) => void);
>
>   off: (<Key extends keyof Events>(
>     type: Key,
>     handler?: Handler<Events[Key]>
>   ) => void) & ((type: '*', handler: WildcardHandler<Events>) => void);
>
>   emit: (<Key extends keyof Events>(type: Key, event: Events[Key]) => void) & (<Key extends keyof Events>(
>     type: undefined extends Events[Key] ? Key : never
>   ) => void);
> }
>
> /**
>  * Mitt: Tiny (~200b) functional event emitter / pubsub.
>  * @name mitt
>  * @returns {Mitt}
>  */
> export default function mitt<Events extends Record<EventType, unknown>>(
>   all?: EventHandlerMap<Events>
> ): Emitter<Events> {
>   type GenericEventHandler =
>     | Handler<Events[keyof Events]>
>     | WildcardHandler<Events>;
>   all = all || new Map();
>
>   return {
>     /**
>      * A Map of event names to registered handler functions.
>      */
>     all,
>
>     /**
>      * Register an event handler for the given type.
>      * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
>      * @param {Function} handler Function to call in response to given event
>      * @memberOf mitt
>      */
>     on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
>       const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
>       if (handlers) {
>         handlers.push(handler);
>       } else {
>         all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
>       }
>     },
>
>     /**
>      * Remove an event handler for the given type.
>      * If `handler` is omitted, all handlers of the given type are removed.
>      * @param {string|symbol} type Type of event to unregister `handler` from, or `'*'`
>      * @param {Function} [handler] Handler function to remove
>      * @memberOf mitt
>      */
>     off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
>       const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
>       if (handlers) {
>         if (handler) {
>           handlers.splice(handlers.indexOf(handler) >>> 0, 1);
>         } else {
>           all!.set(type, []);
>         }
>       }
>     },
>
>     /**
>      * Invoke all handlers for the given type.
>      * If present, `'*'` handlers are invoked after type-matched handlers.
>      *
>      * Note: Manually firing '*' handlers is not supported.
>      *
>      * @param {string|symbol} type The event type to invoke
>      * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
>      * @memberOf mitt
>      */
>     emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
>       let handlers = all!.get(type);
>       if (handlers) {
>         (handlers as EventHandlerList<Events[keyof Events]>)
>           .slice()
>           .map((handler) => {
>             handler(evt!);
>           });
>       }
>
>       handlers = all!.get('*');
>       if (handlers) {
>         (handlers as WildCardEventHandlerList<Events>)
>           .slice()
>           .map((handler) => {
>             handler(type, evt!);
>           });
>       }
>     },
>   };
> }
> ```

#### Ⅳ-defaultChecked 、 checked的区别

>注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value

### 3、`fetch`发送请求

> 概念:`关注分离`的设计思想

>1. Fetch 是浏览器提供的原生 AJAX 接口。
>
>由于原来的XMLHttpRequest`不符合关注分离原则`，且基于事件的模型在处理异步上已经没有现代的Promise等那么有优势。因此Fetch出现来解决这种问题。
>
>2. 特点:
>
>   - fetch: `原生函数`，不再使用XmlHttpRequest对象提交ajax请求
>
>   - `老版本浏览器可能不支持`
>
>   - 使用 fetch 无法`取消一个请求`。这是因为Fetch API`基于 Promise`，而Promise无法做到这一点。由于Fetch是典型的异步场景，所以大部分遇到的问题不是 Fetch 的，其实是 Promise 的。
>
> 3. 如果直接使用`fetch`,返回的并不是直接的结果它只是一个`HTTP响应`，而不是真的数据。想要获取数据,方法有二:
>
>    ① 使用async+await获取
>
>    ② 使用promise的链式调用,再第一个then中将其返回,再下个then中在使用
>
>4. 代码示例
>
>```js
>//代码示例
>----------------------------- 未优化:使用then链式调用 ---------------------------------------------------------
>fetch(`/api1/search/users2?q=${keyWord}`).then(
>			response => {
>				console.log('联系服务器成功了');
>				return response.json()
>			},
>			error => {
>				console.log('联系服务器失败了',error);
>				return new Promise(()=>{})
>			}
>		).then(
>			response => {console.log('获取数据成功了',response);},
>			error => {console.log('获取数据失败了',error);}
>) 
>----------------------------- 优化后:使用async+await ---------------------------------------------------------
>try {
>		const response= await fetch(`/api1/search/users2?q=${keyWord}`)
>		const data = await response.json()
>		console.log(data);
>		} catch (error) {
>		onsole.log('请求出错',error);
>		}
>}
>```
