# Ⅵ-Redux

## 1、redux理解

### Ⅰ-学习文档

>1. 英文文档: https://redux.js.org/
>
>2. 中文文档: http://www.redux.org.cn/
>
>3. Github: https://github.com/reactjs/redux

### Ⅱ-redux是什么

>1. redux是一个专门用于做`状态管理的JS库`(不是react插件库)。
>
>2. 它可以用在react, angular, vue等项目中, 但基本与react配合使用。
>
>3. 作用: 集中式管理react应用中多个组件`共享`的状态。

### Ⅲ-什么情况下需要使用redux

>1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
>
>2. 一个组件需要改变另一个组件的状态（通信）。
>
>3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

### Ⅳ-redux工作流程

>![React系统学习_Redux工作流程原理图](C:/Users/王超凡/Desktop/新建文件夹 (2)/hongs-study-notes/编程_前端开发学习笔记/React笔记/images/React系统学习_Redux工作流程原理图.png)

## 2、redux的三个核心概念

### Ⅰ-action

>1. `动作的对象`
>
>2. 包含2个属性
>
>   type：标识属性, 值为字符串, 唯一, 必要属性
>
>   data：数据属性, 值类型任意, 可选属性
>
>3. 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

### Ⅱ-reducer

>1. 用于初始化状态、加工状态。
>2. 加工时，根据旧的state和action， 产生新的state的`纯函数(以下为纯函数概念)``
>
>  - ``纯函数:`一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
>  - 必须遵守以下一些约束 
>    1)   不得改写参数数据
>    2)   不会产生任何副作用，例如网络请求，输入和输出设备
>    3)   不能调用Date.now()或者Math.random()等不纯的方法 
>
>3. `redux的reducer函数必须是一个纯函数`



### Ⅲ-store

>1. 将state、action、reducer联系在一起的对象
>
>2. `如何得到此对象`?
>
>   - import {createStore} from 'redux'
>   - import reducer from './reducers'
>    - const store = createStore(reducer)
>
>3. 此对象的功能?
>
>   - getState(): 得到state
>
>    - dispatch(action): 分发action, 触发reducer调用, 产生新的state
>
>    - subscribe(listener): 注册监听, 当产生了新的state时, 自动调用

## 3、redux的核心API

### Ⅰ-createstore()与applyMiddleware()

>createstore()作用：创建包含指定reducer的store对象
>
>applyMiddleware()作用：应用上基于redux的中间件(插件库)
>
>```js
>//代码示例
>---------------------------store.js 部分代码---------------------------------
>//引入createStore,专门用于创建redux中最为核心的store对象
>import {createStore,applyMiddleware} from 'redux'
>//暴露store
>export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
>```

### Ⅱ-store对象

>1. 作用: redux库最核心的管理对象
>
>2. 它内部维护着:
>
>   - state
>
>   - reducer
>
>3. 核心方法:
>
>   - getState()
>
>   - dispatch(action)
>
>   - subscribe(listener)
>
>4. 具体编码:
>
>   - store.getState()
>
>   - store.dispatch({type:'INCREMENT', number})
>
>   - store.subscribe(render)
>
>```jsx
>//代码示例
>---------------------------store.js---------------------------------
>/**
>* 该文件撰文用于暴露一个store对象,整个应用只有一个store对象
>*/
>//引入createStore,专门用于创建redux中最为核心的store对象
>import {createStore,applyMiddleware} from 'redux'
>//引入汇总后的reducer
>import reducer from './reducers'
>//引入redux-thunk，用于支持异步action
>import thunk from 'redux-thunk'
>//引入redux-devtools-extension
>import {composeWithDevTools} from 'redux-devtools-extension'
>//暴露store
>export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
>----------------------------index.js 引入store对象--------------------------------
>import React from 'react'
>import ReactDOM from "react-dom"
>import App from './App'
>import store from './redux/store'
>import {Provider} from 'react-redux'
>
>ReactDOM.render(
>	/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
>	<Provider store={store}>
>		<App/>
>	</Provider>,
>	document.getElementById('root')
>)
>```

### Ⅲ-combineReducers()

> 作用：合并多个reducer函数
>
> ```jsx
> //代码示例
> ------------------ redux/reducers/index.js ------------------------------------
> /**
>  * 该文件用于汇总所有的reducer为一个总的reducer
>  */
> //引入combineReducers，用于汇总多个reducer
> import {combineReducers} from 'redux'
> //引入为Count组件服务的reducer
> import count from './count'
> import persons from './person'
> 
> //汇总所有的reducer变为一个总的reducer
> export default combineReducers({
>   count,persons
> })
> ```

## 4、redux 异步编程

### Ⅰ-理解

>1. redux默认是不能进行异步处理的,
>
>2. 某些时候应用中需要在`redux`中执行异步任务(ajax, 定时器)

### Ⅱ- 使用异步中间件

