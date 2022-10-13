# Vue cli安装

### 一、安装

**（1）Node 版本要求**

Vue CLI 4.x 需要 Node.js v8.9 或更高版本 (推荐 v10 以上)。

下载安装nodeJs，**中文官方**下载地址：http://nodejs.cn/download/

（2）全局安装过旧版本的 `vue-cli`(1.x 或 2.x)要先卸载它，否则跳过此步：

```
npm uninstall vue-cli -g 

//或者 

yarn global remove vue-cli
```

　　

（3）安装[@vue](https://github.com/vue)/cli（Vue CLI 3的包名称由 `vue-cli` 改成了 `@vue/cli`）

```
 npm install -g @vue/cli   
 //or
 yarn global add @vue/cli
```

安装之后，你就可以在命令行中访问 vue 命令。你可以通过简单运行 vue，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

```
　vue -V   检查vue版本号
```

### 二、升级

如需升级全局的 Vue CLI 包，请运行：

```json
npm update -g @vue/cli

# 或者
yarn global upgrade --latest @vue/cli
```

修改powershell权限:

```javascript
1.先以管理员身份运行
2.运行：set-ExecutionPolicy RemoteSigned
选A
```