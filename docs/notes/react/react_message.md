# Ⅸ-组件间通信示例

## 1、兄弟间传值方式1 --> [子传父、父传子]

>1. 父组件定义一个[`状态`]或[`方法`],其中[方法]能修改[状态]
>
>  - 将[方法]传给要进行发送值的子组件,通过继承到的[方法],去修改父组件的[状态]
>  - 将[状态]传给要接受值的子组件,这样就能做到兄弟间传值
>
>2. 代码示例
>
>  ```jsx
>----------父组件------------------------
>class Main extends React.Component<IProps> {
>  constructor(props) {
>    super(props);
>    this.state = { searchParams: {} };
>  }
>  handleIPSearch = (params) => {
>    this.setState({ searchParams: params });
>  };
>  render() {
>    <子组件1:要对组件2进行修改的 handleIPSearch={handleIPSearch}  />
>    <子组件2:要接受值的    searchParams={this.state.searchParams}/>
>  }
>}
>--------------子组件1----------------------
>const ManageTable = (props: IProps) => {
> const {  handleIPSearch } = props;
> return(
>     //此处即可调用修改父组件状态的函数
>    <a onClick={() => {   handleIPSearch(data) }} >
>    对父组件值进行修改,间接改变组件2接收到的值
>  </a>)
>}
>--------------子组件2----------------------
>const IPInfo: FC = (props) => {
>    //此处就能使用父组件的状态
>  const { searchParams } = props;
>    return( <span>searchParams</span> )    
>}
>  ```



## 2、兄弟间传值方式2 -->[mitt(发布订阅者模式)]

