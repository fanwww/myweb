# Ⅳ-React 路由

## 1、相关理解

### Ⅰ-SPA的理解

>1. 单页Web应用（single page web application，SPA）。
>
>2. 整个应用只有**一个完整的页面**。
>
>3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新。**
>
>4. 数据都需要通过ajax请求获取, 并在前端异步展现。

### Ⅱ-路由的理解

#### ① 什么是路由?

>1. 一个路由就是一个映射关系(key:value)
>
>2. key为路径, value可能是function或component

#### ② 路由分类

##### 1、后端路由

>1)   理解： value是function, 用来处理客户端提交的请求。
>
>2)   注册路由： router.get(path, function(req, res))
>
>3)   工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

##### 2、前端路由

>1)   浏览器端路由，value是component，用于展示页面内容。
>
>2)   注册路由: `<Route path="/test" component={Test}>`
>
>3)   工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

### Ⅲ-react-router-dom的理解

#### ①相关概念

>1. react的一个插件库。
>
>2. 专门用来实现一个SPA应用。
>
>3. 基于react的项目基本都会用到此库。

#### ②相关api

##### 1、内置组件

>1. `<BrowserRouter>`
>
>2. `<HashRouter>`
>
>3. `<Route>`
>
>4. `<Redirect>`
>
>5. `<Link>`
>
>6. `<NavLink>`
>
>7. `<Switch>`

##### 2、其他

>1. history对象
>
>2. match对象
>
>3. withRouter函数

## 2、路由的基本使用

>1.明确好界面中的导航区、展示区
>
>2.导航区的a标签改为Link标签
>
>```js
><Link to="/xxxxx">Demo</Link>
>```
>
>3.展示区写Route标签进行路径的匹配 
>
>```js
><Route path='/xxxx' component={Demo}/>
>```
>
>4.`<App>`的最外侧包裹了一个`<BrowserRouter>或<HashRouter>`
>
>```js
>ReactDOM.render(
>	<BrowserRouter>
>		<App/>
>	</BrowserRouter>,
>	document.getElementById('root')
>)
>```

## 3、路由组件与一般组件

>1.写法不同：
>
>​      一般组件：`<Demo/>`
>
>​      路由组件：`<Route path="/demo" component={Demo}/>`
>
>2.存放位置不同：
>
>​      一般组件：components
>
>​      路由组件：pages
>
>3. 接收到的props不同：
>
> 一般组件：写组件标签时传递了什么，就能收到什么
>
> 路由组件：接收到三个固定的属性
>
> ```json
>//路由属性打印结果展示
>history:
>	go: ƒ go(n)
>	goBack: ƒ goBack()
>	goForward: ƒ goForward()
>	push: ƒ push(path, state)
>	replace: ƒ replace(path, state)
>location:
>    pathname: "/about"
>	search: ""
>	state: undefined
>	match:
>params: { }
>	path: "/about"
>	url: "/about"
> ```

## 4、NavLink使用与封装

>1. NavLink可以`实现路由链接的高亮`，通过`activeClassName指定样式名`
>
>2. 封装
>
> ```jsx
>//封装示例
>export default class MyNavLink extends Component {
>	render() {
>		return (
>			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
>		)
>	}
>}
> ```
>
>3. 使用与调用
>
> ```jsx
>//原生html中，靠<a>跳转不同的页面
>{/* <a className="list-group-item" href="./about.html">About</a>
><a className="list-group-item active" href="./home.html">Home</a> */}
>
> {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
> 	<MyNavLink to="/about">About</MyNavLink>
> 	<MyNavLink to="/home">Home</MyNavLink>
> ```

## 5、Switch的使用

>1.通常情况下，path和component是一一对应的关系。
>
>2.Switch可以提高路由匹配效率(单一匹配) ---- 即匹配到一个后将不再往下匹配
>
>```jsx
><Switch>
>	<Route path="/about" component={About}/>
>	<Route path="/home" component={Home}/>
>	<Route path="/home" component={Test}/>
></Switch>
>```

## 6、解决多级路径刷新页面样式丢失的问题

>1.public/index.html 中 引入样式时不写 ./ 写 / （常用）
>
>2.public/index.html 中 引入样式时不写 ./ 写 `%PUBLIC_URL%` （常用,但`只在react中`有效果）
>
>3.使用HashRouter (不常用)
>
>```html
><!DOCTYPE html>
><html>
>	<head>
>		<meta charset="UTF-8" />
>		<title>react脚手架</title>
>   <!-- 方法二 -->
>		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
>     <!-- 方法一 -->
>		<link rel="stylesheet" href="/css/bootstrap.css">
>	</head>
>	<body>
>		<div id="root"></div>
>	</body>
></html>
>```

## 7、路由的严格匹配与模糊匹配

