

# Web存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以 *document.cookie* 来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出新的解决方案 – `**loca**lstorage` 和 `sessionStorage`，IE8 以上的 IE 版本支持这两个属性。

### 介绍

#### **loca**lStorage

此属性允许我们访问一个对应当前源的 ***loca**l Storage* 对象。

- 除非用户人为清除， 否则存储的数据将被长期保留。
- 打开多个相同的 URL 的 Tabs 页面，会使用相同的 ***loca**lStorage*。

#### sessionStorage

此属性允许我们访问一个对应当前源的 *session Storage* 对象。

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的 *sessionStorage*。
- 关闭对应浏览器窗口或标签页，会清除对应的 *sessionStorage*。

### 使用

两个存储对象都提供相同的方法和属性：

- `setItem(key, value)` —— 存储键/值对。
- `getItem(key)` —— 按照键获取值。
- `removeItem(key)` —— 删除键及其对应的值。
- `clear()` —— 删除所有数据。
- `key(index)` —— 获取该索引下的键名。
- `length` —— 存储的内容的长度。

示例：

```js
sessionStorage.setItem("name", "sessionStorage");
localStorage.setItem("name", "localStorage");
```

你可以通过打开页面的开发者人员工具（F12），然后找到 Application 选项，通过左侧的 Storage 栏点击对应的存储，然后查看存储到内部的值。



### 二者差异

#### 相同点

- 设置、读取操作方便
- 都有同源策略限制，跨域无法访问
- 容量较大，`sessionStorage` 约5M、`**loca**lStorage` 约20M 不同的浏览器大小可能有差异
- 均只能存储字符串类型的数据
- 如果存储内容多的话会消耗内存空间，会导致页面变卡

#### 不同点

1. 生命周期
   - *sessionStorage*：存储的数据在当前标签页或浏览器被关闭时会清空
   - ***loca**lStorage*：存储的数据除非用户手动删除，否则是一直存在的
2. 共享区间
   - *sessionStorage*：仅在当前标签页内共享，即当前页面和它内部的窗口共享存储的数据
   - ***loca**lStorage*：在同一浏览器下所有同源页面共享它存储的数据。如果我们在一个标签页面中更改了存储数据，则在另一个同源的标签页中也可以看到存储数据变化

**Tips**：也可以通过类似于对象的形式访问这两个对象存储的内容，当然这种做法是不被推荐的。

```js
localStorage.way = "通过类对象的形式存值";
console.log(localStorage.getItem("way")); // "通过类对象的形式存值"

localStorage.setItem("get", "通过类对象的形式取值");
console.log(localStorage.get); // "通过类对象的形式取值"
```

### 获取所有存储内容

通过 *length* 属性可以得知存储的数量，通过 *key* 方法可以根据下标获取存储的键名，然后再通过键名获取对应值，我们就可以得知全部存储的内容

```js
for(var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);
}
```

### 对于引用类型的存储

被存储的键值对总是以 UTF-16 DOMString 的格式所存储，其使用两个字节来表示一个字符。对于非字符串类型值，则会自动转换成字符串形式进行存储。

例如：

```js
localStorage.setItem("arr", [1,2,3,4]);
localStorage.setItem("obj", { name: "object" });

console.log(localStorage.getItem("arr")); // 1,2,3,4
console.log(localStorage.getItem("obj")); // [object Object]
```

因此，如果我们需要存储数组或者对象类型的值，且希望它们可以在取出的时候保持原样，需要借助 JSON 这种数据格式进行转换。

JSON 本身就是对象类型的字符串表示形式，因此在存入数组或对象时，通过 `JSON.stringify()` 方法将其转换回字符串，在取出的时候通过 `JSON.parse()` 方法再将其转化回来，我们就可以得到原来的数据了。

```js
localStorage.setItem("arr", JSON.stringify([1,2,3,4]));
localStorage.setItem("obj", JSON.stringify({ name: "object" }));

console.log(JSON.parse(localStorage.getItem("arr"))); // [1, 2, 3, 4]
console.log(JSON.parse(localStorage.getItem("obj"))); // {name: "object"}
```

### 补充：不提倡的使用方式

我们可以直接使用 `**loca**lStorage / sessionStorage` 对象直接获取/设置属性，效果等同于 `getItem / setItem` 方法：

```javascript
localStorage.play = "basketball";
// 可以在页面中打开控制台，会发现本地存储中多了一项 play
console.log(localStorage.play); // 可以直接获取存储的内容
```