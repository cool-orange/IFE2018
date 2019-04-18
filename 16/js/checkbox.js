//监听checkbox选项改变更新表格和图表
function changeData() {
	let data = getData();
	clearTable();
	renderForm(data);
	drawBarGraph(data);
	drawLineGraph(data);
}

//获取checkbox筛选后数据
function getData() {	
	let res = [];
	let strR = [];
	let strP = [];

	strR = getValue(regionsT);
	strP = getValue(productsT);

	for(let i=0;i<sourceData.length;i++) {
		if(strR.indexOf(sourceData[i].region) != -1 ){
			res.push(sourceData[i]);
			if(strP.length!=0 && strP.indexOf(sourceData[i].product) == -1)
				res.pop();
		}
		if(strP.indexOf(sourceData[i].product)!=-1 ){
			res.push(sourceData[i]);
			if(strR.length!=0 && strR.indexOf(sourceData[i].product) == -1)
				res.pop();
		}
	}
	return res;
}

//获取checked为true的value值
function getValue(checkboxs) {
	let res = [];
	for(let i=0;i<checkboxs.length;i++) {
		if(checkboxs[i].checked == true) {
			res.push(checkboxs[i].value);
		}
	}
	return res;
}

//全选checkbox逻辑
function checkedAll(checkboxs) {
    let len = checkedLength(checkboxs);
    if(len != 4){  
    	for(let i=0;i<checkboxs.length;i++)
			checkboxs[i].checked = true;
	}
}

//检查不包括全选的checked的个数
function checkedLength(checkboxs) {
	let length = 0;
	for(let i=1;i<checkboxs.length;i++){
		if(checkboxs[i].checked)
			length++;
	}
	return length; 
}

/*更改checkbox的状态*/
function changeCheckBox(region,product) {
	for(let i=0;i<regionsT.length;i++) {
		if(regionsT[i].value == region)
			regionsT[i].checked = true;
		else
			regionsT[i].checked = false;
	}
	for(let i=0;i<productsT.length;i++) {
		if(productsT[i].value == product)
			productsT[i].checked = true;
		else
			productsT[i].checked = false;
	}
}

//生成checkboxs
function generateCheck(wrapper,arr,str) {
	let html1 = `
	<span>${str}</span>
	<label><input type='checkbox' value=${str} checkbox-type='all'>全选</label>`;
	let html2 = ``;

	for(let i=0;i<arr.length;i++) {
		html2 += `<label><input type='checkbox' value=${arr[i]} checkbox-type='single'>${arr[i]}</label>`;
	}
	wrapper.innerHTML = html1 + html2;

	wrapper.onclick = function(ev) {     //事件委托父级
		ev = ev || ev.window;
		let target = ev.target || ev.srcElement;
		
		if(target.nodeName.toLowerCase() == "input") {
			let subCheckboxs = this.querySelectorAll("input[type=checkbox]"); 

			if(target.getAttribute("checkbox-type") == "all")　{ 
				checkedAll(subCheckboxs);
			} else{
				let len = checkedLength(subCheckboxs);

				switch(len) {
					case 0: 
							target.checked = true;
							break;
					case 2: 
							subCheckboxs[0].checked = false;
							break;
					case 3: 
							subCheckboxs[0].checked = true;
							break;
				}
				
			}

		}
	}
}

