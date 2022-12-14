# Form表单

## 表单type类型

`type="button"`
定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。

`type="checkbox"`
定义复选框。

`type="file"`
定义输入字段和 "浏览"按钮，供文件上传。

`type="hidden"`
定义隐藏的输入字段。

`type="image"`
定义图像形式的提交按钮。

`type="password"`
定义密码字段。该字段中的字符被掩码。

`type="radio"`
定义单选按钮。

`type="reset"`
定义重置按钮。重置按钮会清除表单中的所有数据。

`type="submit"`
定义提交按钮。提交按钮会把表单数据发送到服务器。

`type="text"`
定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。

---

**`<label>`标签**

label是input的描述，它本身不会有特殊效果，但它和input标签配合使用可以提升用户的使用体验，让用户点击`label`标签时，就像点击了这个输入框。

**通过label的for指向按钮的id来绑定，for和id属性的值要相同**

```html
<form>
    <label for="male">Male</label>
    <input type="radio" name="sex" id="male" />
</form>

// <label>标签一般和radio、checkbox类型一起使用。
```

**`<fieldset>`元素集**

`fieldset` 元素可将*表单*内的相关元素分组，通常和`legend`标签一起用，`legend`标签定义了`fieldset`的提示信息。

```html
<fieldset>
    <legend>健康信息</legend>
     身高：<input type="text" />
     体重：<input type="text" />
</fieldset>
```

---

## 表单补充属性

`disabled` 禁用

`readonly` 只读

`placeholder` 占位符提供可描述输入字段预期值的提示信息

`autofocus` 元素自动获得焦点