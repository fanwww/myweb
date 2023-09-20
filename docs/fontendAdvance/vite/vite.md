# vite的使用

## 一、使用vite脚手架

1. 安装vite脚手架 create-vite
2. 运行create-vite bin目录下的一个执行文件

```powershell
npm ceate vite@latest
```

## 二、使用vite

> vite开发团队本意为了降低vite存在感,鼓励大家直接使用vite脚手架构件,所以真实项目中不推荐从零配置vite
>
> 推荐在学习vite的时候从零开始搭建

1.  初始化package.json

   ```powershell
   npm init -y
   ```

   

1.  安装vite

   ```powershell
   npm install vite -D
   ```

2. 配置vite执行命令 package.json	

   ```
   {
   	"scripts":{
   		"dev":"vite"
   	}
   }
   ```

# vite的依赖构建

## 一、路径的自动补全

1. vite只认绝对路径和相对路径

2. 如果引入资源的路径不是合法路径,则会自动补全(开发环境)

   > 引入 

   ```javascript
   mport _ from "lodash"
   ```

   > 补全

   ```javascript
   import _vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash?v=版本hash"
   ```

   > 补全lodash里面的依赖模块(向上查找,到根目录或找到依赖为止)

   ```javascript
   import _vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash?v=版本hash"
   ```

3. 生产环境打包依赖rollup

## 二、依赖预构建

> vite会找到对应的依赖,然后调用esbuild(go语言写的一个对js语法进行处理的一个库),将其他规范的代码统一转换成esmodule规范,然后放到当前目录下node_modules/.vite/deps,对esmodule规范的各个模块进行统一集成

**解决了三个痛点**

1. 不同的第三方包会有不同的导出格式(这是vite无法约束的)
2. 对路径的处理上可以直接使用.vite/deps,方便路径重写
3. 网络多包传输的性能问题(依赖嵌套依赖问题)

指定某些包忽略依赖预构建

> 配置vite.config.[js|ts]文件

```json
{
	"potimizeDeps":{
		"exclude":"["packagename"]"
	}
}
```

# vite配置文件

> vite.config.js   vite.config.ts

## 一、配置vite配置文件语法提示

1. 如果你使用webstrom,自带语法提示
2. 如果使用vscode,需这样书写配置文件

```javascript
//写法一 (推荐)
import { defineConfig } from 'vite'
export defalut defineConfig({

})

//写法二
/** @type import("vite").defineConfig */
const viteConfig = {
    
}
export defalut viteConfig
```

## 二、关于环境的处理

```
import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config' //基础配置
import viteDevConfig from './vite.dev.config' //开发环境配置
import viteProdConfig from './vite.prod.config' //生产环境配置

//策略模式
const envResolver = {
	"serve":()=>({...viteBaseConfig,...viteDevConfig}),
	"build":()=>({...viteBaseConfig,...viteProdConfig}),
}

//此处command和shell命令有关
//执行npm run dev 则为dev
//执行npm run prod 则为prod
export default defineConfig(({command:"serve"|"build"})=>{
	return envResolver[command]()
})
```

## 三、vite环境变量配置

> 环境变量:会根据当前代码环境产生值的变化

**常见代码环境**

- 开发环境
- 测试环境
- 预发布环境
- 灰度环境
- 生产环境

> 例子:百度子图sdk,小程序的sdk
>
> APP_KEY:开发环境、测试环境和开发环境的key不一样
>
> - 开发环境: 110
> - 测试环境: 111
> - 生产环境: 112

**配置步骤**

> 以开发环境为例
>
> 1. 创建.env.prod 配置文件  .env不加环境就是所有环境通用的基础变量 
>
>    ```
>    //默认VITE_为前缀的变量才会暴露给经过 vite 处理的代码 默认前缀可以去配置里面改
>    VITE_APP_KEY = 112
>    ```
>
>    
>
> 2. 配置package.json启动命令 --mode prod
>
>    ```
>    {
>        "scripts":{
>            "prod":"vite build --mode prod"
>        }
>    }
>    ```
>
> 3. 配置vite.config
>
>    ```
>    export default defineConfig(({command:"serve"|"build",mode:string})=>{
>    	const env = loadEnv(mode,process.cwd(),prefiexs:'')
>    	//env.VITE_APP_KEY
>    	return envResolver[command]()
>    })
>    ```
>
> 配置成功后,环境变量会被注入到process对象上
>
> vite.config中访问 参考3
>
> 开发页面中访问  impot.meta.env.VITE_APP_KEY

# vite处理css

> vite天生支持对css文件的处理

## 一、处理流程

1. vite在main.js中引用到index.css
2. 使用fs模块去读取index.css内容
3. 创建style标签,将内容copy到style标签中
4. 将css文件中的内容替换为js脚本,方面热更新(hmr)和css模块化,同时设置**Content-Type**为**application/x-javascript**,让浏览器以js形式解析css

## 二、css模块化

> 1. module.css (module是一种约定,表示需要开启css模块化)
> 2. 会将所有类名改为 **类名+hash** 的形式   .class => .class_a_i22st_1
> 3. 同时创建映射对象{class:"class_a_i22st_1"}
> 4. 将替换过后的内容赛新style标签然后放到head标签
> 5. 将模块内未加hash的css内容全部抹除避免影响全局样式
> 6. 将映射对象在脚本默认导出
> 7. 对于sass、less等预处理器,下载对应插件即可



```javascript
{
    css:{
        moudles:{
            localsConcention:"camelCaseOnly",//打包只保留驼峰式
            scopeBehaviour:"local", //设置样式模块化 global为全局样式
            generateScopeName:"[name]_[local]_[hash:5]", //设置类型格式(参考postcss)
            hashPrefix:"superfan", //生成hash的时候根据prefix+name+其他的一些 类似据加密加盐
            globalModulePaths:[], //不想参与模块化的css路径
        }
    }
}
```

## 三、css预处理器配置流程

> preprocessorOptions

```javascript
{
    css:{
        preprocessorOptions:{
			sass:{
				//参考sass官方文档
			},
			less:{
				//参考less官方文档
			}
        }
    }
}
```

## 四、postcss

>在vite中原生支持postcss

**作用**

- 对新版css语法降级
- 前缀补全

[postcss配置参考](https://www.postcss.com.cn/)

[postcss中文文档](https://www.postcss.com.cn/)