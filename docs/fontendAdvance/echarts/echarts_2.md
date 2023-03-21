# `Echarts`应用

## 一、常用图表类型

- 设置柱状图的方式，是将 `series` 的 `type` 设为 `'bar'`。
- 设置折线图的方式，是将 `series` 的 `type` 设为 `'category'`。
- 设置饼图的方式，是将 `series` 的 `type` 设为 `'pie'`。
- 设置散点图的方式，是将 `series` 的 `type` 设为 `'scatter'`。

## 二、图表数据异步加载

### 1.数据异步

> 很多时候可能数据需要异步加载后再填入。`ECharts` 中实现异步数据的更新非常简单，在图表初始化后不管任何时候只要通过 `jQuery` 等工具异步获取数据后通过 `setOption` 填入数据和配置项就行。

```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(data) {
  // data 的结构:
  // {
  //     categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
  //     values: [5, 20, 36, 10, 10, 20]
  // }
  myChart.setOption({
    title: {
      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: data.categories
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: data.values
      }
    ]
  });
});
```

> 也可以先设置图表样式显示空图标,等获取到数据后再展示

```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(data) {
  // data 的结构:
  // {
  //     categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
  //     values: [5, 20, 36, 10, 10, 20]
  // }
  myChart.setOption({
    title: {
      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: data.categories
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: data.values
      }
    ]
  });
});
```

### 2.`loading` 动画