>1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
>
>2. 开启严格匹配：<Route `exact={true}`path="/about" component={About}/>  
>
>  可以省略`exact={true}`为`exact`
>
>3. `严格匹配不要随便开启`，需要再开，有些时候开启会导致无法继续匹配二级路由
>
>```jsx
>//编写路由链接
>	<MyNavLink to="/about">About</MyNavLink>
>	<MyNavLink to="/home/a/b">Home</MyNavLink>
>
>{/* 注册路由 */}
>	<Switch>
>		<Route exact path="/about" component={About}/>
>		<Route exact path="/home" component={Home}/>
>	</Switch>
>```

## 8、**Redirect的使用** 

>1. 一般写在所有路由注册的`最下方`，当所有路由都`无法匹配时`，跳转到Redirect指定的路由
>
>2. 具体编码：
>
>  ```jsx
>	<Switch>
>		<Route path="/about" component={About}/>
>		<Route path="/home" component={Home}/>
>		<Redirect to="/about"/>
>	</Switch>
>  ```

## 9、嵌套路由

>1. 注册子路由时要写上父路由的path值
>
>2. 路由的匹配是按照注册路由的顺序进行的
>
>```jsx
>-------------------注册一级路由-----------------------------
>	{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
>	<MyNavLink to="/about">About</MyNavLink>
>	<MyNavLink to="/home">Home</MyNavLink>
>   {/* 注册路由 */}
>	<Switch>
>		<Route path="/about" component={About}/>
>		<Route path="/home" component={Home}/>
>		<Redirect to="/about"/>
>	</Switch>
>----------------------注册二级路由 :Home组件-----------------------------------
>   <div>
>		<ul className="nav nav-tabs">
>			<li>
>				<MyNavLink to="/home/news">News</MyNavLink>
>			</li>
>			<li>
>				<MyNavLink to="/home/message">Message</MyNavLink>
>			</li>
>		</ul>
>		{/* 注册路由 */}
>		<Switch>
>			<Route path="/home/news" component={News}/>
>			<Route path="/home/message" component={Message}/>
>			<Redirect to="/home/news"/>
>		</Switch>
>	</div>
>```

## 10、向路由组件传递参数

### Ⅰ-params参数

>1. 路由链接(携带参数)：
>
>   ```
>   <Link to='/demo/test/tom/18'}>详情</Link>
>   ```
>
>   
>
>2. 注册路由(声明接收)：
>
>   ```
>   <Route path="/demo/test/:name/:age" component={Test}/>
>   ```
>
>   
>
>3. 接收参数：this.props.match.params
>
>```jsx
>	-------------------------------发送参数:父组件----------------------------------------------
>	<div>
>      {/* 向路由组件传递params参数 */}
>      <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
>      <hr />
>      {/* 声明接收params参数 */}
>      <Route path="/home/message/detail/:id/:title" component={Detail} />
> </div>
>	--------------------------------接受参数:子组件-----------------------------------------------------------
>   const {id,title} = this.props.match.params
>```

### Ⅱ-search参数

>1. 路由链接(携带参数)：
>
>   ```
>   <Link to='/demo/test?name=tom&age=18'}>详情</Link>
>   ```
>
>   
>
>2. 注册路由(`无需声明`，正常注册即可)：
>
>   ```
>   <Route path="/demo/test" component={Test}/>
>   ```
>
>   
>
>3. 接收参数：this.props.location.search
>
>4. 备注：获取到的search是`urlencoded编码字符串`，需要`借助querystring解析`
>
>```jsx
>	-------------------------------发送参数:父组件----------------------------------------------
>	<div>
>     	{/* 向路由组件传递search参数 */}
>		<Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
>      <hr />
>    	{/* search参数无需声明接收，正常注册路由即可 */}
>		<Route path="/home/message/detail" component={Detail}/>
> </div>
>	--------------------------------接受参数:子组件-----------------------------------------------------------
>   import qs from 'querystring'
>	// 接收search参数
>	const {search} = this.props.location
>	const {id,title} = qs.parse(search.slice(1))
>```

### Ⅲ-state参数

>1. 路由链接(携带参数)：
>
>   ```
>   <Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
>   ```
>
>   
>
>2. 注册路由(无需声明，正常注册即可)：
>
>   ```
>   <Route path="/demo/test" component={Test}/>
>   ```
>
>   
>
>3. 接收参数：this.props.location.state
>
> - 备注：使用`BrowserRouter`刷新才可以`保留住参数`,使用`HashRouter`刷新后state将会没有`history`来保存参数
> - 子组件接受参数时`const {id,title} = this.props.location.state || {}` ,后面添加`||{}`是防止使用`HashRouter`后state为undefined时报错
>
>```jsx
>	-------------------------------发送参数:父组件----------------------------------------------
>	<div>
>     	{/* 向路由组件传递state参数 */}
>		<Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
>
>      <hr />
>    	{/* state参数无需声明接收，正常注册路由即可 */}
>		<Route path="/home/message/detail" component={Detail}/>
> </div>
>	--------------------------------接受参数:子组件-----------------------------------------------------------
>   // 接收state参数,后面添加`||{}`是防止使用`HashRouter`后state为undefined时报错
>	const {id,title} = this.props.location.state || {}
>```

