# smartSeller (我是精明的小卖家（一）)

#### MIS系统 （Management information System）

#### css
* table-layout:fixed        // 允许浏览器更快对表格进行布局(收到第一行即可)
* border-collapse: collapse // 表格边框减少为一条线

#### 事件委托和事件冒泡
* 事件冒泡: 当一个元素接收到事件的时候,会把他接收到事件传递给他的父级...一直到window。
* 事件委托(事件代理): 减少Dom操作次数从而优化性能。原理利用事件冒泡实现的。
```html
<ul id="list">
	<li>123</li>
	<li>173</li>
	<li>234</li>
</ul>

<script>
	var list = document.getElementById("list");
	list.onclick = function(ev) {             //点击任何一个li,通过事件冒泡传递到父级实现，减少Dom操作。
	var ev = ev || window.event;              //保证浏览器兼容
	var target = ev.target || ev.srcElement;  //target为Event内部的属性获取目标节点
	if(target.nodeName.toLowerCase() == "li"){
		alert(target.innerText);
	}

}
//以上就是事件委托无需为每个li添加点击事件,大大减少了Dom操作。
</script>
```

#### Es6模板语法
* (反撇号): 
	* 可以代替字符串''和"" 
	* 可以将值插入最终生成字符串, 如插入name
	`<span>${name}</span>`
	* 支持多行书写
	```
	`
	<h1>title</h1>
	${name}
	<span>content</span>
	`
	```

	




