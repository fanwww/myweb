# 学习SVG（二）坐标系统

## 简介

SVG是用于绘图的，那么它和其他绘图技术一样都是有网格坐标系统。坐标系简介：

1. 以左上角为坐标系的原点(0,0)。
2. `X 轴`的正方向`向右`，`Y 轴`的正方向`向下`。
3. 坐标轴以像数为单位。

## viewport 视口

1. 视口是指文档在`HTML`使用的画布区域。
2. 由 `width`、`height` 属性确定视口的大小。如果 SVG 元素不声明 `viewport`，浏览器会默认给定视口的大小 300px * 150px。

```html
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full">
  <rect width="100%" height="100%" stroke="#FF5151" stroke-width="4" fill="#FF8EFF" />
  <circle cx="150" cy="100" r="80" fill="#BE77FF" />
  <text x="150" y="110" font-size="16" text-anchor="middle" fill="white">你好</text>
</svg>
```

![image.png](./images/svg_2_1.jpg)

## viewbox

1. 画布中的可视区。简单理解就是只在视口中绘制可视区范围内的内容。
2. `viewBox` 接收四个参数值，分别是 `min-x`，`min-y`，`width`，`height`。`min-x` 和 `min-y` 设置可视区在视口中的位置(可视区的左上角)，`width` 和 `height` 设置可视区的宽和高。注意 `width` 或 `height` 如果设置成 `0` ，就代表没有可视区。
3. 初始`viewBox`的范围和`viewport`完全相同。

- 示例，设置`viewBox="0 0 100 100"`。

```html
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="full"
      width="300"
      height="200"
      viewBox="0 0 100 100"
    >
      <rect width="300" height="200" stroke="#FF5151" stroke-width="4" fill="#FF8EFF" />
      <circle cx="150" cy="100" r="80" fill="#BE77FF" />
      <text x="150" y="110" font-size="16" text-anchor="middle" fill="white">你好</text>
    </svg>
```

![image.png](./images/svg_2_2.jpg)

1. 创建了`0 0 100 100`的可视区。视口中只展示了我们设置的可视区的内容。
2. 区域自动缩放，以适应视口。

### preserveAspectRatio

- 控制缩放图形相对视口的对齐方式。

```js
preserveAspectRatio = <align> <meetOrSlice>?
```

- `align` 有9种值：

| y\x      | xMin     | xMid     | xMax     |
| -------- | -------- | -------- | -------- |
| **yMin** | xMinYMin | xMidYMin | xMaxYMin |
| **yMid** | xMinYMid | xMidYMid | xMaxYMid |
| **yMax** | xMinYMax | xMidYMax | xMaxYMax |

1. `none`,  通过拉伸 `viewBox` 来适应整个视窗，不管宽高比。
2. `xMin`,  `viewBox` 和 `viewport` 左边缘对齐。
3. `xMid`,  `viewBox` 和 `viewport` x 轴中心对齐。
4. `xMax`,  `viewBox` 和 `viewport` 右边缘对齐。
5. `YMin`,  `viewBox` 和 `viewport` 上边缘对齐。
6. `YMid`,  `viewBox` 和 `viewport` y 轴中心对齐。
7. `YMax`,  `viewBox` 和 `viewport` 下边缘对齐。

- `meetOrSlice` 常用值：

1. `meet` 宽高比将会被保留，尽可能的放大填满。类似于 `background-size: contain`。
2. `slice` 宽高比将会被保留，比例小的方向放大填满。类似于 `background-size: cover`。

```html
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="full"
      width="300"
      height="200"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMinYMid slice"
    >
      <rect width="300" height="200" stroke="#FF5151" stroke-width="4" fill="#FF8EFF" />
      <circle cx="150" cy="100" r="80" fill="#BE77FF" />
      <text x="150" y="110" font-size="16" text-anchor="middle" fill="white">你好</text>
    </svg>
```

![image.png](./images/svg_2_3.jpg)

## 示例

1. 实现一个半圆

```html
    <svg
      width="100"
      height="100"
      viewBox="0 -50 100 100"
      preserveAspectRatio="xMinYMin slice"
      style="outline: 2px solid red"
    >
      <circle cx="0" cy="0" r="50" fill="green" />
    </svg>
```

![image.png](./images/svg_2_4.jpg)

1. 通过`preserveAspectRatio`修改圆位置。

```html
    <svg width="100" height="200" viewBox="0 0 200 200" style="outline: 1px solid red">
      <circle cx="100" cy="100" r="100" fill="green" stroke="none"></circle>
    </svg>
```

- 设置`viewBox`的宽是`viewport`的两倍。`preserveAspectRatio`默认值`xMidYMid meet`，x 轴中心对齐、y 轴中心对齐。

![image.png](./images/svg_2_5.jpg)

- 修改`preserveAspectRatio`的值`xMinYMin meet`，左边缘对齐、上边缘对齐。

```html
    <svg
      width="100"
      height="200"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMinYMin meet"
      style="outline: 1px solid red"
    >
      <circle cx="100" cy="100" r="100" fill="green" stroke="none"></circle>
    </svg>
```

![image.png](./images/svg_2_6.jpg)