## 11、编程式路由导航

> `借助this.prosp.history对象上的API对`操作路由跳转、前进、后退  
>
> 1. -this.prosp.history.push()
>
>   将历史记录压入栈
>
> 2. -this.props.history.replace()
>
>   替代栈位置,即不会产生历史记录
>
> 3. -this.props.history.goBack()
>
>   回退一格
>
> 4. -this.props.history.goForward()
>
>   前进一格
>
> 5. -this.props.history.go()
>
>   前进或者后退n格(根据传入的数字正负数)
>
> ```jsx
> import React, { Component } from 'react'
> import { Link, Route } from 'react-router-dom'
> import Detail from './Detail'
> 
> export default class Message extends Component {
>  state = {
>    messageArr: [
>      { id: '01', title: '消息1' },
>      { id: '02', title: '消息2' },
>      { id: '03', title: '消息3' },
>    ]
>  }
> 
>  replaceShow = (id, title) => {
>    //replace跳转+携带params参数
>    //this.props.history.replace(`/home/message/detail/${id}/${title}`)
> 
>    //replace跳转+携带search参数
>    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
> 
>    //replace跳转+携带state参数
>    this.props.history.replace(`/home/message/detail`, { id, title })
>  }
> 
>  pushShow = (id, title) => {
>    //push跳转+携带params参数
>    // this.props.history.push(`/home/message/detail/${id}/${title}`)
> 
>    //push跳转+携带search参数
>    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
> 
>    //push跳转+携带state参数
>    this.props.history.push(`/home/message/detail`, { id, title })
> 
>  }
> 
>  back = () => {
>    this.props.history.goBack()
>  }
> 
>  forward = () => {
>    this.props.history.goForward()
>  }
> 
>  go = () => {
>    this.props.history.go(-2)
>  }
> 
>  render() {
>    const { messageArr } = this.state
>    return (
>      <div>
>        <ul>
>          {
>            messageArr.map((msgObj) => {
>              return (
>                <li key={msgObj.id}>
> 
>                  {/* 向路由组件传递params参数 */}
>                  {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}
> 
>                  {/* 向路由组件传递search参数 */}
>                  {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}
> 
>                  {/* 向路由组件传递state参数 */}
>                  <Link to={{ pathname: '/home/message/detail', state: { id: msgObj.id, title: msgObj.title } }}>{msgObj.title}</Link>
> 			&nbsp;<button onClick={() => this.pushShow(msgObj.id, msgObj.title)}>push查看</button>
> 			&nbsp;<button onClick={() => this.replaceShow(msgObj.id, msgObj.title)}>replace查看</button>
>                </li>
>              )
>            })
>          }
>        </ul>
>        <hr />
>        {/* 声明接收params参数 */}
>        {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}
> 
>        {/* search参数无需声明接收，正常注册路由即可 */}
>        {/* <Route path="/home/message/detail" component={Detail}/> */}
> 
>        {/* state参数无需声明接收，正常注册路由即可 */}
>        <Route path="/home/message/detail" component={Detail} />
> 
>        <button onClick={this.back}>回退</button>&nbsp;
>        <button onClick={this.forward}>前进</button>&nbsp;
>        <button onClick={this.go}>go</button>
>      </div>
>    )
>  }
> }
> ```

## 12、withRouter的使用

>1. withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
>2. withRouter的返回值是一个新组件
>
>```jsx
>import React, { Component } from 'react'
>import { withRouter } from 'react-router-dom'
>class Header extends Component {
> back = () => { this.props.history.goBack()}
> forward = () => {this.props.history.goForward()}
> go = () => { this.props.history.go(-2)}
> render() {
>   console.log('Header组件收到的props是', this.props);
>   return (
>     <div className="page-header">
>       <h2>React Router Demo</h2>
>       <button onClick={this.back}>回退</button>&nbsp;
>       <button onClick={this.forward}>前进</button>&nbsp;
>       <button onClick={this.go}>go</button>
>     </div>
>   )
> }
>}
>export default withRouter(Header)
>```

## 13、BrowserRouter与HashRouter的区别

> 备注：HashRouter可以用于解决一些路径错误相关的问题。即在`问题6`中引入文件时可以不进行路径修改

### Ⅰ-底层原理不一样：

>1. BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
>
>  `但一般来说都用的这个`
>
>2. HashRouter使用的是URL的哈希值。

### Ⅱ-path表现形式不一样

>1. BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
>
>2. HashRouter的路径包含#,例如：localhost:3000/#/demo/test

### Ⅲ-刷新后对路由state参数的影响

>1. BrowserRouter没有任何影响，因为state保存在history对象中。
>
>2. HashRouter`刷新后会导致路由state参数的丢失！！！`