>如果数据加载时间较长，一个空的坐标轴放在画布上也会让用户觉得是不是产生 bug 了，因此需要一个 loading 的动画来提示用户数据正在加载。
>
>`ECharts` 默认有提供了一个简单的加载动画。只需要调用 [`showLoading`](https://echarts.apache.org//api.html#echartsInstance.showLoading) 方法显示。数据加载完成后再调用 [`hideLoading`](https://echarts.apache.org//api.html#echartsInstance.hideLoading) 方法隐藏加载动画。

```js
myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```

### 3.数据的动态更新

>`ECharts` 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。
>
>所有数据的更新都通过 [`setOption`](https://echarts.apache.org//api.html#echartsInstance.setOption)实现，你只需要定时获取数据，[`setOption`](https://echarts.apache.org/handbook/~api.html#echartsInstance.setOption) 填入数据，而不用考虑数据到底产生了哪些变化，`ECharts` 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

```js
chart.setOption(option, { 
    notMerge: ...,
    lazyUpdate: ...,
    silent: ... 
});
```



- `notMerge` 可选。是否不跟之前设置的 `option` 进行合并。默认为 `false`。即表示合并。合并的规则，详见 **组件合并模式**。如果为 `true`，表示所有组件都会被删除，然后根据新 `option` 创建所有新组件。
- `replaceMerge` 可选。用户可以在这里指定一个或多个组件，如：`xAxis`, `series`，这些指定的组件会进行 `replaceMerge`。如果用户想删除部分组件，也可使用 `replaceMerge`。详见 **组件合并模式**。
- `lazyUpdate` 可选。在设置完 `option` 后是否不立即更新图表，默认为 `false`，即同步立即更新。如果为 `true`，则会在下一个 animation frame 中，才更新图表。
- `silent` 可选。阻止调用 `setOption` 时抛出事件，默认为 `false`，即抛出事件。

## 三、富文本标签

`Apache EChartsTM` 中的文本标签从` v3.7` 开始支持富文本模式，能够：

- 定制文本块整体的样式（如背景、边框、阴影等）、位置、旋转等。
- 对文本块中个别片段定义样式（如颜色、字体、高宽、背景、阴影等）、对齐方式等。
- 在文本中使用图片做小图标或者背景。
- 特定组合以上的规则，可以做出简单表格、分割线等效果。

开始下面的介绍之前，先说明一下下面会使用的两个名词的含义：

- 文本块（Text Block）：文本标签块整体。
- 文本片段（Text fragment）：文本标签块中的部分文本。

### 1.文本样式相关的配置项

`echarts` 提供了丰富的文本标签配置项，包括：

- 字体基本样式设置：`fontStyle`、`fontWeight`、`fontSize`、`fontFamily`。
- 文字颜色：`color`。
- 文字描边：`textBorderColor`、`textBorderWidth`。
- 文字阴影：`textShadowColor`、`textShadowBlur`、`textShadowOffsetX`、`textShadowOffsetY`。
- 文本块或文本片段大小：`lineHeight`、`width`、`height`、`padding`。
- 文本块或文本片段的对齐：`align`、`verticalAlign`。
- 文本块或文本片段的边框、背景（颜色或图片）：`backgroundColor`、`borderColor`、`borderWidth`、`borderRadius`。
- 文本块或文本片段的阴影：`shadowColor`、`shadowBlur`、`shadowOffsetX`、`shadowOffsetY`。
- 文本块的位置和旋转：`position`、`distance`、`rotate`。

可以在各处的 `rich` 属性中定义文本片段样式。例如 [`series-bar.label.rich`](https://echarts.apache.org/handbook/option.html#series-bar.label.rich)

注意：如果不定义 `rich`，不能指定文字块的 `width` 和 `height`。

### 2.文本、文本框、文本片段的基本样式和装饰

每个文本可以设置基本的字体样式：`fontStyle`、`fontWeight`、`fontSize`、`fontFamily`。

可以设置文字的颜色 `color` 和边框的颜色 `textBorderColor`、`textBorderWidth`。

文本框可以设置边框和背景的样式：`borderColor`、`borderWidth`、`backgroundColor`、`padding`。

文本片段也可以设置边框和背景的样式：`borderColor`、`borderWidth`、`backgroundColor`、`padding`。

### 3.标签的位置

对于折线图、柱状图、散点图等，均可以使用 `label` 来设置标签。标签的相对于图形元素的位置，一般使用 [`label.position`](https://echarts.apache.org/handbook/option.html#series-scatter.label.position)、[`label.distance`](https://echarts.apache.org/handbook/option.html#series-scatter.label.distance) 来配置。

```js
option = {
  series: [
    {
      type: 'scatter',
      symbolSize: 160,
      symbol: 'roundRect',
      data: [[1, 1]],
      label: {
        // 修改 position 和 distance 的值试试
        // 支持：'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        position: 'top',
        distance: 10,

        show: true,
        formatter: ['Label Text'].join('\n'),
        backgroundColor: '#eee',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        shadowBlur: 3,
        shadowColor: '#888',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        textBorderColor: '#000',
        textBorderWidth: 3,
        color: '#fff'
      }
    }
  ],
  xAxis: {
    max: 2
  },
  yAxis: {
    max: 2
  }
};
```
注意：`position` 在不同的图中可取值有所不同。`distance` 并不是在每个图中都支持。详情请参见 [option 文档](https://echarts.apache.org/option.html)。

### 4.标签的旋转

```js
const labelOption = {
  show: true,
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

option = {
  xAxis: [
    {
      type: 'category',
      data: ['2012', '2013', '2014', '2015', '2016']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    }
  ]
};
```

### 5.文本片段的排版和对齐

关于排版方式，每个文本片段，可以想象成 CSS 中的 `inline-block`，在文档流中按行放置。

每个文本片段的内容盒尺寸（`content box size`），默认是根据文字大小决定的。但是，也可以设置 `width`、`height` 来强制指定，虽然一般不会这么做（参见下文）。文本片段的边框盒尺寸（`border box size`），由上述本身尺寸，加上文本片段的 `padding` 来得到。

只有 `'\n'` 是换行符，能导致换行。

一行内，会有多个文本片段。每行的实际高度，由 `lineHeight` 最大的文本片段决定。文本片段的 `lineHeight` 可直接在 `rich` 中指定，也可以在 `rich` 的父层级中统一指定而采用到 `rich` 的所有项中，如果都不指定，则取文本片段的边框盒尺寸（`border box size`）。

在一行的 `lineHeight` 被决定后，一行内，文本片段的竖直位置，由文本片段的 `verticalAlign` 来指定（这里和 CSS 中的规则稍有不同）：

- `'bottom'`：文本片段的盒的底边贴住行底。
- `'top'`：文本片段的盒的顶边贴住行顶。
- `'middle'`：居行中。

文本块的宽度，可以直接由文本块的 `width` 指定，否则，由最长的行决定。宽度决定后，在一行中进行文本片段的放置。文本片段的 `align` 决定了文本片段在行中的水平位置：

- 首先，从左向右连续紧靠放置 `align` 为 `'left'` 的文本片段盒。
- 然后，从右向左连续紧靠放置 `align` 为 `'right'` 的文本片段盒。
- 最后，剩余的没处理的文本片段盒，紧贴着，在中间剩余的区域中居中放置。

关于文字在文本片段盒中的位置：

- 如果 `align` 为 `'center'`，则文字在文本片段盒中是居中的。
- 如果 `align` 为 `'left'`，则文字在文本片段盒中是居左的。
- 如果 `align` 为 `'right'`，则文字在文本片段盒中是居右的。

### 6.特殊效果：图标、分割线、标题块、简单表格

文本片段的 `backgroundColor` 可以指定为图片后，就可以在文本中使用图标了：

```js
labelOption = {
  rich: {
    Sunny: {
      // 这样设定 backgroundColor 就可以是图片了。
      backgroundColor: {
        image: './data/asset/img/weather/sunny_128.png'
      },
      // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
      height: 30
    }
  }
};
```

分割线实际是用 border 实现的：

```js
labelOption = {
  rich: {
    hr: {
      borderColor: '#777',
      // 这里把 width 设置为 '100%'，表示分割线的长度充满文本块。
      // 注意，这里是文本块内容盒（content box）的 100%，而不包含 padding。
      // 虽然这和 CSS 相关的定义有所不同，但是在这类场景中更加方便。
      width: '100%',
      borderWidth: 0.5,
      height: 0
    }
  }
};
```

标题块是使用 `backgroundColor` 实现的：

```js
labelOption = {
  // 标题文字居左
  formatter: '{titleBg|Left Title}',
  rich: {
    titleBg: {
      backgroundColor: '#000',
      height: 30,
      borderRadius: [5, 5, 0, 0],
      padding: [0, 10, 0, 10],
      width: '100%',
      color: '#eee'
    }
  }
};

// 标题文字居中。
// 这个实现有些 tricky，但是，能够不引入更复杂的排版规则而实现这个效果。
labelOption = {
  formatter: '{tc|Center Title}{titleBg|}',
  rich: {
    titleBg: {
      align: 'right',
      backgroundColor: '#000',
      height: 30,
      borderRadius: [5, 5, 0, 0],
      padding: [0, 10, 0, 10],
      width: '100%',
      color: '#eee'
    }
  }
};
```

## 四、基础的过渡动画

`Apache EChartsTM` 中使用了平移，缩放，变形等形式的过渡动画让数据的添加更新删除，以及用户的交互变得更加顺滑。通常情况下开发者不需要操心该如何去使用动画，只需要按自己的需求使用`setOption`更新数据，`ECharts` 就会找出跟上一次数据之间的区别，然后自动应用最合适的过渡动画。

### 1.过渡动画的配置

因为数据添加和数据更新往往会需要不一样的动画效果，比如我们会期望数据更新动画的时长更短，因此 ECharts 区分了这两者的动画配置：

- 对于新添加的数据，我们会应用入场动画，通过`animationDuration`, `animationEasing`, `animationDelay`三个配置项分别配置动画的时长，缓动以及延时。
- 对于数据更新，我们会应用更新动画，通过`animationDurationUpdate`, `animationEasingUpdate`, `animationDelayUpdate`三个配置项分别配置动画的时长，缓动以及延时。

可以看到，更新动画配置是入场动画配置加上了`Update`的后缀。

> 在 `ECharts` 中每次 `setOption` 的更新，数据会跟上一次更新的数据做对比，然后根据对比结果分别为数据执行三种状态：添加，更新以及移除。这个比对是根据数据的`name`来决定的，例如上一次更新数据有三个`name`为`'A'`, `'B'`, `'C'`的数据，而新更新的数据变为了`'B'`, `'C'`, `'D'`的数据，则数据`'B'`, `'C'`会被执行更新，数据`'A'`会被移除，而数据`'D'`会被添加。如果是第一次更新因为没有旧数据，所以所有数据都会被执行添加。根据这三种状态 `ECharts` 会分别应用相应的入场动画，更新动画以及移除动画。

所有这些配置都可以分别设置在`option`最顶层对所有系列和组件生效，也可以分别为每个系列配置。

如果我们想要关闭动画，可以直接设置`option.animation`为`false`。

#### 动画时长

`animationDuration`和`animationDurationUpdate`用于设置动画的时长，单位为`ms`，设置较长的动画时长可以让用户更清晰的看到过渡动画的效果，但是我们也需要小心过长的时间会让用户再等待的过程中失去耐心。

设置为`0`会关闭动画，在我们只想要单独关闭入场动画或者更新动画的时候可以通过单独将相应的配置设置为`0`来实现。

#### 动画缓动

`animationEasing`和`animationEasingUpdate`两个配置项用于设置动画的缓动函数，缓动函数是一个输入动画时间，输出动画进度的函数：

```ts
(t: number) => number;
```

在 `ECharts` 里内置了缓入`'cubicIn'`，缓出`'cubicOut'`等常见的动画缓动函数，我们可以直接通过名字来声明使用这些缓动函数。

内置缓动函数：

![img](data:image/png;base64,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7eIEQvw/vJtVYRrbhy5euaZHCFmtrjUaF7c30vld5udog1gqHVfZaYlAMBstlurq10QUV7FUhx+eqoCIcjhujqgLnk6oTaMR4DBaK2t7JtPgM5bu9vnMZdHfkkn1+0WHfRPhN40WVsTr55BcDg3rmL4EYYoRl2XYu8/htbZdbNeU11J/EgnTXqmfcWYz7FINZ//yGWG959BKe8yexlLPaKLoLsPEUf8NobCVoh6t8hyai3Og0ZJZFHpbcbKiKAwKfQQCQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIhpLsWJQQAAIAAEgAASAABAAAkAACACB8CIAIhpe2aBnQAAIAAEgAASAABAAAkAACACBWCIAIkpEs2bNukBKeciKFSvO95LyzJkzbxZCPLZ8+fKbYqkFGFQsEDj22GMnJRKJO4UQn1q2bNlfYjEoDKLlCMyePfsdUsrv53K5U+677771Le8QOhALBDCvxkKMoRtEufVcqQ7X8mzogECH6oZArWsr2LrSogARrRMRrdSAzZo1axQR3U5E79cism37+HvvvXdZ3d4eVNRWCAQ1lpXqaluBiMEOQaASInrcccfNtizrt0YlvyGijy5fvnwzoAUCJgJBFmeOPl0QVIcwr0LHapnfgjwbdJ6FJOKDQK0yD2LrGK12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)

#### 延时触发

`animationDelay`和`animationDelayUpdate`用于设置动画延迟开始的时间，通常我们会使用回调函数将不同数据设置不同的延时来实现交错动画的效果

```js
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('A' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
option = {
  legend: {
    data: ['bar', 'bar2']
  },
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      data: data1,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10;
      }
    },
    {
      name: 'bar2',
      type: 'bar',
      data: data2,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function(idx) {
        return idx * 10 + 100;
      }
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function(idx) {
    return idx * 5;
  }
};
```



### 2.动画的性能优化

在数据量特别大的时候，为图形应用动画可能会导致应用的卡顿，这个时候我们可以设置`animation: false`关闭动画。

对于数据量会动态变化的图表，我们更推荐使用`animationThreshold`这个配置项，当画布中图形数量超过这个阈值的时候，`ECharts` 会自动关闭动画来提升绘制性能。这个配置往往是一个经验值，通常 `ECharts` 的性能足够实时渲染上千个图形的动画（我们默认值也是给了 2000），但是如果你的图表很复杂，或者你的用户环境比较恶劣，页面中又同时会运行很多其它复杂的代码，也可以适当的下调这个值保证整个应用的流畅性。

### 3.监听动画结束

有时候我们想要获取当前渲染的结果，如果没有使用动画，我们在`setOption`之后 ECharts 就会直接执行渲染，我们可以同步的通过`getDataURL`方法获取渲染得到的结果。

```ts
const chart = echarts.init(dom);
chart.setOption({
  animation: false
  //...
});
// 可以直接同步执行
const dataUrl = chart.getDataURL();
```

但是如果图表中有动画，马上执行`getDataURL`得到的是动画刚开始的画面，而非最终展示的结果。因此我们需要知道动画结束然后再执行`getDataURL`得到结果。

假如你确定动画的时长，一种比较简单粗暴的方式是根据动画时长来执行`setTimeout`延迟执行：

```ts
chart.setOption({
  animationDuration: 1000
  //...
});
setTimeout(() => {
  const dataUrl = chart.getDataURL();
}, 1000);
```

或者我们也可以使用 `ECharts` 提供的`rendered`事件来判断 `ECharts` 已经动画结束停止了渲染

```ts
chart.setOption({
  animationDuration: 1000
  //...
});

function onRendered() {
  const dataUrl = chart.getDataURL();
  // ...
  // 后续如果有交互，交互发生重绘也会触发该事件，因此使用完就需要移除
  chart.off('rendered', onRendered);
}
chart.on('rendered', onRendered);
```

## 五、交互

### 1.拖拽的实现

这个例子主要做到了这样一件事，用鼠标可以拖拽曲线的点，从而改变曲线的形状。例子很简单，但是有了这个基础我们还可以做更多的事情，比如在图中进行可视化得编辑。所以我们从这个简单的例子开始。

echarts 本身没有提供封装好的“拖拽改变图表”这样比较业务定制的功能。但是这个功能开发者可以通过 API 扩展实现。

#### 实现基本的拖拽功能

在这个例子中，基础的图表是一个 [折线图 (series-line)](https://echarts.apache.org/option.html#series-line)。参见如下配置：

```js
var symbolSize = 20;

// 这个 data 变量在这里单独声明，在后面也会用到。
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];

myChart.setOption({
  xAxis: {
    min: -100,
    max: 80,
    type: 'value',
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -30,
    max: 60,
    type: 'value',
    axisLine: { onZero: false }
  },
  series: [
    {
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
      data: data
    }
  ]
});
```



既然折线中原生的点没有拖拽功能，我们就为它加上拖拽功能：用 [graphic](https://echarts.apache.org/option.html#graphic) 组件，在每个点上面，覆盖一个隐藏的可拖拽的圆点。

```js
myChart.setOption({
  // 声明一个 graphic component，里面有若干个 type 为 'circle' 的 graphic elements。
  // 这里使用了 echarts.util.map 这个帮助方法，其行为和 Array.prototype.map 一样，但是兼容 es5 以下的环境。
  // 用 map 方法遍历 data 的每项，为每项生成一个圆点。
  graphic: echarts.util.map(data, function(dataItem, dataIndex) {
    return {
      // 'circle' 表示这个 graphic element 的类型是圆点。
      type: 'circle',

      shape: {
        // 圆点的半径。
        r: symbolSize / 2
      },
      // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
      // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
      position: myChart.convertToPixel('grid', dataItem),

      // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
      invisible: true,
      // 这个属性让圆点可以被拖拽。
      draggable: true,
      // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
      z: 100,
      // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
      // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
      // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
      ondrag: echarts.util.curry(onPointDragging, dataIndex)
    };
  })
});
```



上面的代码中，使用 [convertToPixel](https://echarts.apache.org/handbook/api.html#echartsInstance.convertToPixel) 这个 API，进行了从 data 到“像素坐标”的转换，从而得到了每个圆点应该在的位置，从而能绘制这些圆点。`myChart.convertToPixel('grid', dataItem)` 这句话中，第一个参数 `'grid'` 表示 `dataItem` 在 [grid](https://echarts.apache.org/option.html#grid) 这个组件中（即直角坐标系）中进行转换。所谓“像素坐标”，就是以 echarts 容器 dom element 的左上角为零点的以像素为单位的坐标系中的坐标。

注意这件事需要在第一次 setOption 后再进行，也就是说，须在坐标系（[grid](https://echarts.apache.org/option.html#grid)）初始化后才能调用 `myChart.convertToPixel('grid', dataItem)`。

有了这段代码后，就有了诸个能拖拽的点。接下来要为每个点，加上拖拽响应的事件：

```js
// 拖拽某个圆点的过程中会不断调用此函数。
// 此函数中会根据拖拽后的新位置，改变 data 中的值，并用新的 data 值，重绘折线图，从而使折线图同步于被拖拽的隐藏圆点。
function onPointDragging(dataIndex) {
  // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
  // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  // 用更新后的 data，重绘折线图。
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}
```



上面的代码中，使用了 [convertFromPixel](https://echarts.apache.org//api.html#echartsInstance.convertFromPixel) 这个 API。它是 [convertToPixel](https://echarts.apache.org//api.html#echartsInstance.convertToPixel) 的逆向过程。`myChart.convertFromPixel('grid', this.position)` 表示把当前像素坐标转换成 [grid](https://echarts.apache.org/option.html#grid) 组件中直角坐标系的 dataItem 值。

最后，为了使 dom 尺寸改变时，图中的元素能自适应得变化，加上这些代码：

```js
window.addEventListener('resize', function() {
  // 对每个拖拽圆点重新计算位置，并用 setOption 更新。
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return {
        position: myChart.convertToPixel('grid', item)
      };
    })
  });
});
```



#### 添加 `tooltip` 组件

到此，拖拽的基本功能就完成了。但是想要更进一步得实时看到拖拽过程中，被拖拽的点的 data 值的变化状况，我们可以使用 [tooltip](https://echarts.apache.org/option.html#tooltip) 组件来实时显示这个值。但是，tooltip 有其默认的“显示”“隐藏”触发规则，在我们拖拽的场景中并不适用，所以我们还要手动定制 tooltip 的“显示”“隐藏”行为。

在上述代码中分别添加如下定义：

```js
myChart.setOption({
  // ...,
  tooltip: {
    // 表示不使用默认的“显示”“隐藏”触发规则。
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br>Y: ' +
        params.data[1].toFixed(2)
      );
    }
  }
});
```



```js
myChart.setOption({
  graphic: data.map(function(item, dataIndex) {
    return {
      type: 'circle',
      // ...,
      // 在 mouseover 的时候显示，在 mouseout 的时候隐藏。
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex)
    };
  })
});

function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}

function hideTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'hideTip'
  });
}
```



这里使用了 [dispatchAction](https://echarts.apache.org/handbook/api.html#echartsInstance.dispatchAction) 来显示隐藏 tooltip。用到了 [showTip](https://echarts.apache.org/handbook/api.html#action.tooltip.showTip)、[hideTip](https://echarts.apache.org/handbook/api.html#action.tooltip.hideTip)。

#### 全部代码

总结一下，全部的代码如下：

```js
import echarts from 'echarts';

var symbolSize = 20;
var data = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
];
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  tooltip: {
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br />Y: ' +
        params.data[1].toFixed(2)
      );
    }
  },
  xAxis: { min: -100, max: 80, type: 'value', axisLine: { onZero: false } },
  yAxis: { min: -30, max: 60, type: 'value', axisLine: { onZero: false } },
  series: [
    { id: 'a', type: 'line', smooth: true, symbolSize: symbolSize, data: data }
  ]
});
myChart.setOption({
  graphic: echarts.util.map(data, function(item, dataIndex) {
    return {
      type: 'circle',
      position: myChart.convertToPixel('grid', item),
      shape: { r: symbolSize / 2 },
      invisible: true,
      draggable: true,
      ondrag: echarts.util.curry(onPointDragging, dataIndex),
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex),
      z: 100
    };
  })
});
window.addEventListener('resize', function() {
  myChart.setOption({
    graphic: echarts.util.map(data, function(item, dataIndex) {
      return { position: myChart.convertToPixel('grid', item) };
    })
  });
});
function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}
function hideTooltip(dataIndex) {
  myChart.dispatchAction({ type: 'hideTip' });
}
function onPointDragging(dataIndex, dx, dy) {
  data[dataIndex] = myChart.convertFromPixel('grid', this.position);
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data
      }
    ]
  });
}
```



有了这些基础，就可以定制更多的功能了。可以加 [`dataZoom`](https://echarts.apache.org/option.html#dataZoom) 组件，可以制作一个直角坐标系上的绘图板等等。可以发挥想象力。

### 2.智能指针吸附

在图表中，部分可交互元素可能比较小，有时候用户不易准确地进行点击等操作，移动端尤其如此。因此，在 `Apache EChartsTM 5.4.0` 中，我们引入了“智能指针吸附”的概念。

从该版本起，在默认情况下，`ECharts` 对移动端的图表开启指针吸附，对非移动端的图表关闭。

> 如果需要对所有平台都开启，则可以通过在 [`init`](https://echarts.apache.org/api.html#echarts.init) 的时候将 `opt.useCoarsePointer` 设置为 `true` 来实现；设为 `false` 则对所有平台都关闭。

#### 吸附原理

在鼠标或触摸事件发生时，`ECharts` 会根据鼠标或触摸的位置，判断是否和某个可交互元素相交。如果是，则认为该元素是交互对象（与优化前的逻辑一致）；如果不是，则在一定范围内找到最接近鼠标或触摸位置的一个元素。

> 默认的范围是 `44px`（参见 [`W3C 标准`](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)），开发者可在 [`init`](https://echarts.apache.org/api.html#echarts.init) 的时候，通过 `opt.pointerSize` 设置该值。

更具体地说，`ECharts` 会在鼠标或触摸位置的周围，依次循环不同角度和不同半径（在 `opt.pointerSize` 范围内），直到找到一个元素与其相交。如果找到了，则认为该元素是交互对象。

![img](https://echarts.apache.org/handbook/images/how-to/coarse-pointer-zh.gif)

也就是说，如果有元素在鼠标或触摸位置的 `opt.pointerSize` 半径范围内，则最靠近的可交互元素会被认为是交互对象。

#### 性能分析

在实际算法实现的时候，我们首先将鼠标或触摸位置与所有可交互元素的 `AABB` 包围盒判断相交性，从而快速剔除了大部分不相交的元素。然后，我们再对剩余的元素进行精确的路径相交判断。因此，从用户体验角度，不会带来可感知的性能损耗。

对于大规模数据的图表系列（也就是开启了 `large: true` 的柱状图、散点图等），不会开启吸附功能。

## 六、渲染器

一般来说，Canvas 更适合绘制图形元素数量较多（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉 [特效](https://echarts.apache.org/examples/editor.html?c=lines-bmap-effect)。但是，在不少场景中，SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、并且用户使用浏览器内置的缩放功能时不会模糊。

选择哪种渲染器，我们可以根据软硬件环境、数据量、功能需求综合考虑。

- 在软硬件环境较好，数据量不大的场景下，两种渲染器都可以适用，并不需要太多纠结。
- 在环境较差，出现性能问题需要优化的场景下，可以通过试验来确定使用哪种渲染器。比如有这些经验：
  - 在需要创建很多 ECharts 实例且浏览器易崩溃的情况下（可能是因为 Canvas 数量多导致内存占用超出手机承受能力），可以使用 SVG 渲染器来进行改善。大略的说，如果图表运行在低端安卓机，或者我们在使用一些特定图表如 [水球图](https://ecomfe.github.io/echarts-liquidfill/example/) 等，SVG 渲染器可能效果更好。
  - 数据量较大（经验判断 > 1k）、较多交互时，建议选择 Canvas 渲染器。

我们强烈欢迎开发者们[反馈](https://github.com/apache/echarts/issues/new/choose)给我们使用的体验和场景，帮助我们更好的做优化。

注：当前某些特殊的渲染依然需要依赖 Canvas：如[炫光尾迹特效](https://echarts.apache.org/option.html#series-lines.effect)、[带有混合效果的热力图](https://echarts.apache.org/examples/editor.html?c=heatmap-bmap)等。

我们在 [`v5.3.0`](https://echarts.apache.org/handbook/zh/basics/release-note/5-3-0/#全新的-svg-渲染器) 中使用虚拟 DOM 技术对 `SVG`渲染器进行了重构，从而使其渲染性能提升了 2~10 倍，在某些特殊场景中甚至能有数十倍的提升！参见 [#836](https://github.com/ecomfe/zrender/pull/836)。

如果是用如下的方式完整引入`echarts`，代码中已经包含了 `SVG` 渲染器和 Canvas 渲染器

```js
import * as echarts from 'echarts';
```

如果你是按照 [在项目中引入 Apache ECharts](https://echarts.apache.org/handbook/zh/basics/import) 一文中的介绍使用按需引入，则需要手动引入需要的渲染器

```js
import * as echarts from 'echarts/core';
// 可以根据需要选用只用到的渲染器
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);
```

然后，我们就可以在代码中，初始化图表实例时，[传入参数](https://echarts.apache.org/api.html#echarts.init) 选择渲染器类型：

```js
// 使用 Canvas 渲染器（默认）
var chart = echarts.init(containerDom, null, { renderer: 'canvas' });
// 等价于：
var chart = echarts.init(containerDom);

// 使用 SVG 渲染器
var chart = echarts.init(containerDom, null, { renderer: 'svg' });
```