# axios中的qs用法

## 一、什么时候需要用qs进行序列化：

#### axios默认的content-type是application/json,即json格式，后台可以使用字符串进行接收，然后再解析即可：

###### 默认（不使用qs）：

```javascript
发送请求：
export const getOutList = params => {
    return service.post(launchReciveApiConfig.getOutList, params);
}


后台接收：使用字符串接收后，通过json方法获取需要数据即可
@PostMapping("/getOutList")
@ResponseBody
public AjaxResult getOutList(@RequestBody String params) {
    Map map = JSONObject.parseObject(params);
    String name = map.get("name").toString();
    //...
}


传递的数据格式如下（json格式）：
{
    name:xxx,
    age:xxx
}
```

### 使用qs.stringify解析后，content-type是application/x-www-form-urlencoded,即form表单格式，后台可以使用实体进行接收：

##### 使用qs：将数据序列化成url格式

```javascript
发送请求：
export const editOut = params => {
    return service.post(launchReciveApiConfig.editOut, qs.stringify(params));
}


后台接收：使用TOut实体类接收即可
@PostMapping("/editOut")
@ResponseBody
public AjaxResult editOut(TOut tOut) {
    //...
}


传递的数据格式如下（form表单格式）：
name:xxx&age:xxx
```

##### 所以,实际上是否需要用qs去序列化参数完全取决于后端要怎么接受数据。

## 二、qs.parse方法：

###### qs.parse()将URL解析成对象的形式；

```javascript
let url = 'name:xxx&age:xxx'
console.log(qs.parse(url));
输出：
{
    name:xxx,
    age:xxx
}
```