# 学习SVG（十六）创建形变动画

## 简介

- 变形动画主要是对`<path/>` d 属性的控制。本节使用SMIL（SVG的`animate`元素）来实现变形动画。

## 形变动画

### 播放、暂停的形变动画

- 绘制静态的开始图形。

```html
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="50" fill="#000000" />
      <path d="M32,21 54,32 54,68 33,80 Z" fill="#ffffff" />
      <path d="M53.6,32 85,50 85,50 53.6,68 Z" fill="#ffffff" />
    </svg>
```

![1.gif](./images/svg_16_1.jpg)

- 绘制静态的暂停图形。

```html
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="50" fill="#000000" />
      <path d="M25,21 44,21 44,80 25,80 Z" fill="#ffffff" />
      <path d="M56,21 75,21 75,80 56,80 Z" fill="#ffffff" />
    </svg>
```

![image.png](./images/svg_16_2.jpg)

- 两个图形的`path`元素和其d 属性我们都知道了，使用`animate`元素添加动画。

```html
<path fill="#ffffff">
    <animate
      attributeName="d"
      from="M32,21 54,32 54,68 33,80 Z"
      to="M25,21 44,21 44,80 25,80 Z"
      dur="1s"
      repeatCount="indefinite"
    />
</path>
<path fill="#ffffff">
    <animate
      attributeName="d"
      from="M53.6,32 85,50 85,50 53.6,68 Z"
      to="M56,21 75,21 75,80 56,80 Z"
      dur="1s"
      repeatCount="indefinite"
    />
</path>
```

![2.gif](./images/svg_16_3.gif)

- 一个简单的形变动画就实现了。

### 使用javascript控制动画

- 前面使用的两个`path`元素绘图，这里我们使用一个`path`元素绘制。

```html
...
<style type="text/css">
    button {
      outline: none;
      border: 0px solid;
      background: transparent;
    }
    .play-button {
      fill: #4af;
      opacity: 0.85;
    }
    .play-button:hover {
      cursor: pointer;
      opacity: 1;
    }
</style>
...

<button id="buttonA" class="play-button" aria-live="assertive" tabindex="32" aria-label="Pause">
  <svg viewBox="0 0 50 50" version="1.1" width="200" height="200">
    <defs>
      <path id="shapeA" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26">
        <animate
          id="animationA"
          begin="indefinite"
          attributeType="XML"
          attributeName="d"
          fill="freeze"
          dur="0.5s"
          repeatCount="1"
        ></animate>
      </path>
    </defs>
    <use xlink:href="#shapeA"></use>
  </svg>
</button>
```

![image.png](./images/svg_16_4.jpg)

- 这里添加了`button`元素，把SVG作为按钮背景使用。
- 在`animate`元素中添加`begin="indefinite"`，动画无限期等待。
- 添加`id`属性，用于`js`中使用。

#### 添加控制

```html
    <script type="text/javascript">
      var animationA = document.getElementById('animationA')
      var buttonA = document.getElementById('buttonA')
      var flip = false

      var pause = 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28'
      var play = 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26'

      buttonA.onclick = () => {
        flip = !flip
        animationA.setAttribute('from', flip ? pause : play)
        animationA.setAttribute('to', flip ? play : pause)
        animationA.beginElement()
      }
    </script>
```

![4.gif](./images/svg_16_5.gif)

1. 获取到我们需要监听的元素。
2. 定义好形变的路劲和控制形变的状态。用于点击后控制形变动画。
3. `.beginElement()` `animate`元素的方法，开始执行动画。

## 总结

在做形变动画的时候，需要注意形状的**控制点**和转换后的**控制点**数量不同，动画就不会这么平滑。在做DEOM的时候，使用五角星变换为十边形，无平滑动画直接形变，估计是兼容问题。所以推举使用相关的`javascript`库进行动画开发。