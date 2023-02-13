# Ⅷ-React 拓展

## 1、 setState

### setState更新状态的2种写法

>(1). setState(stateChange, [callback])------对象式的setState
>1.stateChange为状态改变对象(该对象可以体现出状态的更改)
>2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
>
>(2). setState(updater, [callback])------函数式的setState
>
>- updater为返回stateChange对象的函数。
>- updater可以接收到state和props。
>- callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
>
>总结:
>		1.对象式的setState是函数式的setState的简写方式(`语法糖`)
>		2.使用原则：
>				(1).如果新状态不依赖于原状态 ===> 使用对象方式
>				(2).如果新状态依赖于原状态 ===> 使用函数方式
>				(3).如果需要在setState()执行后获取最新的状态数据, 
>					要在第二个callback函数中读取
>
>```js
>import React, { Component } from 'react'
>export default class Demo extends Component {
>state = { count: 0 }
>add = () => {
>//对象式的setState
>/* //1.获取原来的count值
>const {count} = this.state
>//2.更新状态
>this.setState({count:count+1},()=>{ console.log(this.state.count); })
>//console.log('12行的输出',this.state.count); //0 */
>//函数式的setState
>this.setState(state => ({ count: state.count + 1 }))
>}
>render() {
>return (
><div>
>  <h1>当前求和为：{this.state.count}</h1>
>  <button onClick={this.add}>点我+1</button>
></div>
>)}}
>```



------



## 2、lazyLoad

### 路由组件的lazyLoad

>1. 懒加载中的组件,随用随调,不会提前加载
>2. 使用懒加载时需要给定一个`fallback`,用于请求过慢或者请求不到组件时显示,通常为`组件`(也可以直接为一个`虚拟DOM`)
>3. `fallback`如果是指定为一个组件,则该组件一定不能指定为`懒加载组件`,就正常引入的那种组件即可

