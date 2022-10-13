vue

vue中常用的常用方法 .some .every .findIndex .reduce .map .filter .includes

<hr>

#### computed 计算属性

(1)computed 是依赖于data数据的计算属性,只要是data数据发生了变化,那么computed的值也会发生变化

(2)computed 默认有get和set ,一般情况下set是可以省略的. 可以写成函数的形式,写的时候像方法,使用的时候像属性

(3)computed是有缓存的,只要数据不发生变化直接使用的缓存的数据,数据发生变化会重新计算

```javascript
        computed:{
            name:{
                get(){
                //...
                },
                set(value){
                //...
                }
            },
        }
```

#### watch  监听

监听一个数据的变化从而引起另外一个数据的变化

```javascript
watch:{
    //handler函数
    handler(){};
    //立即监听
    immediate:true;
    //深度监听
    deep.true; 
}
```

#### 生命周期

- 创建期间的生命周期函数：
  - beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
  - created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板(模板 比如`{{}}`)
  - beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中
  - mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示
- 运行期间的生命周期函数：
  - beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
  - updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！
- 销毁期间的生命周期函数：
  - beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
  - destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
