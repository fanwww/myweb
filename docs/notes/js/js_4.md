# 三、面向对象高级

>此部分要求你对前方[函数高级部分的1、原型与原型链](#1、原型与原型链)比较熟悉,如果掌握不够好理解会相对困难

## 1、对象创建模式

### Ⅰ-Object构造函数模式

>方式一: Object构造函数模式
>
> * 套路: 先创建空Object对象, 再动态添加属性/方法
> * 适用场景: 起始时不确定对象内部数据
> * 问题: 语句太多
>
>```js
>/*一个人: name:"Tom", age: 12*/
>// 先创建空Object对象
> var p = new Object()
> p = {} //此时内部数据是不确定的
> // 再动态添加属性/方法
> p.name = 'Tom'
> p.age = 12
> p.setName = function (name) {
>   this.name = name
> }
>
> //测试
> console.log(p.name, p.age)
> p.setName('Bob')
> console.log(p.name, p.age)
>```

### Ⅱ-对象字面量模式

>方式二: 对象字面量模式
>
> * 套路: 使用{}创建对象, 同时指定属性/方法
> * 适用场景: 起始时对象内部数据是确定的
> * 问题: 如果创建多个对象, 有重复代码
>
>```js
>//对象字面量模式
>var p = {
>   name: 'Tom',
>   age: 12,
>   setName: function (name) {
>     this.name = name
>   }
> }
> //测试
> console.log(p.name, p.age)
> p.setName('JACK')
> console.log(p.name, p.age)
>
> var p2 = {  //如果创建多个对象代码很重复
>   name: 'Bob',
>   age: 13,
>   setName: function (name) {
>     this.name = name
>   }
> }
>```

### Ⅲ-工厂模式

>方式三: 工厂模式
>
> * 套路: 通过工厂函数动态创建对象并返回
> * 适用场景: 需要创建多个对象
> * 问题: `对象没有一个具体的类型`, 都是Object类型
>
>```js
>//返回一个对象的函数===>工厂函数
>function createPerson(name, age) { 
> var obj = {
>   name: name,
>   age: age,
>   setName: function (name) {
>     this.name = name
>   }
> }
> return obj
>}
>
>// 创建2个人
>var p1 = createPerson('Tom', 12)
>var p2 = createPerson('Bob', 13)
>
>// p1/p2是Object类型
>
>function createStudent(name, price) {
> var obj = {
>   name: name,
>   price: price
> }
> return obj
>}
>var s = createStudent('张三', 12000)
>// s也是Object
>```

### Ⅳ-自定义构造函数模式

>方式四: 自定义构造函数模式
>
> * 套路: 自定义构造函数, 通过new创建对象
> * 适用场景: 需要创建多个`类型确定`的对象,与上方工厂模式有所对比
> * 问题: 每个对象都有相同的数据, 浪费内存
>
>```js
>//定义类型
>function Person(name, age) {
> this.name = name
> this.age = age
> this.setName = function (name) {
>   this.name = name
> }
>}
>var p1 = new Person('Tom', 12)
>p1.setName('Jack')
>console.log(p1.name, p1.age)
>console.log(p1 instanceof Person)
>
>function Student (name, price) {
> this.name = name
> this.price = price
>}
>var s = new Student('Bob', 13000)
>console.log(s instanceof Student)
>
>var p2 = new Person('JACK', 23)
>console.log(p1, p2)
>```

### Ⅴ-构造函数+原型的组合模式

>方式六: 构造函数+原型的组合模式-->`最好用这个写法`
>
> * 套路: 自定义构造函数, 属性在函数中初始化, 方法添加到原型上
> * 适用场景: 需要`创建多个类型确定`的对象
> * 放在原型上可以节省空间(只需要加载一遍方法)
>
>```js
>//在构造函数中只初始化一般函数
>function Person(name, age) { 
> this.name = name
> this.age = age
>}
>Person.prototype.setName = function (name) {
> this.name = name
>}
>
>var p1 = new Person('Tom', 23)
>var p2 = new Person('Jack', 24)
>console.log(p1, p2)
>```

## 2、继承模式

### Ⅰ-原型链继承

>方式1: 原型链继承
>
>     1. 套路
>        - 定义父类型构造函数
>        - 给父类型的原型添加方法
>        - 定义子类型的构造函数
>        - 创建父类型的对象赋值给子类型的原型
>        - `将子类型原型的构造属性设置为子类型`-->此处有疑惑的可以看本笔记[函数高级部分的1、原型与原型链](#1、原型与原型链)
>        - 给子类型原型添加方法
>        - 创建子类型的对象: 可以调用父类型的方法
>     2. 关键
>        - `子类型的原型为父类型的一个实例对象`
>
>```js
>//父类型
>function Supper() {
>this.supProp = '父亲的原型链'
>}
>//给父类型的原型上增加一个[showSupperProp]方法,打印自身subProp
>Supper.prototype.showSupperProp = function () {
>console.log(this.supProp)
>}
>
>//子类型
>function Sub() {
>this.subProp = '儿子的原型链'
>}
>
>// 子类型的原型为父类型的一个实例对象
>Sub.prototype = new Supper()
>// 让子类型的原型的constructor指向子类型
>// 如果不加,其构造函数找的[`new Supper()`]时从顶层Object继承来的构造函数,指向[`Supper()`]
>Sub.prototype.constructor = Sub
>//给子类型的原型上增加一个[showSubProp]方法,打印自身subProp
>Sub.prototype.showSubProp = function () {
>console.log(this.subProp)
>}
>
>var sub = new Sub()
>
>sub.showSupperProp() //父亲的原型链
>sub.showSubProp() //儿子的原型链
>console.log(sub)  
>/**
>Sub {subProp: "儿子的原型链"}
>subProp: "儿子的原型链"
>__proto__: Supper
>constructor: ƒ Sub()
>showSubProp: ƒ ()
>supProp: "父亲的原型链"
>__proto__: Object
>*/
>```

#### ① 示例图

>`注意`:此图中没有体现[`constructor构造函数 `],会在下方构造函数补充处指出
>
>![image-20210728101320606](./images/image-20210728101320606.png)

#### ② 构造函数补充

>对于代码中[`Sub.prototype.constructor = Sub`]是否有疑惑?
>
>如果不加,其构造函数找的[`new Supper()`]是从顶层Object继承来的构造函数,指向[`Supper()`],虽然如果你不加这句话,大体上使用是不受影响的,但是你有一个属性指向是错误的,如果在大型项目中万一万一哪里再调用到了呢?
>
>1. 这里可以补充一下constructor 的概念：
>
>  - `constructor 我们称为构造函数，因为它指回构造函数本身`
>  - 其作用是让某个构造函数产生的 所有实例对象（比如f） 能够找到他的构造函数（比如Fun），用法就是f.constructor
>
>2. 此时实例对象里没有constructor 这个属性，于是沿着原型链往上找到Fun.prototype 里的constructor，并指向Fun 函数本身
>
>  - constructor本就存在于原型中,指向构造函数,成为子对象后，如果该原型链中的constructor在自身没有而是在父原型中找到,所以指向父类的构造函数
>
>3. 由于这里的继承是直接改了构造函数的prototype 的指向，所以在 sub的原型链中，Sub.prototype 没有constructor 属性，反而是看到了一个super 实例
>4. 这就让sub 实例的constructor 无法使用了。为了他还能用，就在那个super 实例中手动加了一个constructor 属性，且指向Sub 函数看到了一个super 实例

### Ⅱ-借用构造函数继承(假的)

>方式2: 借用构造函数继承(假的)
>
>1. 套路:
>   - 定义父类型构造函数
>   - 定义子类型构造函数
>   - 在子类型构造函数中调用父类型构造
>2. 关键:
>   - `在子类型构造函数中通用call()调用父类型构造函数`
>3. 作用:
>
>  - 能借用父类中的构造方法,但是不灵活
>
>```js
>function Person(name, age) {
> this.name = name
> this.age = age
>}
>function Student(name, age, price) {
>  //此处利用call(),将 [Student]的this传递给Person构造函数
> Person.call(this, name, age)  // 相当于: this.Person(name, age)
> /*this.name = name
> this.age = age*/
> this.price = price
>}
>
>var s = new Student('Tom', 20, 14000)
>console.log(s.name, s.age, s.price)
>```
>
>[`Person`]中的this是动态变化的,在[`Student`]中利用[`Person.call(this, name, age)`]改变了其this指向,所以可以实现此效果

### Ⅲ-组合继承

>方式3: 原型链+借用构造函数的组合继承
>
>1. 利用原型链实现对父类型对象的方法继承
>2. 利用super()借用父类型构建函数初始化相同属性
>
>```js
>function Person(name, age) {
> this.name = name
> this.age = age
>}
>Person.prototype.setName = function (name) {
> this.name = name
>}
>
>function Student(name, age, price) {
> Person.call(this, name, age)  // 为了得到属性
> this.price = price
>}
>Student.prototype = new Person() // 为了能看到父类型的方法
>Student.prototype.constructor = Student //修正constructor属性
>Student.prototype.setPrice = function (price) {
> this.price = price
>}
>
>var s = new Student('Tom', 24, 15000)
>s.setName('Bob')
>s.setPrice(16000)
>console.log(s.name, s.age, s.price)
>```

# 三、线程机制与事件机制

## 1、进程与线程

> ![image-20210728115630974](./images/image-20210728115630974.png)  

### Ⅰ- 进程

>1. 程序的一次执行,它`占有一片独有的内存空间`
>2. 可以通过windows任务管理器查看进程
>
>  - 可以看出每个程序的内存空间是相互独立的
>  - <img src="./images/image-20210728115541255.png" alt="image-20210728115541255" style="zoom:80%;" /> 

### Ⅱ-线程

>概念:
>
>- 是进程内的一个独立执行单元
>- 是程序执行的一个完整流程
>- 是CPU的最小的调度单元

### Ⅲ-进程与线程

>1. 应用程序必须运行在某个进程的某个线程上
>2. 一个进程中至少有一个运行的线程:主线程                 -->进程启动后自动创建
>3. 一个进程中也可以同时运行多个线程:此时我们会说这个程序是多线程运行的
>4. 多个进程之间的数据是不能直接共享的                    -->内存相互独立(隔离)
>5. `线程池(thread pool)`:保存多个线程对象的容器,实现线程对象的反复利用

### Ⅳ-引出的问题

#### ① 何为多进程与多线程?

>多进程运行: 一应用程序可以同时启动多个实例运行
>
>多线程: 在一个进程内, 同时有多个线程运行

#### ②比较单线程与多线程?

>多线程:
>
>- 优点:能有效提升CPU的利用率
>- 缺点
> - 创建多线程开销
> - 线程间切换开销
> - 死锁与状态同步问题
>
>单线程:
>
>* 优点:顺序编程简单易懂
>* 缺点:效率低

#### ③ JS是单线程还是多线程?

>`JS是单线程运行的 , 但使用H5中的 Web Workers可以多线程运行`
>
>* 只能由一个线程去操作DOM界面
>* 具体原因可看下方[3、JS是单线程的](#3、JS是单线程的)部分给出的详解

#### ④ 浏览器运行是单线程还是多线程?

>都是多线程运行的

#### ⑤ 浏览器运行是单进程还是多进程?

>有的是单进程:
>
>* firefox
>* 老版IE
>
>有的是多进程:
>
>* chrome
>* 新版IE
>
>如何查看浏览器是否是多进程运行的呢? 任务管理器-->进程

## 2、浏览器内核

>支撑浏览器运行的最核心的程序

### Ⅰ-不同浏览器的内核

>- Chrome, Safari : webkit
>- firefox : Gecko
>- IE	: Trident
>- 360,搜狗等国内浏览器: Trident + webkit

### Ⅱ-内核由什么模块组成?

>主线程
>
>1. js引擎模块 : 负责js程序的编译与运行
>2. html,css文档解析模块 : 负责页面文本的解析(拆解)
>3. dom/css模块 : 负责dom/css在内存中的相关处理
>4. 布局和渲染模块 : 负责页面的布局和效果的绘制
>5. 布局和渲染模块 : 负责页面的布局和效果的绘制
>
>分线程
>
>- 定时器模块 : 负责定时器的管理
>- 网络请求模块 : 负责服务器请求(常规/Ajax)
>- 事件响应模块 : 负责事件的管理
>
>图例
>
>![image-20210728141032723](./images/image-20210728141032723.png)

## 3、定时器引发的思考

>```js
><body>
><button id="btn">启动定时器</button>
><script type="text/javascript">
>document.getElementById('btn').onclick = function () {
>var start = Date.now()
>console.log('启动定时器前...')
>setTimeout(function () {
> console.log('定时器执行了', Date.now()-start) //定时器并不能保证真正定时执行,一般会延迟一丁点
>}, 200)
>console.log('启动定时器后...')
>// 做一个长时间的工作
>for (var i = 0; i < 1000000000; i++) { //会造成定时器延长很长时间
>   ...
>}
>}
></script>
></body>
>```

### Ⅰ-定时器真是定时执行的吗?

>* 定时器并不能保证真正定时执行
>* 一般会延迟一丁点(可以接受), 也有可能延迟很长时间(不能接受)

### Ⅱ-定时器回调函数是在分线程执行的吗?

>在主线程执行的, JS是单线程的

### Ⅲ-定时器是如何实现的?

> `事件循环模型`,在下方给出详解

## 3、JS是单线程的

### Ⅰ-如何证明JS执行是单线程的

>* `setTimeout()的回调函数是在主线程执行的`
>* 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行
>
>```js
>// 如何证明JS执行是单线程的
>setTimeout(function () { //4. 在将[timeout 1111]弹窗关闭后,再等一秒 执行此处
>   console.log('timeout 2222')
>   alert('22222222')
> }, 2000)
> setTimeout(function () { //3. 过了一秒后 打印 timeout 1111并弹窗,此处如果不将弹窗关闭,不会继续执行上方222
>   console.log('timeout 1111')
>   alert('1111111')
> }, 1000)
> setTimeout(function () { //2. 然后打印timeout() 00000
>   console.log('timeout() 00000')
> }, 0)
> function fn() { //1. fn()
>   console.log('fn()')
> }
> fn()
>//----------------------
> console.log('alert()之前')
> alert('------') //暂停当前主线程的执行, 同时暂停计时, 点击确定后, 恢复程序执行和计时
> console.log('alert()之后')
>```
>
>流程结果:
>
>1. 先打印了[`fn()`],然后马上就打印了[`timeout() 00000`]
>2. 过了一秒后 打印 timeout 1111并弹窗,此处如果不将弹窗关闭,不会继续执行上方222
>3. 在将[timeout 1111]弹窗关闭后,`再等一秒` 执行此处
>
>  - 问:为何明明写的是2秒,却关闭上一个弹窗再过一秒就执行?
>  - 解:并不是关闭后再计算的,而是一起计算的,alert只是暂停了主线程执行

### Ⅱ-JS引擎执行代码的基本流程与代码分类

>代码分类:
>
>- 初始化代码
>- 回调代码
>
>js引擎执行代码的基本流程
>
>1. 先执行初始化代码: 包含一些特别的代码   回调函数(异步执行)
>
> * 设置定时器
> * 绑定事件监听
> * 发送ajax请求
>
>2. 后面在某个时刻才会执行回调代码

### Ⅲ-为什么js要用单线程模式, 而不用多线程模式?

>  1. JavaScript的单线程，与它的用途有关。
>  2. 作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
>  3. 这决定了它只能是单线程，否则会带来很复杂的同步问题
>     * 举个栗子:如果我们要实现更新页面上一个dom节点然后删除,用单线程是没问题的
>     * 但是如果多线程,当我删除线程先删除了dom节点,更新线程要去更新的时候就会出错

## 4、事件循环模型(Event Loop)机制

### Ⅰ-概念引出

>我们都知道，`javascript从诞生之日起就是一门单线程的非阻塞的脚本语言`。这是由其最初的用途来决定的：`与浏览器交互`。
>
>单线程意味着，javascript代码在执行的任何时候，都只有一个主线程来处理所有的任务。
>
>`非阻塞`:
>
>>而非阻塞则是当代码需要进行一项异步任务（无法立刻返回结果，需要花一定时间才能返回的任务，如I/O事件）的时候，主线程会挂起（pending）这个任务，然后在异步任务返回结果的时候再根据一定规则去执行相应的回调。
>
>`单线程是必要的`:
>
>>也是javascript这门语言的基石，原因之一在其最初也是最主要的执行环境——浏览器中，我们需要进行各种各样的dom操作。试想一下 如果javascript是多线程的，那么当两个线程同时对dom进行一项操作，例如一个向其添加事件，而另一个删除了这个dom，此时该如何处理呢？因此，为了保证不会 发生类似于这个例子中的情景，javascript选择只用一个主线程来执行代码，这样就保证了程序执行的一致性。
>
>当然，现如今人们也意识到，单线程在保证了执行顺序的同时也限制了javascript的效率，因此开发出了`web workers`技术。这项技术号称可以让javaScript成为一门多线程语言。
>
>>然而，使用web workers技术开的多线程有着诸多限制，例如：`所有新线程都受主线程的完全控制，不能独立执行`。这意味着这些“线程” 实际上应属于主线程的子线程。另外，这些子线程并没有执行I/O操作的权限，只能为主线程分担一些诸如计算等任务。所以严格来讲这些线程并没有完整的功能，也因此这项技术并非改变了javascript语言的单线程本质。
>
>可以预见，未来的javascript也会一直是一门单线程的语言。
>
>话说回来，前面提到javascript的另一个特点是“`非阻塞`”，那么javascript引擎到底是如何实现的这一点呢？
>
>>答案就是——event loop（事件循环）。
>
>**注：`虽然nodejs中的也存在与传统浏览器环境下的相似的事件循环。然而两者间却有着诸多不同，故把两者分开，单独解释`。**

### Ⅱ-浏览器环境下JS引擎的事件循环机制

#### ① 执行栈概念

>执行上下文栈详情可以看上方笔记 -->[函数高级的2、执行上下文与执行上下文栈](#2、执行上下文与执行上下文栈),此处继续进行一次概述加深理解
>
>当javascript代码执行的时候会将不同的变量存于内存中的不同位置：`堆（heap）`和`栈（stack）`中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 `但是我们这里说的执行栈和上面这个栈的意义却有些不同`。
>
>`执行栈`:
>
>> 当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫`执行上下文`。这个执行环境中存在着这个方法的私有作用域、上层作用域的指向、方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为执行栈。
>
>当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。`当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境`。这个过程反复进行，直到执行栈中的代码全部执行完毕。
>
>此处继续拿出栈图加深理解:<img src="./images/123.gif" style="zoom:80%;" /> 
>
>从图片可知，一个方法执行会向执行栈中加入这个方法的执行环境，在这个执行环境中还可以调用其他方法，甚至是自己，其结果不过是在执行栈中再添加一个执行环境。这个过程可以是无限进行下去的，`除非发生了栈溢出，即超过了所能使用内存的最大值`。
>
>以上的过程说的都是同步代码的执行。那么当一个异步代码（如发送ajax请求数据）执行后会如何呢？
>
>> 刚刚说过js的另一大特点是非阻塞，实现这一点的关键在于下面要说的这项机制——`事件队列（Task Queue）`。

#### ② 事件队列（Task Queue）

>JS引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务,当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为`事件队列`。
>
>> 被放入事件队列不会立刻执行其回调，而是`等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务`。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，`这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。`
>
>这里还有一张图来展示这个过程:<img src="./images/image-20210729163242840.png" alt="image-20210729163242840" style="zoom:67%;" />
>
>图中的stack表示我们所说的执行栈，web apis则是代表一些异步事件，而callback queue即事件队列。
>
>以上的事件循环过程是一个宏观的表述，实际上因为异步任务之间并不相同，因此他们的执行优先级也有区别。`不同的异步任务被分为两类：微任务（micro task）和宏任务（macro task）`,此部分看下方详解

### Ⅲ-宏任务(**macro task**)与微任务(**micro task**)

> 宏任务与微任务亦属于[Ⅱ-浏览器环境下JS引擎的事件循环机制](#Ⅱ-浏览器环境下JS引擎的事件循环机制)内知识点,但本人觉得比较重要,将其提高至其知识点

#### ① 宏任务队列与微任务队列解释

>顾名思义,宏任务放至宏任务队列(`简称宏队列`)中、微任务放至微任务队列(`简称微队列`)中
>
>1. JS中用来存储待执行回调函数的队列包含2个不同特定的列队
>
>  - `宏队列`:用来保存待执行的宏任务(回调),比如:`定时器`回调/ajax回调/dom事件回调
>  - `微队列`:用来保存待执行的微任务(回调),比如:`Promise`的回调/muntation回调
>
>2. JS执行时会区别这2个队列:
>   - JS执行引擎首先必须执行所有的`初始化同步任务`代码
>   - 每次准备取出第一个`宏任务执行前`,都要将所有的`微任务`一个一个取出来执行
>
>前面我们介绍过，在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。
>
>我们只需记住:** `当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行` **

#### ② 原理图

>![Promise系统学习_宏任务微任务原理图](./images/Promise.png) 



#### ③ 由代码逆向理解宏任务与微任务

> 代码示例
>
> ```js
> setTimeout(() => { 
>    console.log('timeout callback1（）')//立即放入宏队列
>    Promise.resolve(3).then(
>      value => { 
>        console.log('Promise onResolved3()', value)//当这个宏任务执行后 立马放入微队列,所以这个微任务执行完后下个宏任务才能执行 
>      }
>    )
>  }, 0)
> 
>  setTimeout(() => { 
>    console.log('timeout callback2（）') //立即放入宏队列,
>  }, 0)
> 
>  Promise.resolve(1).then(
>    value => { 
>      console.log('Promise onResolved1()', value)//立即放入微队列
>      setTimeout(() => {
>        console.log('timeout callback3（）', value) //立即放入宏任务
>      }, 0)
>    }
>  )
> 
>  Promise.resolve(2).then(
>    value => { 
>      console.log('Promise onResolved2()', value)//立即放入微队列
>    }
>  )
> console.log('同步代码') //同步代码立即执行
> ```
>
> 结果
>
> ```js
> '同步代码',
> 'Promise onResolved1()',
> 'Promise onResolved2()',
> 'timeout callback1（）',
> 'Promise onResolved3()',
> 'timeout callback2（）',
> 'timeout callback3（）'
> ```

### Ⅳ-**node环境下的事件循环机制**

>`不学node的小伙伴就跳过此部分直接去下一节Web Workers笔记吧`

#### ① **与浏览器环境有何不同?**

>在node中，事件循环表现出的状态与浏览器中大致相同。不同的是node中有一套自己的模型。node中事件循环的实现是依靠的libuv引擎。我们知道node选择chrome v8引擎作为js解释器，v8引擎将js代码分析后去调用对应的node api，而这些api最后则由libuv引擎驱动，执行对应的任务，并把不同的事件放在不同的队列中等待主线程执行。 `因此实际上node中的事件循环存在于libuv引擎中`。

#### ② **事件循环模型**

>下面是一个libuv引擎中的事件循环的模型:
>
>```js
>//libuv引擎中的事件循环的模型
>┌───────────────────────┐
>┌─>│        timers         │
>│  └──────────┬────────────┘
>│  ┌──────────┴────────────┐
>│  │     I/O callbacks     │
>│  └──────────┬────────────┘
>│  ┌──────────┴────────────┐
>│  │     idle, prepare     │
>│  └──────────┬────────────┘      ┌───────────────┐
>│  ┌──────────┴────────────┐      │   incoming:   │
>│  │         poll          │<──connections───     │
>│  └──────────┬────────────┘      │   data, etc.  │
>│  ┌──────────┴────────────┐      └───────────────┘
>│  │        check          │
>│  └──────────┬────────────┘
>│  ┌──────────┴────────────┐
>└──┤    close callbacks    │
>└───────────────────────┘
>```
>
>*注：模型中的每一个方块代表事件循环的一个阶段*
>
>这个模型是node官网上的一篇文章中给出的，我下面的解释也都来源于这篇文章。我会在文末把文章地址贴出来，有兴趣的朋友可以亲自与看看原文。

#### ③ **事件循环各阶段详解**

>从上面这个模型中，我们可以大致分析出node中的事件循环的顺序：
>
>> 外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...
>
>这些阶段大致的功能如下：
>
>- timers(定时器检测阶段): 这个阶段执行定时器队列中的回调如 `setTimeout()` 和 `setInterval()`。
>- I/O callbacks(I/O事件回调阶段): 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和`setImmediate()`的回调。
>- idle, prepare: 这个阶段仅在内部使用，可以不必理会。
>- poll(轮询阶段): 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
>- check(检查阶段): `setImmediate()`的回调会在这个阶段执行。
>- close callbacks(关闭事件回调阶段): 例如`socket.on('close', ...)`这种close事件的回调。
>
>下面我们来按照代码第一次进入libuv引擎后的顺序来详细解说这些阶段：

##### **poll(轮询阶段)**

>当个v8引擎将js代码解析后传入libuv引擎后，循环首先进入poll阶段。poll阶段的执行逻辑如下： 先查看poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调。 当queue为空时，会检查是否有setImmediate()的callback，如果有就进入check阶段执行这些callback。但同时也会检查是否有到期的timer，如果有，就把这些到期的timer的callback按照调用顺序放到timer queue中，之后循环会进入timer阶段执行queue中的 callback。 这两者的顺序是不固定的，收到代码运行的环境的影响。如果两者的queue都是空的，那么loop会在poll阶段停留，直到有一个i/o事件返回，循环会进入i/o callback阶段并立即执行这个事件的callback。
>
>值得注意的是，poll阶段在执行poll queue中的回调时实际上不会无限的执行下去。`有两种情况poll阶段会终止执行poll queue中的下一个回调：1.所有回调执行完毕。2.执行数超过了node的限制。`

##### check(检查阶段)

>check阶段专门用来执行`setImmediate()`方法的回调，当poll阶段进入空闲状态，并且setImmediate queue中有callback时，事件循环进入这个阶段。

##### close callbacks(关闭事件回调阶段)

>当一个socket连接或者一个handle被突然关闭时（例如调用了`socket.destroy()`方法），close事件会被发送到这个阶段执行回调。否则事件会用`process.nextTick（）`方法发送出去。

##### timers(定时器检测阶段)

>这个阶段以先进先出的方式执行所有到期的timer加入timer队列里的callback，一个timer callback指得是一个通过setTimeout或者setInterval函数设置的回调函数。

##### I/O callbacks(I/O事件回调阶段)

>如上文所言，这个阶段主要执行大部分I/O事件的回调，包括一些为操作系统执行的回调。例如一个TCP连接生错误时，系统需要执行回调来获得这个错误的报告。

#### ④ **process.nextTick,setTimeout与setImmediate的区别与使用场景**

>在node中有三个常用的用来推迟任务执行的方法：process.nextTick,setTimeout（setInterval与之相同）与setImmediate

这三者间存在着一些非常不同的区别：

##### **process.nextTick()**

>尽管没有提及，但是实际上node中存在着一个特殊的队列，即nextTick queue。这个队列中的回调执行虽然没有被表示为一个阶段，当时这些事件却会在每一个阶段执行完毕准备进入下一个阶段时优先执行。当事件循环准备进入下一个阶段之前，会先检查nextTick queue中是否有任务，如果有，那么会先清空这个队列。与执行poll queue中的任务不同的是，这个操作在队列清空前是不会停止的。这也就意味着，错误的使用`process.nextTick()`方法会导致node进入一个死循环。。直到内存泄漏。
>
>使用这个方法比较合适呢？下面有一个例子：
>
>```js
>const server = net.createServer(() => {}).listen(8080);
>server.on('listening', () => {});
>```
>
>这个例子中当，当listen方法被调用时，除非端口被占用，否则会立刻绑定在对应的端口上。这意味着此时这个端口可以立刻触发listening事件并执行其回调。然而，这时候`on('listening)`还没有将callback设置好，自然没有callback可以执行。为了避免出现这种情况，node会在listen事件中使用`process.nextTick()`方法，确保事件在回调函数绑定后被触发。

##### **setTimeout()和setImmediate()**

>在三个方法中，这两个方法最容易被弄混。实际上，某些情况下这两个方法的表现也非常相似。然而实际上，这两个方法的意义却大为不同。
>
>`setTimeout()`方法是定义一个回调，并且希望这个回调在我们所指定的时间间隔后第一时间去执行。注意这个“第一时间执行”，这意味着，受到操作系统和当前执行任务的诸多影响，该回调并不会在我们预期的时间间隔后精准的执行。执行的时间存在一定的延迟和误差，这是不可避免的。node会在可以执行timer回调的第一时间去执行你所设定的任务。
>
>`setImmediate()`方法从意义上将是立刻执行的意思，但是实际上它却是在一个固定的阶段才会执行回调，即poll阶段之后。有趣的是，这个名字的意义和之前提到过的`process.nextTick()`方法才是最匹配的。node的开发者们也清楚这两个方法的命名上存在一定的混淆，他们表示不会把这两个方法的名字调换过来---因为有大量的node程序使用着这两个方法，调换命名所带来的好处与它的影响相比不值一提。
>
>`setTimeout()`和不设置时间间隔的`setImmediate()`表现上及其相似。猜猜下面这段代码的结果是什么？
>
>```js
>setTimeout(() => {
>console.log('timeout');
>}, 0);
>
>setImmediate(() => {
>console.log('immediate');
>});
>```
>
>实际上，答案是不一定。没错，就连node的开发者都无法准确的判断这两者的顺序谁前谁后。这取决于这段代码的运行环境。运行环境中的各种复杂的情况会导致在同步队列里两个方法的顺序随机决定。但是，在一种情况下可以准确判断两个方法回调的执行顺序，那就是在一个I/O事件的回调中。下面这段代码的顺序永远是固定的：
>
>```js
>const fs = require('fs');
>
>fs.readFile(__filename, () => {
>setTimeout(() => {
>   console.log('timeout');
>}, 0);
>setImmediate(() => {
>   console.log('immediate');
>});
>});
>```
>
>答案永远是：
>
>```js
>immediate
>timeout
>```
>
>因为在I/O事件的回调中，setImmediate方法的回调永远在timer的回调前执行。

## 5、Web Workers

>想了解更多可以点击链接查看更多,此处只是大致了解学习   -->[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
>
>1. H5规范提供了js分线程的实现, 取名为: Web Workers
>2. 相关API
>
> * Worker: 构造函数, 加载分线程执行的js文件
> * Worker.prototype.onmessage: 用于接收另一个线程的回调函数
> * Worker.prototype.postMessage: 向另一个线程发送消息
>
>3. 不足
>
> * worker内代码不能操作DOM(更新UI)
> * 不能跨域加载JS
> * 不是每个浏览器都支持这个新特性

### Ⅰ-抛砖引玉,引出用处

>还是拿斐波那契（Fibonacci）数列来做例子,这东西效率低,可以拿来模拟
>
>```html
><body>
><input type="text" placeholder="数值" id="number">
><button id="btn">计算</button>
><script type="text/javascript">
>// 1 1 2 3 5 8    f(n) = f(n-1) + f(n-2)
>function fibonacci(n) {
>return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
>}
>// console.log(fibonacci(7))
>var input = document.getElementById('number')
>document.getElementById('btn').onclick = function () {
>var number = input.value
>var result = fibonacci(number)
>alert(result)
>}
></script>
>```
>
>当我运行此行代码,传入计算数值为50左右(有的甚至更低),整个页面就会卡住好久的时间不能操作(计算结束后才会弹窗,但是未弹窗的这段时间用户并不能进行操作),这时候就会发现单线程的弊端了

### Ⅱ-尝试使用

>1. H5规范提供了js分线程的实现, 取名为: Web Workers
>2. 相关API
>
> * Worker: 构造函数, 加载分线程执行的js文件
> * Worker.prototype.onmessage: 用于接收另一个线程的回调函数
> * Worker.prototype.postMessage: 向另一个线程发送消息
>
>3. 不足
>
> * worker内代码不能操作DOM(更新UI)
> * 不能跨域加载JS
> * 不是每个浏览器都支持这个新特性

#### ① 主线程

>1. 创建一个Worker对象
>2. 绑定[主线程接收分线程返回的数据]方法
>3. 主线程向分线程发送数据,然后等待接受数据
>4. 接收到分线程回馈的数据,将数据进行处理(如弹窗)
>
>```html
><body>
><input type="text" placeholder="数值" id="number">
><button id="btn">计算</button>
><script type="text/javascript">
> var input = document.getElementById('number')
> document.getElementById('btn').onclick = function () {
>   var number = input.value
>
>   //创建一个Worker对象
>   var worker = new Worker('worker.js')
>   // 绑定接收消息的监听
>   worker.onmessage = function (event) { //此处变成回调代码,会在初始化工作完成后才会进行
>     console.log('主线程接收分线程返回的数据: '+event.data)
>     alert(event.data)
>   }
>
>   // 向分线程发送消息
>   worker.postMessage(number)
>   console.log('主线程向分线程发送数据: '+number)
> }
> // console.log(this) // window
>
></script>
></body>
>```

#### ② 分线程

>将计算放置分线程中
>
>`注意`:alert(result)  alert是window的方法, 在分线程不能调用,`分线程中的全局对象不再是window`, 所以在分线程中不可能更新界面
>
>```js
>//worker.js
>function fibonacci(n) {
>return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
>}
>
>console.log(this)
>this.onmessage = function (event) {
>var number = event.data
>console.log('分线程接收到主线程发送的数据: '+number)
>//计算
>var result = fibonacci(number)
>postMessage(result)
>console.log('分线程向主线程返回数据: '+result)
>// alert(result)  alert是window的方法, 在分线程不能调用
>// 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
>}
>```

### Ⅲ-流程原理图

> ![image-20210729173545339](./images/image-20210729173545339.png)





