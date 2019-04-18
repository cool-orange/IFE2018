var region_wrapper = document.getElementById("region-radio-wrapper");
var product_wrapper = document.getElementById("product-radio-wrapper");
var table_wrapper = document.getElementById("table-wrapper");


var regions = ["华东","华北","华南"];
var products = ["手机","笔记本","智能音箱"];


//初始化生成checkboxs
generateCheck(region_wrapper,regions,"地区:");
generateCheck(product_wrapper,products,"商品:");

var regionsT = region_wrapper.querySelectorAll("input[type=checkbox]");
var productsT = product_wrapper.querySelectorAll("input[type=checkbox]");

//初始化默认第一个备选
regionsT[1].checked = true;
productsT[1].checked = true;

var data = getData()
//初始化表格
renderForm(data);
drawBarGraph(data);
drawLineGraph(data);

//事件委托增加监听事件
region_wrapper.addEventListener("change",changeData);
product_wrapper.addEventListener("change",changeData);

/*鼠标悬浮mouseover变化数据添加编辑按钮*/
table_wrapper.addEventListener("mouseover",function(ev) {
	ev = ev || ev.window;
	let target = ev.target || ev.srcElement;
	let arr = [];
	if(target.nodeName.toLowerCase() == 'td') {
		let text = target.innerText;
		let reg1 = /\d+/i,
			reg2 = /\D+/i;
		let edit = '<i class="fa fa-edit"></i>';
		if(reg1.test(text)) {
			target.innerHTML = target.innerText + edit;
			let data = {
				product: "",
				region: "华东",
				sale: []
			};
			let len = target.parentNode.children.length;
			if(len == 14) {
				for(let i=0;i<14;i++) {
					let num;
					
					i > 1 ?	num = target.parentNode.children[i].innerHTML.replace(reg2,"") : 
					num = target.parentNode.children[i].innerText;
					
					if(i == 0) {
						regions.indexOf(num) != -1 ? data.region = num : data.product = num;
 					}
					else if (i == 1) {
						regions.indexOf(num) != -1 ? data.region = num : data.product = num;
					}
					else {
						data.sale.push(num);
					}
				}
				/*更改checkbox的状态*/
				changeCheckBox(data.region,data.product);
			}
			if(len == 13) {
				for(let i=0;i<13;i++) {
					let num;
					
					i > 1 ?	num = target.parentNode.children[i].innerHTML.replace(reg2,"") : 
					num = target.parentNode.children[i].innerText;

					if(i == 0)
						regions.indexOf(num) !=-1 ? data.region = num : data.product = num;
					else {
						data.sale.push(num);
					}
				}
				/*更改checkbox的状态*/
				changeCheckBox(data.region,data.product);	
			}
			
			arr.push(data);
			drawBarGraph(arr);
			drawLineGraph(arr);
		}
		
		target.addEventListener("mouseleave",function(ev) {
				ev = ev || ev.window;
				let target = ev.target || src.srcElement;
				let reg1 = /\d+/i,
					reg2 = /\D+/g;
			
				if(target.innerHTML.search(reg1) != -1){
					target.innerHTML = target.innerHTML.replace(reg2,"");
				}
		})
			
	} 
});

table_wrapper.addEventListener("click",function(ev) {
	ev = ev || ev.window;
	let target = ev.target || src.srcElement;
	if(target.nodeName.toLowerCase() == 'i') {
		let td = target.parentNode;
		localStorage.setItem('data',td.innerText);
		td.innerHTML = `<input type='text' value='${td.innerText}' />` + `<button>确定</button>` + `<button>取消</button>`;
		
		let define = td.childNodes[1]; 
		let cancel = td.childNodes[2];

	
		define.onclick = function() {
			let input = td.childNodes[0];
			if(isNaN(input.value))
				alert("Not a Number");
			else {
				td.innerHTML = input.value;
				let data =getData();
				drawBarGraph(data);
				drawLineGraph(data);
			}
		};
		cancel.onclick = function() {
			td.innerHTML = localStorage.getItem('data');
		};

		/*键盘事件*/
		this.onkeydown = function() {
			if(event.keyCode == "27")
				cancel.onclick();
			if(event.keyCode == "13")
				define.onclick();
		}

	}
});