>1. 下载依赖`npm install --save redux-thunk`
>
>2. 使用
>
> ```jsx
>//代码示例
>---------------------------store.js---------------------------------
>/**
> * 该文件撰文用于暴露一个store对象,整个应用只有一个store对象
> */
>//引入createStore,专门用于创建redux中最为核心的store对象
>import {createStore,applyMiddleware} from 'redux'
>//引入汇总后的reducer
>import reducer from './reducers'
>//引入redux-thunk，用于支持异步action
>import thunk from 'redux-thunk'
>//引入redux-devtools-extension
>import {composeWithDevTools} from 'redux-devtools-extension'
>//暴露store
>export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
> ```

## 5、react-redux

### Ⅰ-理解

>1. 一个react插件库
>
>2. 专门用来简化react应用中使用redux

### Ⅱ-react-Redux将所有组件分成两大类

#### ①  UI组件

>1)   只负责 UI 的呈现，不带有任何业务逻辑
>
>2)   通过props接收数据(一般数据和函数)
>
>3)   不使用任何 Redux 的 API
>
>4)   一般保存在`components`文件夹下,也可以直接写在容器组件中直接加工成容器组件

#### ②   容器组件

>1)   负责管理数据和业务逻辑，不负责UI的呈现
>
>2)   使用 Redux 的 API
>
>3)   一般保存在`ontainers`文件夹下

### Ⅲ-相关API

#### ① Provider

>作用: 让所有组件都可以得到state数据
>
>```jsx
>import React from 'react'
>import ReactDOM from "react-dom"
>import App from './App'
>import store from './redux/store'
>import {Provider} from 'react-redux'
>
>ReactDOM.render(
>	/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
>	<Provider store={store}>
>		<App/>
>	</Provider>,
>	document.getElementById('root')
>)
>```

#### ② `connect()()`

>1. 作用: 用于包装 UI 组件生成容器组件
>
>2. 使用connect(`mapDispatchToProps`,`mapDispatchToProps`)(UI组件)
>
>  注意点:
>
>    1. 该方法默认传入`state`与`dispatch`
>    2. 可以省略`dispatch`直接传入`action`方法,该api会自动帮你调用`dispatch`

##### Ⅰ-mapStateToProps

>作用:将外部的数据（即`state对象`）转换为UI组件的标签属性
>
>1.mapStateToProps函数返回的是一个对象；
>
>2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
>
>3.mapStateToProps`用于传递状态`
>
>```jsx
>function mapStateToProps(state){
>	return {count:state}
>}
>```

##### Ⅱ-mapDispatchToProps

>作用:将`分发action的函数`转换为UI组件的标签属性
>
>1. mapDispatchToProps函数返回的是一个对象；
>2. 返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
>3. mapDispatchToProps`用于传递操作状态的方法`
>4. 可以省略`dispatch`,直接传入`action`,api将会`自动调用`dispatch

##### Ⅲ-代码示例

>```jsx
>------------------------------不简化代码-----------------------------------------------
>/* 
>	1.mapStateToProps函数返回的是一个对象；
>	2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
>	3.mapStateToProps用于传递状态
>*/
>function mapStateToProps(state){
>	return {count:state}
>}
>
>/* 
>	1.mapDispatchToProps函数返回的是一个对象；
>	2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
>	3.mapDispatchToProps用于传递操作状态的方法
>*/
>function mapDispatchToProps(dispatch){
>	return {
>		jia:number => dispatch(createIncrementAction(number)),
>		jian:number => dispatch(createDecrementAction(number)),
>		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
>	}
>}
>
>//使用connect()()创建并暴露一个Count的容器组件
>export default connect(mapStateToProps,mapDispatchToProps)(CountUI)
>
>----------------下面是简化代码-----------------------------
>//使用connect()()创建并暴露一个Count的容器组件
>//使用connect(传入状态,操作状态方法)(UI组件)
>export default connect(
>state => ({
>count: state.count,
>personCount: state.persons.length
>}),
>{increment, decrement, incrementAsync}
>)(Count)
>```

## 6、使用redux调试工具

### Ⅰ- 安装chrome浏览器插件

> Redux DecTools

### Ⅱ-下载工具依赖包

> npm install --save-dev redux-devtools-extension

### Ⅲ-修改store.js

>`import {composeWithDevTools} from 'redux-devtools-extension'`
>
>```jsx
>/**
>* 该文件撰文用于暴露一个store对象,整个应用只有一个store对象
>*/
>//引入createStore,专门用于创建redux中最为核心的store对象
>import {createStore,applyMiddleware} from 'redux'
>//引入汇总后的reducer
>import reducer from './reducers'
>//引入redux-thunk，用于支持异步action
>import thunk from 'redux-thunk'
>//引入redux-devtools-extension
>import {composeWithDevTools} from 'redux-devtools-extension'
>//暴露store
>export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
>```
