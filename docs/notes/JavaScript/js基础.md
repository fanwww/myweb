## 如何使用Math对象快速计算数组中的最大值或最小值

Math 对象下包含 min() 和 max() 方法 用于确定一组数值中的最大值和最小值。这两个方法都可以接收任意多个数值参数。

```
var max = Math.max(1,2,3,4,5,6);
console.log(max);   // 6

var min  = Math.min(1,2,3,4,5,6);
console.log(min);    // 1
```

而如果我们要取出[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)中的最大值或最小值,该怎么做呢?(以取出数组中的最大值为例)

先看代码

```
var testArr = [1,2,3,4,5,6];
var max = Math.max.apply(Math,testArr);
console.log(max);   // 6
```

这里用到了一个apply()方法,把Math对象作为apply()的第一个参数, 从而正确的设置this值,

而我们知道apply()的第二个参数必须是 类数组arguments 或者 数组, 所以就可以将我们需要操作的数组作为第二个参数了。



## 数组和字符串方法

### forEach

作用：用于遍历数组，对数组中的每一个元素进行某个操作。没有返回值，也不需要返回值。

`foreach` 像`for`循环一样，对数据进行遍历。

语法：

```js
arr.forEach(function(item, index, array) {
  // ... do something with item
  // item 表示当前数组元素
  // index 表示元素对应的索引
  // array 表示当前数组，这个不常用
});
```

而这段代码更详细地介绍了它们在目标数组中的位置：

```js
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(''+item+' is at index '+index+' in '+array+'');
});
```

### reverse

**翻转数组，返回翻转后后的数组**（会改变原来的数组）。

语法：

```js
var result =  数组.reverse();
```

举例：

```js
var arr = ["a", "b", "c", "d", "e", "f"];

var result = arr.reverse(); // 将数组 arr 进行反转

console.log("arr =" + arr); // ["f","e","d","c","b","a"]
console.log("result =" + result); // ["f", "e", "d", "c", "b", "a"]

// 从打印结果可以看出，原来的数组已经被改变了。
```

### slice

`slice()`：从数组中提取指定的一个或者多个元素，返回结果为**新的数组**（不会改变原来的数组）。

备注：该方法不会改变原数组，而是将截取到的元素封装到一个新数组中返回。

**语法**：

```javascript
var result = 原数组.slice(开始位置的索引, 结束位置的索引); //注意：包含开始索引，不包含结束索引
```

举例：

```javascript
var arr = ["a", "b", "c", "d", "e", "f"];

var result1 = arr.slice(2); //从下标为2值开始提取
var result2 = arr.slice(-2); //提取最后两个元素
var result3 = arr.slice(2, 4); //提取从下标为2到下标为4之间的值（不包括下标为4的值）
var result4 = arr.slice(4, 2); //空

console.log("arr:" + arr); // ["a", "b", "c", "d", "e", "f"]
console.log("result1:" + result1); // ["c", "d", "e", "f"]
console.log("result2:" + result2); // ["e", "f"]
console.log("result3:" + result3); // ["c", "d"]
console.log("result4:" + result4); // []
```

### indexOf 和 lastIndexOf

**获取元素在数组当中的索引**

**语法**：

```javascript
var idx = 数组.indexOf(value);

var idx = 数组.lastIndexOf(value);
```

**解释**：

- `indexOf(value)`：从前往后匹配，获取 value 在数组中第一次出现的索引位置。
- `lastIndexOf(value)` ：从后往前匹配，获取 value 在数组中第一次出现的索引位置。

**作用**：

利用这个方法，我们可以判断某个值是否在指定的数组中。**如果没找到则返回`-1`**。

```javascript
var arr = ["a", "b", "c", "d", "e", "d", "c"];

console.log(arr.indexOf("c")); //从前往后，找第一个"c"在哪个位置,2
console.log(arr.lastIndexOf("d")); //从后往前，找第一个"d"在哪个位置,5
```

### includes

**语法:**

```
arr.includes(item, from)
```

从索引 `from` 开始在数组中搜索 `item`，如果找到则返回 `true`（如果没找到，则返回 `false`）。

```javascript
var arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

> 请注意，这些方法使用的是严格相等 `===` 比较。

> 如果我们想检查是否包含某个元素，并且不想知道确切的索引，那么 `arr.includes` 是首选

### Array.isArray

数组是基于对象的，所以 `typeof` 不能帮助从数组中区分出普通对象：

```js
alert(typeof {}); // object
alert(typeof []); // object
```

但是数组经常被使用，因此有一种特殊的方法用于判断：`Array.isArray(value)`。如果 `value` 是一个数组，则返回 `true`；否则返回 `false`。

```js
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

### sort

> sort()方法要好好理解。所以，我们单独用一大段来讲。

**对数组的元素进行排序（会改变原来的数组）。**

#### sort()方法举例：无参时

如果在使用 sort() 方法时不带参，则默认按照字典序排序。

**举例 1**：（当数组中的元素为字符串时）

```javascript
var arr1 = ["e", "b", "d", "a", "f", "c"];

arr1.sort(); // 将数组 arr1 进行排序

console.log("arr1 =" + arr1);
```

