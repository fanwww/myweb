# 学习SVG（四）文档结构

## 样式表现

- 在SVG中，样式有4种加载方式。

1. 元素使用`style`属性。

```html
<rect x="10" y="10" width="50" height="50" style="fill: red"></rect>
```

1. 定义内部样式。

```html
<defs>
    <style type="text/css">
      circle {
        fill: #ccc;
      }
    </style>
</defs>
<circle cx="20" cy="20" r="15" />
```

1. 使用css选择器来设置样式。

```html
    <style type="text/css">
    circle {
      fill: #ccc;
    }
    </style>
    <svg width="400" height="400">
      <circle cx="20" cy="20" r="15" />
    </svg>
```

1. 以属性的形式设置样式。

- 需要注意这种方式设置的优先级是最低的，通过其他3中方式设置一样的属性都会覆盖其值。

```js
<rect x="10" y="10" width="50" height="50" fill="red"></rect>
```

## 元素

### g元素

- 把其子元素作为一个组合(Group)，使文档结构更清晰。
- 在`g元素`上统一设置`fill`或者`stroke`属性，子元素会自动继承属性。

```html
      <g id="redBox" fill="red" stroke="red">
        <rect x="30" y="30" width="100" height="100" stroke="black" />
      </g>
```

![1649076247(1).png](./images/svg_4_1.jpg)

### use元素

- 把指定的代码块在指定的位置再画一遍。`xlink:href`属性设置要复制的元素，和`css`选择器中的id选择器相似。

```html
<g id="rectOne" fill="red">
    <rect x="0" y="0" width="100" height="100" />
</g>
<use xlink:href="#rectOne" x="110" y="3" stroke="blue" stroke-width="3" />
```

![1649077040(1).png](./images/svg_4_2.jpg)

- 除了复制内部图形，还可以复制外部其他模块的图形。

```html
<use xlink:href="1.svg#rectOne" x="110" y="3" stroke="blue" stroke-width="3" />
```

### defs元素

- 用于定义复用的元素，在`defs`内的元素并不会被显示，而是作为模板供其他地方使用。

```html
<defs>
    <g id="rectOne" fill="red">
      <rect x="30" y="30" width="100" height="100" stroke="black" />
    </g>
</defs>
<use xlink:href="#rectOne" x="110" y="3" stroke-width="3" />
```

![image.png](./images/svg_4_3.jpg)

- 为了文档结构更清晰，可以把渐变一类的公用元素创建在其内部。

```html
<defs>
    <linearGradient id="Gradient1">
      <stop offset="20%" stop-color="#39F" />
      <stop offset="90%" stop-color="#F3F" />
    </linearGradient>
</defs>

<rect x="10" y="10" width="160" height="10" fill="url(#Gradient1)" />
```

![image.png](./images/svg_4_4.jpg)

### symbol元素

- 和`defs`元素一样都用于定义一个图形模板对象。但是它可以定义`viewbox`可视区，简单理解就是其内部是一个单独的画布，只展示可视区中的内容。

```html
<symbol id="circle" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">
    <circle cx="50" cy="50" r="50"></circle>
</symbol>
<rect x="0" y="0" width="50" height="100" stroke="grey" fill="none"></rect>
<use xlink:href="#circle" x="0" y="0" width="50" height="100" fill="red"></use>
```

![image.png](./images/svg_4_5.jpg)

- 这里使用`rect`元素为`use`元素复制的内容添加了边框，能更清晰的看见其内部圆形是按我们设置的规则绘制的。

### image元素

- 用来加载一个完整的SVG文件或栅格文件。

1. 加载SVG文件，视口会基于引用的文件的`x,y,width,height`属性来建立。
2. 加载栅格文件，内容会被缩放以适配该属性指定的矩形。缩放方式通过`preserveAspectRatio`来修改。

```html
<image xlink:href="./加载失败.svg" x="0" y="0" width="200" heigh="100" />
```

![image.png](./images/svg_4_6.jpg)

- 这里可以看见我设置的是200 * 100的宽高，元素还是自动生成了200 * 200的宽高。