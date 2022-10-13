# Class

是构造函数的语法糖

在constructor里面可以设置实例自身属性

直接设置的方法是公共的方法 相当于加在构造函数的prototype

方法前面加static 则成为该Class的静态方法 使用时需要Class名.方法



类的继承

Class 类名1(派生类/子类)  extend 类名2(基类/父类) { 在此处可以设置子类独有的东西,可以覆盖父类方法 }     

相当于类1继承类2的

子类如果想在继承constructor的同时添加自己的constructor可在自身的constructor里设置

```javascript
constructor(name,age,like){
    super(name,age);
    this.like=like
}

//在子类中使用super.name可调用父类的name
//在子类中使用this.name可调用自身的name
console.log(super.name) 
console.log(this.nmae)
//继承name和age的同时设置自身的like属性
```

