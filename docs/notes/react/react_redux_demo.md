# Ⅶ-Redux求和案例

> 将只展示最终代码
>
> `注意`:在`reducer`中如果preState是一个数组,不可以用`push、unshift`等方法进行修改,如此修改并不会修改其引用,所以`diff`并不会判定其发生改变,`导致页面无法自动重新渲染`
>
> ```js
> 	//preState.unshift(data) //此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
> 	return [data,...preState]
> ```

### 1、求和案例_redux精简版

> (1).去除Count组件自身的状态
>
> (2).src下建立:
>
> ​      -redux
>
> ​       -store.js
>
> ​       -count_reducer.js
>
> (3).store.js：
>
> ​     1).引入redux中的createStore函数，创建一个store
>
> ​     2).createStore调用时要传入一个为其服务的reducer
>
> ​     3).记得暴露store对象
>
> (4).count_reducer.js：
>
> ​     1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
>
> ​     2).reducer有两个作用：初始化状态，加工状态
>
> ​     3).reducer被第一次调用时，是store自动触发的，
>
> ​         传递的preState是undefined,
>
> ​         传递的action是:{type:'@@REDUX/INIT_a.2.b.4}
>
> (5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
>
> ​    备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写

### 2、求和案例_redux完整版

>  新增文件：
>
>  1.count_action.js 专门用于创建action对象
>
>  2.constant.js 放置容易写错的type值

### 3、求和案例_redux异步action版

>   (1).明确：延迟的动作不想交给组件自身，想交给action
>
>   (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
>
>   (3).具体编码：
>
>   ​     1).yarn add redux-thunk，并配置在store中
>
>   ​     2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
>
>   ​     3).异步任务有结果后，分发一个同步的action去真正操作数据。
>
>   (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。

### 4、求和案例_react-redux基本使用

>   (1).明确两个概念：
>
>   ​      1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
>
>   ​      2).容器组件：负责和redux通信，将结果交给UI组件。
>
>   (2).如何创建一个容器组件————靠react-redux 的 connect函数
>
>   ​       connect(mapStateToProps,mapDispatchToProps)(UI组件)
>
>   ​        -mapStateToProps:映射状态，返回值是一个对象
>
>   ​        -mapDispatchToProps:映射操作状态的方法，返回值是一个对象
>
>   (3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
>
>   (4).备注2：mapDispatchToProps，也可以是一个对象

### 5、求和案例_react-redux优化

>   (1).容器组件和UI组件整合一个文件
>
>   (2).无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
>
>   (3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
>
>   (4).mapDispatchToProps也可以简单的写成一个对象
>
>   (5).一个组件要和redux“打交道”要经过哪几步？
>
>   ​       (1).定义好UI组件---不暴露
>
>   ​       (2).引入connect生成一个容器组件，并暴露，写法如下         
>
>   ```jsx
>   connect(
>      state => ({key:value}), //映射状态
>      {key:xxxxxAction} //映射操作状态的方法
>     )(UI组件)
>   ```
>
>   ​       (3).在UI组件中通过this.props.xxxxxxx读取和操作状态

### 6、求和案例_react-redux数据共享版

>   (1).定义一个Pserson组件，和Count组件通过redux共享数据。
>
>   (2).为Person组件编写：reducer、action，配置constant常量。
>
>   (3).重点：Person的reducer和Count的Reducer要使用combineReducers进行合并，合并后的总状态是一个对象！！！
>
>   (4).交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。

### 7、求和案例_react-redux开发者工具的使用

>   (1).yarn add redux-devtools-extension
>
>   (2).store中进行配置
>
>   ​     import {composeWithDevTools} from 'redux-devtools-extension'
>
>   ​     const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))

### 8、求和案例_react-redux最终版

>   (1).所有变量名字要规范，尽量触发对象的简写形式。
>
>   (2).reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

### 9、最终代码

#### Ⅰ-src文件目录

>src
>
>--`containers`
>
>​	--Count
>
>​		--index.jsx
>
>​	--Person
>
>​		--index.jsx
>
>--`redux`
>
>​	--actions
>
>​		--count.js
>
>​		--person.js
>
>​	--reducers
>
>​		--count.js
>
>​		--index.js
>
>​		--person.js
>
>​	--constant.js
>
>​	--store.js
>
>--`App.jsx`
>
>--`index.js`

#### Ⅱ-index.js

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

#### Ⅲ-App.jsx

>```jsx
>import React, { Component } from 'react'
>import Count from './containers/Count' //引入的Count的容器组件
>import Person from './containers/Person' //引入的Person的容器组件
>
>export default class App extends Component {
>	render() {
>		return (
>			<div>
>				<Count/>
>				<hr/>
>				<Person/>
>			</div>
>		)
>	}
>}
>
>```

#### Ⅳ-redux文件

>1. `action`文件夹
>
>```jsx
>--------------------------------count.js------------------------------------------
>/**
>* 该文件专门未Count组件生成对象
>*/
>import {INCREMENT,DECREMENT} from '../constant'
>
>//声明同步action,就是指action的值为Object类型的一般对象
>export const increment=data=>({type:INCREMENT,data})
>export const decrement=data=>({type:DECREMENT,data})
>
>
>//声明异步action,就是指action的值为函数,异步action中一般都会调用同步action
>//在外部调用该action方法时需要引入redux-thunk，用于支持异步action
>//该方法会自动传入dispatch
> export const incrementAsync=(data,time)=>{
>   return (dispatch)=>{
>     setTimeout(()=>{
>       dispatch(increment(data))
>     },time)
>   }
> }
>--------------------------------------person.js-------------------------------
>import {ADD_PERSON} from '../constant'
>//创建增加一个人的action动作对象
>export const addPerson=personObj=>({
> type:ADD_PERSON,
> data:personObj
>})
>```
>
>2. `reducers`文件夹
>
>```jsx
>--------------------------------count.js------------------------------------------
>/**
>* 1. 该文件时用于创建一个为Count组件服务的reducer.reducer的本质就是一个函数
>* 2. reducer函数会接到两个参数,分别为:之前状态(preState),动作对象(action)
>*/
>import {
> INCREMENT,
> DECREMENT
>} from '../constant'
>const initState = 0 //初始化状态
>export default function countReducer(preState = initState, action) {
> //从action对象中获取:type:data
> const {
>   type,
>   data
> } = action
> //根据type决定如何加工数据
> switch (type) {
>   case INCREMENT:
>     return preState + data
>   case DECREMENT:
>     return preState - data
>   default:
>     return preState
> }
>}
>--------------------------------------person.js-------------------------------
>import {ADD_PERSON} from '../constant'
>//初始化人的列表
>const initState = [{id:'001',name:'tom',age:18}]
>export default function personReducer(preState=initState,action){
>	// console.log('personReducer@#@#@#');
>	const {type,data} = action
>	switch (type) {
>		case ADD_PERSON: //若是添加一个人
>			//preState.unshift(data) //此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
>			return [data,...preState]
>		default:
>			return preState
>	}
>}
>--------------------------------------index.js-------------------------------
>/**
>* 该文件用于汇总所有的reducer为一个总的reducer
>*/
>//引入combineReducers，用于汇总多个reducer
>import {combineReducers} from 'redux'
>//引入为Count组件服务的reducer
>import count from './count'
>import persons from './person'
>
>//汇总所有的reducer变为一个总的reducer
>export default combineReducers({
> count,persons
>})
>```
>
>3. `store.js`
>
>```js
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
>
>4.`constant.js`
>
>```js
>/**
>* 该模块是用于定义action对象中的type类型的常量值,目的只有一个:
>*  便于管理的同事防止程序员单词写错
>*/
>export const INCREMENT = 'increment'
>export const DECREMENT = 'decrement'
>export const ADD_PERSON = 'add_person'
>```

#### Ⅴ-containers

>1. `Count`文件夹的`index.jsx`
>
>  ```jsx
>  import React, { Component } from 'react'
>
>  //引入action
>  import {
>    increment,
>    decrement,
>    incrementAsync
>  } from "../../redux/actions/count"
>  //引入connect用于链接UI组件与redux
>  import { connect } from 'react-redux'
>
>  //定义UI组件,这个将再connect()()中加工成容器组件,就可以调用到其传入的redux状态与actions
>  class Count extends Component {
>    increment = () => {
>      //获取出入内容
>      const { value } = this.selectNumber
>      this.props.increment(value * 1)
>    }
>    //减法
>    decrement = () => {
>      const { value } = this.selectNumber
>      this.props.decrement(value * 1)
>    }
>    //奇数再加
>    incrementIfOdd = () => {
>      const { value } = this.selectNumber
>      if (this.props.count % 2 !== 0) {
>        this.props.increment(value * 1)
>      }
>    }
>    //异步加
>    incrementAsync = () => {
>      const { value } = this.selectNumber
>      this.props.incrementAsync(value * 1, 500)
>    }
>
>    render() {
>      return (
>        <div>
>          <h2>我是Count组件,下方组件总人数为:{this.props.personCount}</h2>
>          <h4>当前求和为：{this.props.count}</h4>
>          <select ref={c => this.selectNumber = c}>
>            <option value="1">1</option>
>            <option value="2">2</option>
>            <option value="3">3</option>
>          </select>&nbsp;
>          <button onClick={this.increment}>+</button>&nbsp;
>          <button onClick={this.decrement}>-</button>&nbsp;
>          <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
>          <button onClick={this.incrementAsync}>异步加</button>&nbsp;
>        </div>
>      )
>    }
>
>  }
>
>
>  //使用connect()()创建并暴露一个Count的容器组件
>  //使用connect(传入状态,操作状态方法)(UI组件)
>  export default connect(
>    state => ({
>      count: state.count,
>      personCount: state.persons.length
>    }),
>    {increment, decrement, incrementAsync}
>  )(Count)
>
>  ```
>
>2. `Person`文件夹下的jsx
>
>  ```jsx
>  import React, { Component } from 'react'
>  import { connect } from 'react-redux'
>  import { addPerson } from '../../redux/actions/person'
>  import { nanoid } from 'nanoid'
>  //创建UI组件
>  class Person extends Component {
>    addPerson = () => {
>      const name = this.nameNode.value
>      const age = this.ageNode.value * 1
>      const personObj = { id: nanoid(), name, age }
>      this.props.addPerson(personObj)
>      this.nameNode.value = ''
>      this.ageNode.value = ''
>    }
>
>    render() {
>      return (
>        <div>
>          <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
>          <input ref={c => this.nameNode = c} type="text" placeholder="输入名字" />
>          <input ref={c => this.ageNode = c} type="text" placeholder="输入年龄" />
>          <button onClick={this.addPerson}>添加</button>
>          <ul>
>            {
>              this.props.persons.map((p) => {
>                return <li key={p.id}>{p.name}--{p.age}</li>
>              })
>            }
>          </ul>
>        </div>
>      )
>    }
>  }
>  export default connect(
>    state => ({
>      persons: state.persons,
>      count: state.count
>    }), { addPerson }
>  )(Person)
>
>  ```
