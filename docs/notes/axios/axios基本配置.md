# axios基本配置

### 一、全局的 axios 默认值

- `axios.defaults.baseURL` 设置默认公共请求地址baseURL

  当我们的项目里面有很多的接口时 设置默认baseURL对后期的维护很有必要

  例如 开发环境访问的是开发时的数据库 生产环境访问的是线上数据库 开发和生产访问的不是一个地址

  在请求的时候自动的在地址前面加上设置的baseUrl

  (开发环境是本地开发时的环境 生产环境是打包之后的环境)

```html
<script>

    axios.defaults.baseURL = 'http://localhost:3000';

</script>
```

### 二、设置超时时间

- `axios.defaults.timeout = 2500`; 设置超时

  当后端返回数据过慢时设置了超时就会自动断开请求

```
<script>
import axios from "axios";
axios.defaults.timeout = 3000;

</script>
```

### 三、设置请求头

token是登陆的时候返回的token 如果后端让在别的页面请求数据的是附带token

一般用户判断用户是否登陆是根据token 进行判断的 一般把这个token存在session里面

只要把toke写在请求头里面 后端就知道我们登陆

```javascript
 axios.defaults.headers.common['token'] = localStorage["token"]
```

登陆的时候保存sessionkey 然后在请求其他接口的时候带上这个sessionkey sessionkey 代表用户的身份 当我们请求数据的时候带上这个sessionkey 那么后端就知道现在是谁在请求数据
还有些特殊的情况 登陆的时候后端会在本地设置cookie token 他会根据cookie里面的值token来判断用户是否登陆

```javascript
axios.defaults.headers.common['sessionKey'] = 登陆时后端返回的sessionKey
```

如果你每次请求接口需要验证，就加这个，不需要验证那就不用加

### 四、axios拦截器 interceptors

页面发送http请求，很多情况我们要对请求和其响应进行特定的处理；如果请求数非常多，单独对每一个请求进行处理会变得非常麻烦，程序的优雅性也会大打折扣。好在强大的axios为开发者提供了这样一个API：拦截器。拦截器分为 请求（request）拦截器和 响应（response）拦截器。

> 前端请求接口时首先向服务端发送请求的接口加参数 这个步骤称之为request
> request 对象代表了一个HTTP请求，其具有一些属性来保存请求中的一些数据，比如params string，body，HTTP headers等等。

- params get请求附带的参数
- body post请求附带的参数
- HTTP headers 提交数据类型

> 服务端接收到请求之后响应数据 这个步骤称之为response
> response里面存放的就是服务端返回给我们的数据，包括状态码，返回的数据格式等等

axios拦截器就是对这请求前和返回数据后的这两个过程执行操作

### axios拦截器 开始 类似路由守卫

**+ 请求拦截器**

- config里面包含请求的参数 如请求地址 请求类似 请求参数等
  在请求的时候执行一些操作 比如开启loading弹窗 可以想象成router的导航守卫

```html
<script>
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理  
     console.log(config);
    return config;
}, function (error) {
    // 对请求失败做处理
    return Promise.reject(error);
});
</script>
```

**+ 响应拦截器**

比如响应数据之后进行的操作

```html
<script>
axios.interceptors.response.use(function (config) {
    // 在请求之后做处理 如关闭loading
       loadings.close();
  // 对返回过来的数据进行过滤操作
    return config.data;
}, function (error) {
    // 对请求失败做处理
    loadings.close();
    return Promise.reject(error);
});
</script>
```