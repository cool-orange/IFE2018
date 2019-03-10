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

/*待优化mouseover*/
/*table_wrapper.addEventListener("mouseover",function(ev) {
	ev = ev || ev.window;
	let target = ev.target || ev.srcElement;
	//console.log(target);
	let arr = [];
	if(target.nodeName.toLowerCase() == 'td') {
		let data = {
			product: "",
			region: "华东",
			sale: []
		};
		for(let i=0;i<14;i++) {
			let num = target.parentNode.children[i].innerText;
			if(i == 0) 
				regions.indexOf(num) != -1 ? data.region = num : data.product = num;
			else if (i == 1) 
				regions.indexOf(num) != -1 ? data.region = num : data.product = num;
			else {
				data.sale.push(num);
			}
		}
		arr.push(data);
		drawBarGraph(arr);
		drawLineGraph(arr);
	}
	
})
*/