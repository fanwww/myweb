# Vue2 中$set相关

## 1、为什么要用set？

在vue2中，并不是任何时候数据都是双向绑定的。
在官方文档中，有这样一段话，如下：


从文档得知，当数据没有被双向绑定的时候，我们就需要使用set了

## 2、set用法

解决数据没有被双向绑定我们可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名。

```javascript
this.$set(原数组, 索引值, 需要赋的值)
```

  length的问题还需要用splice方法。

```javascript
vm.items.splice(newLength)
```

##   3、什么时候使用set？

> set为解决双向绑定失效而生，我们只需要关注什么时候双向绑定失效就可以了。

总结:只要值的地址没有改变，vue是检测不到数据变化的。

共有下面三种情况：

1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength
3. 由于 JavaScript 的限制，Vue不能检测对象属性的添加或删除

此处针对第三点做一些说明：

```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

从上面的代码我们可以知道vm.b不是响应式的，简单的来说，如果对象中原来没有这个key，新增的key是无法双向绑定的。

当然这里我们同样可以用set去解决这个问题：

```javascript
vm.$set(vm.userProfile, 'age', 27)
```

如果我们添加的属性很多条，可能就需要写一个循环来多次set。当然你也可能使用Object.assign，这里有一些需要注意的地方。

如果你想添加新的响应式属性，下面这样写是不行的。

```javascript
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

下面这样才是正确的。

```javascript
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

4、文档地址
https://cn.vuejs.org/v2/guide/list.html#logo