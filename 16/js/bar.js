//绘制柱状图
function drawBarGraph(data) {
	//console.log(data);
	let bar = document.getElementById('bar');
	bar.innerHTML = '';

	//拿到柱状图最大值Max,根据Max和你用来绘制柱状区域高度，进行数据和像素的折算比例
	let arr = [];
	for(let i=0;i<data.length;i++) {
		if(data[i].region == "华东") {
			let maxNum = Math.max.apply(Math,data[i].sale);
			arr.push(maxNum);
		}
	}
	let Max = Math.max.apply(Math,arr);
	let maxNum = (Math.floor(Max / 100) + 1) * 100; //向上取整归整百

	//绘制横轴线和纵轴线
	let color =['#2ea2f8','#FFBE78','#FFA79F'];
	let month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
	let axislineX = `<line x1='40' y1='340' x2='650' y2='340' stroke='black' /> `;
	let axislineY = `<line x1='40' y1='340' x2='40' y2='20' stroke='black' />`;
	let arrowY = `<line x1='40' y1='20' x2='35' y2='25' stroke='black' />` 
				+ `<line x1='40' y1='20' x2='45' y2='25' stroke='black' />`;
	let arrowX = `<line x1='650' y1='340' x2='645' y2='335' stroke='black' />` 
				+ `<line x1='650' y1='340' x2='645' y2='345' stroke='black' />`;
	let text = `<text x='265' y='20'>柱状图只展示华东地区数据</text>`;

	axislineX += arrowX;
	axislineY += arrowY;

	//绘制横轴坐标刻度
	for(let i=0;i<month.length;i++) {
		let x = 40 + 25 + 50 * i; 
		let scale = `<line x1='${ x }' y1='340' x2='${ x }' y2='345' stroke="black"/>`;
		let mon = `<text x='${x - 13}' y='355' >${month[i]}</text>`; 
		axislineX += scale + mon;
	}
	//绘制纵轴坐标刻度 
	for(let i=0;i<5;i++) {
		let y = 340 - 60 * (i + 1);
		let line = `<line x1='40' y1='${ y }' x2='635' y2='${ y }' stroke='grey' /> `
		let scale = `<line x1='40' y1='${ y }' x2='35' y2='${ y }' stroke="black"/>`;
		let mon = `<text x='12' y='${ y + 4 }' >${ (maxNum / 5) * (i + 1) }</text>`;
		axislineY += scale + mon + line;
	}

	//绘制柱子只限华东区
	let filterData = [];
	let bars = ``;
	for(let i=0;i<data.length;i++) {
		if(data[i].region == "华东")
			filterData.push(data[i].sale);
	}

	for(let i=0;i<filterData.length;i++) {
		for(let j=0;j<filterData[i].length;j++) {
			let bar_width = 40 / filterData.length;
			let ratio = 300 / maxNum; 	           //像素与值的比率
			let top = 40 + (maxNum - filterData[i][j]) * ratio;
			bars += `<rect x='${45+ 50 * j + bar_width * i}' y='${ top }' 
			width='${bar_width}' height='${filterData[i][j]*ratio -1}' style='fill:${color[i]}'/>`;
		}
	}
	bar.innerHTML = axislineX + axislineY + bars + text;

}