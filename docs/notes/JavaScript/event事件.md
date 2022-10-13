# event事件

**event.type**

返回事件类型 如:click move mouseout

**event.target**

返回触发事件的元素(触发元素通过冒泡到绑定元素也可触发事件)

**event.currentTarget**

返回绑定事件的元素

elemnent.closest(element-selector)

例如: var ele=event.target.closest("li") 获取触发事件元素最接近的li标签



根据事件冒泡机制和event.target可以进行事件委托.

事件委托好处: 1.减少DOM操作 2.后添加的元素也会触发事件

## 鼠标的按键信息



### 获取鼠标位置事件

pageX/pageY 获取事件触发时光标相对于页面的位置

clientX/clientY 获取事件触发时光标相对于可视区域的位置  (也可写为X/Y 不推荐)

offsetX/offsetY 获取事件触发时光标相对于触发事件元素的元素内区域的位置

screenX/screenY 获取事件触发时光标相对于显示器位置

**event.button**

0表示鼠标按下左键 1表示鼠标按下滚轮 2表示鼠标按下右键

**event.which**

1表示鼠标按下左键 2表示鼠标按下滚轮 3表示鼠标按下右键

**event.onwhell**

鼠标滚动事件

**event.oncontentmenu**

邮件出现菜单栏

## 键盘事件

**event.keydown 键盘按下事件**

**evwnt.keyup 键盘抬起事件**

**event.keyCode 获取案件ASCLL码**

**event.key 获取按键信息**

key 案件属性值

altKey 触发事件时alt键是否被按下

ctrlKey 触发事件时ctrl键是否被按下

shiftKey 触发事件时shift键是否被按下

## 事件阻止

阻止默认事件⭐⭐⭐

**preventDefault**

阻止事件冒泡⭐⭐⭐

**stoppropagation**

**cancelBubble = true**