```js
//	import Loading from './Loading' // 用于指定`fallback`
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
    //<Suspense fallback={<Loading/>}>   指定为组件                 
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3、Hooks

> 详见隔壁文件夹`React Hooks`笔记

#### 1. React Hook/Hooks是什么?

>(1). Hook是React 16.8.0版本增加的新特性/新语法
>(2). 可以让你在函数组件中使用 state 以及其他的 React 特性

#### 2. 三个常用的Hook

>(1). State Hook: React.useState()
>(2). Effect Hook: React.useEffect()
>(3). Ref Hook: React.useRef()

#### 3. State Hook

>(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
>(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
>(3). useState()说明:
>   参数: 第一次初始化指定的值在内部作缓存
>   返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
>(4). setXxx()2种写法:
>   setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
>   setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

#### 4. Effect Hook

>(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
>(2). React中的副作用操作:
>   发ajax请求数据获取
>   设置订阅 / 启动定时器
>   手动更改真实DOM
>(3). 语法和说明: 
>   useEffect(() => { 
>     // 在此可以执行任何带副作用操作
>     return () => { // 在组件卸载前执行
>       // 在此做一些收尾工作, 比如清除定时器/取消订阅等
>     }
>   }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
>
>(4). 可以把 useEffect Hook 看做如下三个函数的组合
>   componentDidMount()
>   componentDidUpdate()
>	componentWillUnmount() 

#### 5. Ref Hook

>(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
>(2). 语法: const refContainer = useRef()
>(3). 作用:保存标签对象,功能与React.createRef()一样
>
>```js
>	myRef = React.createRef()
>	show = ()=>{
>		alert(this.myRef.current.value)
>	}
>```



------



## 4、 Fragment

>1. 作用:可以不用必须有一个真实的DOM根标签了
>
>2. 当你不得不使用一个`容器`去包裹dom元素--jsx语法要求,以往我们做法是直接包一层`div`
>
>  3. 使用`Fragment`后可以`取代div`,但是编译后会被react丢弃,所以不会造成没必要的层级嵌套
>
>  4. 效果等同于直接写一个`空标签<></>`,但是二者有区别
>
>     `区别`:`Fragment`可以添加`key`属性作为唯一标识,而空标签一点属性都不能加
>
>```jsx
>import React, { Component,Fragment } from 'react'
>
>export default class Demo extends Component {
>	render() {
>		return (
>			<Fragment key={1}> 
>				<input type="text"/>
>				<input type="text"/>
>			</Fragment>
>		)
>	}
>}
>```



## 5、Context

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信
>
> 1) 创建Context容器对象：
>
> ```jsx
> 	const XxxContext = React.createContext()  
> ```
>
> 2) 渲染子组时，外面包裹`xxxContext.Provider`, 通过value属性给后代组件传递数据：
>
> ```jsx
> <xxxContext.Provider value={数据}>
> 		子组件
>  </xxxContext.Provider>
> ```
>
> 3) 后代组件读取数据：`两种方法`
>
> ```jsx
> 	//第一种方式:仅适用于类组件 
> ​	  static contextType = xxxContext  // 声明接收context
> ​	  this.context // 读取context中的value数据
> 
> ​	//第二种方式: 函数组件与类组件都可以
> ​	  <xxxContext.Consumer>
> ​	    {
> ​	      value => ( // value就是context中的value数据
> ​	        要显示的内容
> ​	      )
> ​	    }
> ​	  </xxxContext.Consumer>
> ```
>
> 注意:在应用开发中`一般不用context`, 一般都用它的封装react插件
>
> 4)完整例子:
>
> ```jsx
> //------------------- 完整例子 ------------------------------------------------
> import React, { Component } from 'react'
> import './index.css'
> //创建Context对象
> const MyContext = React.createContext()
> const {Provider,Consumer} = MyContext
> export default class A extends Component {
> 
> 	state = {username:'tom',age:18}
> 
> 	render() {
> 		const {username,age} = this.state
> 		return (
> 			<div className="parent">
> 				<h3>我是A组件</h3>
> 				<h4>我的用户名是:{username}</h4>
> 				<Provider value={{username,age}}>
> 					<B/>
> 				</Provider>
> 			</div>
> 		)
> 	}
> }
> 
> class B extends Component {
> 	render() {
> 		return (
> 			<div className="child">
> 				<h3>我是B组件</h3>
> 				<C/>
> 			</div>
> 		)
> 	}
> }
> 
> /* class C extends Component {
> 	//声明接收context
> 	static contextType = MyContext
> 	render() {
> 		const {username,age} = this.context
> 		return (
> 			<div className="grand">
> 				<h3>我是C组件</h3>
> 				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
> 			</div>
> 		)
> 	}
> } */
> 
> function C(){
> 	return (
> 		<div className="grand">
> 			<h3>我是C组件</h3>
> 			<h4>我从A组件接收到的用户名:
> 			<Consumer>
> 				{value => `${value.username},年龄是${value.age}`} //也可以返回标签
> 			</Consumer>
> 			</h4>
> 		</div>
> 	)
> }
> ```

------



## 6、组件优化 --`PureComponent`

>**Ⅰ-`Component的2个问题`**
>
>1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低
>
>**Ⅱ-效率高的做法:**
>
>只有当组件的state或props数据发生改变时才重新render()
>
>**Ⅲ-原因解析**
>
>Component中的shouldComponentUpdate()总是返回true

#### 优化解决

>办法1: 
>	`重写shouldComponentUpdate()`方法
>	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
>办法2:  
>	使用`PureComponent`
>	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
>	注意: 
>		只是进行state和props数据的`浅比较`, 如果只是数据对象内部数据变了, 返回false  
>		不要直接修改state数据, 而是要`产生新数据`
>项目中一般使用PureComponent来优化
>
>**优化代码示例:**
>
>```jsx
>import React, { PureComponent } from 'react'
>import './index.css'
>export default class Parent extends PureComponent {
>state = { carName: "奔驰c36", stus: ['小张', '小李', '小王'] }
>addStu = () => {
>/* const {stus} = this.state
>stus.unshift('小刘')
>this.setState({stus}) */
>const { stus } = this.state
>this.setState({ stus: ['小刘', ...stus] })
>}
>
>changeCar = () => {
>//this.setState({carName:'迈巴赫'})
>
>const obj = this.state
>obj.carName = '迈巴赫'
>console.log(obj === this.state);
>this.setState(obj)
>}
>
>/* shouldComponentUpdate(nextProps,nextState){
>// console.log(this.props,this.state); //目前的props和state
>// console.log(nextProps,nextState); //接下要变化的目标props，目标state
>return !this.state.carName === nextState.carName
>} */
>
>render() {
>console.log('Parent---render');
>const { carName } = this.state
>return (
> <div className="parent">
>   <h3>我是Parent组件</h3>
>   {this.state.stus}&nbsp;
>   <span>我的车名字是：{carName}</span><br />
>   <button onClick={this.changeCar}>点我换车</button>
>   <button onClick={this.addStu}>添加一个小刘</button>
>   <Child carName="奥拓" />
> </div>
>)
>}
>}
>
>class Child extends PureComponent {
>/* shouldComponentUpdate(nextProps,nextState){
>console.log(this.props,this.state); //目前的props和state
>console.log(nextProps,nextState); //接下要变化的目标props，目标state
>return !this.props.carName === nextProps.carName
>} */
>render() {
>console.log('Child---render');
>return (
> <div className="child">
>   <h3>我是Child组件</h3>
>   <span>我接到的车是：{this.props.carName}</span>
> </div>
>)
>}
>}
>```

------

## 7、 render props  ---类似vue插槽

>1. 如何向组件内部动态传入带内容的结构(标签)?
>
>  Vue中: 
>  	使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
>  React中:
>  	使用children props: 通过组件标签体传入结构
>  	使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性
>
>2. children props
>
>  ```jsx
><A>
>  <B>xxxx</B>
></A>
>{this.props.children}
>问题: 如果B组件需要A组件内的数据, ==> 做不到 
>  ```
>
>3. render props
>
>  ```jsx
><A render={(data) => <C data={data}></C>}></A>
>A组件: {this.props.render(内部state数据)}
>C组件: 读取A组件传入的数据显示 {this.props.data}
>  ```
>
>4. 示例
>
>  ```jsx
>  import React, { Component } from 'react'
>  import './index.css'
>  import C from '../1_setState'
>
>  export default class Parent extends Component {
>  	render() {
>  		return (
>  			<div className="parent">
>  				<h3>我是Parent组件</h3>
>  				<A render={(name)=><C name={name}/>}/>
>  			</div>
>  		)
>  	}
>  }
>
>  class A extends Component {
>  	state = {name:'tom'}
>  	render() {
>  		console.log(this.props);
>  		const {name} = this.state
>  		return (
>  			<div className="a">
>  				<h3>我是A组件</h3>
>  				{this.props.render(name)}
>  			</div>
>  		)
>  	}
>  }
>
>  class B extends Component {
>  	render() {
>  		console.log('B--render');
>  		return (
>  			<div className="b">
>  				<h3>我是B组件,{this.props.name}</h3>
>  			</div>
>  		)
>  	}
>  }
>
>  ```

------

## 8、错误边界

>1. 理解：
>
>​	错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面
>
>2. 特点：
>
>​	`只能捕获后代组件生命周期`产生的错误，`不能捕获自己组件`产生的错误和其他组件在合成事件、定时器中产生的错误
>
>3. getDerivedStateFromError配合componentDidCatch
>
>  ```jsx
>  // 生命周期函数，一旦后台组件报错，就会触发
>  static getDerivedStateFromError(error) {
>      console.log(error);
>      // 在render之前触发
>      // 返回新的state
>      return {
>          hasError: true,
>      };
>  }
>
>  componentDidCatch(error, info) {
>      // 统计页面的错误。发送请求发送到后台去
>      console.log(error, info);
>  }
>  ```
>
>4. 代码示例
>
>  ```jsx
>  import React, { Component } from 'react'
>  import Child from './Child'
>
>  export default class Parent extends Component {
>
>    state = {
>      hasError: '' //用于标识子组件是否产生错误
>    }
>
>    //当Parent的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息
>    static getDerivedStateFromError(error) {
>      console.log('@@@', error);
>      return { hasError: error }
>    }
>
>    componentDidCatch() {
>      console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
>    }
>
>    render() {
>      return (
>        <div>
>          <h2>我是Parent组件</h2>
>          {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child />}
>        </div>
>      )
>    }
>  }
>
>  ```
>
>

## 9、 组件通信方式总结

>1. 组件间的关系：
>
>- 父子组件
>- 兄弟组件（非嵌套组件）
>- 祖孙组件（跨级组件）
>
>2. 几种通信方式：
>
>   ```js
>   - props：
>        1).children props
>        (2).render props
>   
>   - 消息订阅-发布：
>        ubs-sub、event等等
>   
>   - 集中式管理：
>        edux、dva等等
>   
>   - conText:
>        产者-消费者模式
>   ```
>
>3. 比较好的搭配方式
>
>   ```js
>   - 父子组件：props
>   - 兄弟组件：消息订阅-发布、集中式管理
>   - 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)
>   ```
