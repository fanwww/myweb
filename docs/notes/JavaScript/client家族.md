# client家族

**clientWidth/Height**

获取元素可视区域的宽高 content+padding  添加overflow:hidden会有影响

**clientTop/clientLeft**

获取元素左上边框的宽度



获取页面可视区域宽高

### 通过 *html* 元素获取

- `document.documentElement.clientWidth/clientHeight`

返回只读且始终是整数，不包含浏览器滚动条的宽度（如果有）

### 通过 *window* 获取

- `window.innerWidth/innerHeight`

返回只读且始终是整数，IE < 9 不支持。返回值包含浏览器滚动条的宽度（如果有）

### 其它

#### 浏览器窗口宽高

- `window.outerWidth/outerHeight`

返回只读且始终是整数，IE < 9 不支持，计算内容包括侧边栏（如果存在）、窗口镶边（window chrome）和调正窗口大小的边框（window resizing borders/handles）。

#### 屏幕的宽高

- `window.screen.width/height`

返回该值时，IE 会考虑缩放设置。只有在缩放比例为 100% 时，IE 才返回真实的屏幕宽度。