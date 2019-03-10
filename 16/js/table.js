//清除表格数据
function clearTable() {
	let table =document.querySelector("table");
	table_wrapper.removeChild(table);
}


//渲染新表格
function renderForm(data) {
	let table = document.createElement("table");
	let thead = document.createElement("thead");
	let tbody = document.createElement("tbody");
	let tr = document.createElement("tr");
	let str = ["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

	table.appendChild(thead);
	table.appendChild(tbody);
	table.setAttribute("cellspacing","0"); //使单元格之间没有空隙   2

	thead.appendChild(tr);

	//改变输出列顺序
	let len_region = checkedLength(regionsT);
	let len_product = checkedLength(productsT);
    
	//单独情况
	if(len_region<len_product && len_region == 1) {
		//改变输出列顺序
		let temp = str[1];
		str[1] = str[0];
		str[0] = temp;

		for(let i=0;i<str.length;i++){
			//console.log(str[i]);
			var th = document.createElement("th");
			th.innerHTML = str[i];
			tr.appendChild(th);
		}

		for(let i=0;i<data.length;i++){
			let tr = document.createElement("tr");
			if(i % len_product == 0){
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				td1.innerHTML = data[i].region;
				td2.innerHTML = data[i].product;
				td1.setAttribute("rowspan",len_product);
				tr.appendChild(td1);
				tr.appendChild(td2);
			} else {
				let td1 = document.createElement("td");	
				td1.innerHTML = data[i].product;
				tr.appendChild(td1);
			}
			for(let j=0;j<data[i].sale.length;j++){
				let td = document.createElement("td");
				td.innerHTML = data[i].sale[j];
				tr.appendChild(td);
			}		
			tbody.appendChild(tr);
		}
		table_wrapper.appendChild(table);
	} else {
		for(let i=0;i<str.length;i++){
			var th = document.createElement("th");
			th.innerHTML = str[i];
			tr.appendChild(th);
		}

		for(let i=0;i<data.length;i++){
			let tr = document.createElement("tr");
			if(i % len_region == 0){
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				td1.innerHTML = data[i].product;
				td2.innerHTML = data[i].region;
				td1.setAttribute("rowspan",len_region);
				tr.appendChild(td1);
				tr.appendChild(td2);
			} else {
				let td1 = document.createElement("td");	
				td1.innerHTML = data[i].region;
				tr.appendChild(td1);
			}
			for(let j=0;j<data[i].sale.length;j++){
				let td = document.createElement("td");
				td.innerHTML = data[i].sale[j];
				tr.appendChild(td);
			}		
			tbody.appendChild(tr);
		}
		table_wrapper.appendChild(table);
	}

}


