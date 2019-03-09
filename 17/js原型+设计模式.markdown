# js关于原型(prototype)
* 所有函数都有个特殊属性prototype(原型),prototype为指针指向一个原型对象,原型对象中的属性和方法都可以被函数实例共享。
```js
//原始构造函数
function func() {
	this.name = "orange";
}
//原型
func.prototype.name = "apple";
func.prototype.getName = function() {
	return this.name;
}

var a = new func();

console.log(a.name); =>orange //在实例化对象找

console.log(a.getName()) =>orange //先在实例化对象找,没找到，到原型上找

console.log(a.sex); => undefined //实例化和原型都没找到

delete a.name;
console.log(a.name) =>apple; delete删除的是实例化对象，取到原型属性。

//构造函数添加方法
function func(name) {
	this.name = name
	this.introduce = function() {
		console.log("我的名字是"+this.name);
	}
}
var a = new func("orange");
var b = new func("apple");

a.introduce==b.introduce => false

//原型添加方法
func.prototype.introduce = function() {
	console.log("我的名字是"+this.name);
}

a.introduce==b.introduce => true
区别是原型是共享代码，构造函数是每个对象一份独立的代码，占用资源很大。

注意：原型添加方法不能访问私有变量和方法.
```
* instanceof:A instanceof B 意思是A的原型链上是否包含B的prototype
* 原型链:实现继承的方式
* 对象的三大特征:封装、继承、多态、抽象.
	* 封装性
	```
	function Person(name,age) {
		this.name = name; //公开
		var age = age  //私有
		this.show() = function() {  //公开
			console.log(this.name);
		}
		function get() {   //私有
			console.log("hello")
		}
	}
	var a = new Person(orange,12);
	console.log(a.name,a.age); => orange,undefined
	```
	* 继承性:可以解决代码复用
		* 对象冒充
		```
		function Stu(name,age) {
			this.name =name;
			this.age = age;
			this.show = function() {
			    console.log(this.name,this.age);
			}
		}
		function midStu(name,age) {
			this.stu=Stu; //获取Stu的所有类成员
			this.stu(name,age);
		}
		```
		* call和apply
		```
		//改写midStu
		function midStu(name,age) {
			Stu.call(this,name,age)或者Stu.apply(this,[name,age]); //this指向了调用者本身
		}
		```
		* 原型继承
		```
		function stu() {
    		this.color = 'red';
    	}
    	function B(){};
    	B.prototype = new A(); //B继承A 
    	console.log(b.color);  // red
    	缺陷:每个类型只有一个原型,无法多重继承.占用内存.
		```
		* 复制继承
		```
		function stu() {
			this.color = 'red';
		}
		stu.prototype.show = function() {
			console.log(this.color);
		}
		var a = new stu();
		var b = [];
		for(var item in a){
			b[item] = a[item];
		}
		```
		* 多态性:js函数不支持多态,同名函数以最后一个函数为准。
* es6利用class创建类
```
class Person {
	constructor(name,age) {
		this.name = name;
		this.age =age;
	}

	say() {
		return this.name + this.age;
	}
}

class Stu extends Person {  
	constructor(name,age,id){
		super(name,age);
		this.id = id;
	}
	say() {
		this.id + super.say();
	}
}
//子类必须在constructor中调用super方法，否则新建实例报错
```
* js立即函数
	* (function(){ ... }()) 和 (function(){ ...})( )等价.
* js的设计模式
	* 单例模式:保证一个类仅有一个实例，并且提供唯一一个访问它的全局访问点。	
	```js
	var single = function(name) {
		this.name =name;
	}
	single.Mode = (function() {  //利用闭包特性建立单例模式  
		var flag;
		return function(name) {
			if(!flag){
				flag = new single(name);
			}
			return flag;
		}
	})();
	var a = single.Mode('orange');
	//实现模块通信(学校回家)
	var home = (function() {
		var road;
		function construct(bike) {
			this.transportation = bike;
		}
		return function(bike) {
			if(!road){
				road = new construct(bike); 
			}
			return road;
		}
	})();
	var school = {
		goback:function(transportation){
			var transportation = home(transportation);
			console.log(transportation.transportation);
		}
	}
	school.goback('bike');
	```
 