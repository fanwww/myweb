# Vue 组件相关知识

```javascript
<style scope></style> //style标签中加入scope可使样式在局部生效
```

##### 向外传出组件

```javascript
export default {
    new Vue{
    el:"id", //该Vue实例挂载范围
    data:{"该处写该Vue实例中用到的参数"},
    components{"该处写该组件中传入其他组件名字"}
    ...

//el
data
methods
computed
fitlters
components
这些使Vue实例中可写的选项
}
}
```

##### 引入组件

```javascript
inport name 'url';  //name为给当前组件的名字
```
