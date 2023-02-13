# Ⅴ-Ant Design

## 1、相关文档

>### ant-design(国内蚂蚁金服)
>
>1. 官网: https://ant.design/index-cn
>2. Github: https://github.com/ant-design/ant-design/
>
>### material-ui(国外)
>
>1. 官网: http://www.material-ui.com/#/
>
>2. github: https://github.com/callemall/material-ui

## 2、按需引入与自定义主题

### Ⅰ-安装依赖

> yarn add react-app-rewired customize-cra babel-plugin-import less less-loader

### Ⅱ-修改package.json

>```json
>	"scripts": {
>	"start": "react-app-rewired start",
>	"build": "react-app-rewired build",
>	"test": "react-app-rewired test",
>	"eject": "react-scripts eject"
>	},
>```

### Ⅲ-根目录下创建config-overrides.js

>注意:如果按照官方文档的自定义主题进行配置可能会报错,需要多加一层`lessOptions`
>
>```js
>//配置具体的修改规则
>const { override, fixBabelImports,addLessLoader} = require('customize-cra');
>module.exports = override(
>	fixBabelImports('import', {
>		libraryName: 'antd',
>		libraryDirectory: 'es',
>		style: true,
>	}),
>	addLessLoader({
>		lessOptions:{
>			javascriptEnabled: true,
>			modifyVars: { '@primary-color': 'green' },
>		}
>	}),
>-------------------官方方法,会报错-------------------------    
>+ addLessLoader({
>+   javascriptEnabled: true,
>+   modifyVars: { '@primary-color': '#1DA57A' },
>+ }),
>---------------------------------------------------------   
>);
>```

### Ⅳ-成功

> 备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