打印结果：

```javascript
arr1 = ["a", "b", "c", "d", "e", "f"];
```

**举例 2**：（当数组中的元素为数字时）

```javascript
var arr2 = [5, 2, 11, 3, 4, 1];

arr2.sort(); // 将数组 arr2 进行排序

console.log("arr2 =" + arr2);
```

打印结果：

```javascript
arr2 = [1, 11, 2, 3, 4, 5]; // 其实是在对 ['5', '2', '11', '3', '4', '1']依据字典序排序
```

上方的打印结果中，你会发现，使用 `sort()` 排序后，数字`11`竟然在数字`2`的前面。这是为什么呢？

因为上面讲到了，`sort()`方法是按照字典序进行排序的。

#### sort()方法举例：带参时

想实现真正意义上的排序，需要我们为`sort`提供一个函数作为参数，指定排序规则。

回调函数中需要定义两个形参，浏览器将会分别使用数组中的元素作为实参去调用回调函数。

> 浏览器根据回调函数的返回值来决定元素的排序：（重要）

> - 如果返回一个大于 0 的值，则元素会交换位置

> - 如果返回一个小于 0 的值，则元素位置不变

> - 如果返回一个 0，则认为两个元素相等，则不交换位置

**代码举例**：

```javascript
var arr3 = [5, 2, 11, 3, 4, 1];

// 自定义排序规则
arr3.sort(function(a, b) {
    return a - b; // 升序排列
    // return b - a; // 降序排列
});

console.log("arr3 =" + arr3); // [1,2,3,4,5,11]
```

### 字符串对象的常用方法

**`charAt()`** 获取相应位置的字符
**`charCodeAt()`** 指定位置字符 的 Unicode 编码
**`indexOf()`** 返回字符在字符串中的位置
**`lastIndexOf()`**
**`concat()`** 连接字符串
**`slice()`** 提取字符串的某个部分
**`substr()`** 截取字符串
**`toUpperCase()`**
**`toLowerCase()`**



**字符串无法通过str[index]= abc;来修改对应索引的字符串**



## 用new调用函数的执行过程 

\* 1、自动创建一个空对象 

\* 2、把函数内部的this指向创建的这个对象 

\* 3、在函数执行完成以后自动返回创建的那个对象，即使函数里面没有return 



## 几种遍历方法

### map（数组方法）：

#### 特性：

1. map不改变原数组但是会 返回新数组
2. 可以使用break中断循环，可以使用return返回到外层函数

#### 实例：

```js
let newarr=arr.map(i=>{
return i+=1;
console.log(i);
})
console.log(arr)//1,3,4---不会改变原数组
console.log(newarr)//[2,4,5]---返回新数组
复制代码
```

### forEach（数组方法）：

#### 特性：

1. 便利的时候更加简洁，效率和for循环相同，不用关心集合下标的问题，减少了出错的概率。
2. 没有返回值
3. 不能使用break中断循环，不能使用return返回到外层函数

#### 实例：

```js
let newarr=arr.forEach(i=>{
 i+=1;
console.log(i);//2,4,5
})
console.log(arr)//[1,3,4]
console.log(newarr)//undefined
复制代码
```

#### 注意：

1. forEach() 对于空数组是不会执行回调函数的。
2. for可以用continue跳过循环中的一个迭代，forEach用continue会报错。
3. forEach() 需要用 return 跳过循环中的一个迭代，跳过之后会执行下一个迭代。

### for in(大部分用于对象)：

用于循环遍历数组或对象属性

#### 特性：

可以遍历数组的键名，遍历对象简洁方便 ###实例：

```js
   let person={name:"小白",age:28,city:"北京"}
   let text=""
   for (let i in person){
      text+=person[i]
   }
   输出结果为：小白28北京
//其次在尝试一些数组
   let arry=[1,2,3,4,5]
   for (let i in arry){
        console.log(arry[i])
    }
//能输出出来，证明也是可以的
复制代码
```

### for of（不能遍历对象）：

#### 特性：

1. （可遍历map，object,array,set string等）用来遍历数据，比如组中的值
2. 避免了for in的所有缺点，可以使用break,continue和return，不仅支持数组的遍历，还可以遍历类似数组的对象。

```js
   let arr=["nick","freddy","mike","james"];
    for (let item of arr){
        console.log(item)
    }
//暑促结果为nice freddy mike james
//遍历对象
   let person={name:"老王",age:23,city:"唐山"}
   for (let item of person){
        console.log(item)
    }
//我们发现它是不可以的
//但是它和forEach有个解决方法，结尾介绍

复制代码
```

### 总结：

- forEach 遍历列表值,不能使用 break 语句或使用 return 语句
- for in 遍历对象键值(key),或者数组下标,不推荐循环一个数组
- for of 遍历列表值,允许遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等.在 ES6 中引入的 for of 循环，以替代 for in 和 forEach() ，并支持新的迭代协议。
- for in循环出的是key，for of循环出的是value；
- for of是ES6新引入的特性。修复了ES5的for in的不足；
- for of不能循环普通的对象，需要通过和Object.keys()搭配使用。