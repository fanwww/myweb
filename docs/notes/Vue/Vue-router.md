# Vue-router

```javascript
//路由的重定向

 {
​    path: '/',

​    redirect: '/home'

  },
```

路由的重定向用于对页面默认加载通过router加载的组件进行设置

router.matcher

```
// 替换现有router的routes
router.matcher = new VueRouter({
  routes: newRoutes
}).matcher
```

对外提供两个方法match(负责route匹配), addRoutes（动态添加路由）。
具体原因：在做路径切换transitionTo方法中，首先就会使用const route = this.router.match(location, this.current)来匹配route, 其实内部会使用matcher来做匹配。修改了matcher即新的routes生效。
对router.matcher属性做修改，即新的routes就会替换老的routes, 其实就是replaceRoutes()的含义（但是官方没有提供这个API）