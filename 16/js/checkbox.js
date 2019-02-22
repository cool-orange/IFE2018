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