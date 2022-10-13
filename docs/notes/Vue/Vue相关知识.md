# Vue相关知识

所有不是Vue所控制的回调写成箭头函数,因为箭头函数本身没有this,会想上找vm(Vue实例)

v-text  设置标签文本内容  相当于jQuery的.text      v-html 设置标签内部的内容(可解析标签)  相当于jQuery的.html

v-cloak  当Vue加载完毕后标签中的v-cloak指令会消失,(常用于在Vue为加载完成前部分为渲染内容不展示)

v-once   存在改指令的节点在页面加载初次动态渲染后就会使视为静态内容(常用于一些静态内容的性能优化)

#### 数据绑定

v-bind 简写 : 单向数据绑定

v-model 双向数据绑定

数据绑定的结果处理 

.trim 清除前后空格   .munber 转换为数字  .lazy 并不是实时改变，⽽是在失去焦点或者按回车时才会更新

vue 绑定Class :Class = ""  字符串写法  数组写法  对象写法

对象属性追加数据代理

Vue.set("obj","key'',"value")

vm.$set("obj","key'',"value")

v-on 简写@ 事件监听

v--show 控制元素出现和隐藏 为true出现 为false隐藏

#### 事件修饰符

.prevent   阻止默认事件(常用)

.stop  阻止事件冒泡(常用)

.once  事件只触发一次(常用)

.capture  事件在捕获阶段触发

.self  只有event.target是当前操作的元素时才触发事件

.passive  时间的默认行为立即执行,无需等待事件回调执行完毕