>此方法用的是[`mitt`]实现,其实本质上就是注册一个全局变量进行监听 --> [mitt源码地址](https://github.com/developit/mitt)
>
>可以自己实现,此处因为人家写的不错了,就以此作为例子
>
>1. 安装或者直接复制使用
>
>  ```sh
>npm install --save mitt
>  ```
>
>2. 使用示例
>
>  ```tsx
>  -------------- 首先要定义一个公用全局变量  --------------------------
>  //文件 utils/index.ts
>  import mitt from './mitt';
>  //此处声明,将其变为全局变量
>  const eventBus = mitt();
>  export { eventBus }
>  ---------------- 发送值的组件(要修改别人的组件)  ---------------------
>  //导入共有变量
>  import { eventBus } from '~/utils';
>    <a
>    onClick={() => {
>  	//延迟发送是本人此之前有一个跳转动作,跳转到接收方组件
>      // 防止修改了值的时候但是接收组件未注册  正常情况直接发送即可     
>      //setTimeout(() => {
>      // eventBus.emit('foo', data);
>      //}, 100);
>      eventBus.emit('foo', data);    
>     }}
>    />;
>
>  ------------------ 接受方组件(接受发送方的组件)  -------------------------------------
>
>  const Search: FC<IProps> = (props) => {
>    useEffect(() => {
>      //替换为mitt写法,此时已经接收到了
>      eventBus.on('foo', (searchParams) => {console.log('接受到值了',searchParams) }
>      });
>    }, []);
>  } 
>  ```
>
>3. mitt源码
>
>  ```ts
>  export type EventType = string | symbol;
>
>  // An event handler can take an optional event argument
>  // and should not return a value
>  export type Handler<T = unknown> = (event: T) => void;
>  export type WildcardHandler<T = Record<string, unknown>> = (
>    type: keyof T,
>    event: T[keyof T]
>  ) => void;
>
>  // An array of all currently registered event handlers for a type
>  export type EventHandlerList<T = unknown> = Array<Handler<T>>;
>  export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
>    WildcardHandler<T>
>  >;
>
>  // A map of event types and their corresponding event handlers.
>  export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
>    keyof Events | '*',
>    EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>  >;
>
>  export interface Emitter<Events extends Record<EventType, unknown>> {
>    all: EventHandlerMap<Events>;
>
>    on: (<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) => void) & ((type: '*', handler: WildcardHandler<Events>) => void);
>
>    off: (<Key extends keyof Events>(
>      type: Key,
>      handler?: Handler<Events[Key]>
>    ) => void) & ((type: '*', handler: WildcardHandler<Events>) => void);
>
>    emit: (<Key extends keyof Events>(type: Key, event: Events[Key]) => void) & (<Key extends keyof Events>(
>      type: undefined extends Events[Key] ? Key : never
>    ) => void);
>  }
>
>  /**
>   * Mitt: Tiny (~200b) functional event emitter / pubsub.
>   * @name mitt
>   * @returns {Mitt}
>   */
>  export default function mitt<Events extends Record<EventType, unknown>>(
>    all?: EventHandlerMap<Events>
>  ): Emitter<Events> {
>    type GenericEventHandler =
>      | Handler<Events[keyof Events]>
>      | WildcardHandler<Events>;
>    all = all || new Map();
>
>    return {
>      /**
>       * A Map of event names to registered handler functions.
>       */
>      all,
>
>      /**
>       * Register an event handler for the given type.
>       * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
>       * @param {Function} handler Function to call in response to given event
>       * @memberOf mitt
>       */
>      on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
>        const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
>        if (handlers) {
>          handlers.push(handler);
>        } else {
>          all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
>        }
>      },
>
>      /**
>       * Remove an event handler for the given type.
>       * If `handler` is omitted, all handlers of the given type are removed.
>       * @param {string|symbol} type Type of event to unregister `handler` from, or `'*'`
>       * @param {Function} [handler] Handler function to remove
>       * @memberOf mitt
>       */
>      off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
>        const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
>        if (handlers) {
>          if (handler) {
>            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
>          } else {
>            all!.set(type, []);
>          }
>        }
>      },
>
>      /**
>       * Invoke all handlers for the given type.
>       * If present, `'*'` handlers are invoked after type-matched handlers.
>       *
>       * Note: Manually firing '*' handlers is not supported.
>       *
>       * @param {string|symbol} type The event type to invoke
>       * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
>       * @memberOf mitt
>       */
>      emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
>        let handlers = all!.get(type);
>        if (handlers) {
>          (handlers as EventHandlerList<Events[keyof Events]>)
>            .slice()
>            .map((handler) => {
>              handler(evt!);
>            });
>        }
>
>        handlers = all!.get('*');
>        if (handlers) {
>          (handlers as WildCardEventHandlerList<Events>)
>            .slice()
>            .map((handler) => {
>              handler(type, evt!);
>            });
>        }
>      },
>    };
>  }
>  ```

## 3、父组件调用子组件方法

### ①  场景描述

> 当本人要封装一个关于绑定手机号的组件并应用于项目中, 但是到整体表单校验时 (我需要知道手机号列是否进行了修改),以此来判断是否发送修改请求
>
> 因为 [手机列] 的相关校验写在封装的方法中,在父组件需要调用一次其校验方式,得到其校验结果 
>
> <img src="C:/Users/王超凡/Desktop/新建文件夹 (2)/hongs-study-notes/编程_前端开发学习笔记/React笔记/images/image-20210820184059775.png" alt="image-20210820184059775" style="zoom:80%;" />   

### ② 使用hooks的-- [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)，[useRef](https://reactjs.org/docs/hooks-reference.html#useref)

>```jsx
>//父组件代码
>import React, { FC, useEffect, useRef } from 'react';
>import MyPhoneInput from '~/components/my-phone-input'; //引入子组件
>const ChannelEdit: FC<IProps> = (props) => {
>const childRef = useRef(); //useRef
>const checkSubmit = () => childRef?.current?.checkSubmit(); //调用子组件的方法
>return(
><MyPhoneInput  cRef={childRef} />  
>)    
>}
>```
>
>```jsx
>//子组件代码
>import React, { useEffect, useState, useImperativeHandle } from 'react';
>const SuperPhoneInput = (props) => {
>useImperativeHandle(cRef, () => ({
>checkSubmit,
>}));
>//需要在父组件调用的 子组件方法 
>const checkSubmit = () => {
>let tels = [];
>let ischange = false;
>	//..... 各种操作,然后返回结果给父组件
>return { ischange, tels };
>};  
>}
>```
