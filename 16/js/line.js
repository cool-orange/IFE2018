function drawLineGraph(data) {
	let canvas = document.getElementById('line').getContext('2d');
    canvas.font = '12px Microsoft YaHei';
    canvas.clearRect(0,0,700,400);
    canvas.beginPath();
    canvas.strokeStyle = "black";
	canvas.fillStyle = "black";
  	canvas.fillText('折线图只展示华东地区数据', 285, 20 );

  	//拿到折线图最大值Max,根据Max和你用来绘制柱状区域高度，进行数据和像素的折算比例
	let arr = [];
	for(let i=0;i<data.length;i++) {
		if(data[i].region == "华东") {
			let maxNum = Math.max.apply(Math,data[i].sale);
			arr.push(maxNum);
		}
	}

	let Max = Math.max.apply(Math,arr);
	let maxNum = (Math.floor(Max / 100) + 1) * 100; //向上取整归整百
	let color =['#2ea2f8','#FFBE78','#FFA79F'];
	let month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

	//绘制横轴线
	canvas.moveTo(35, 340);
	canvas.lineTo(650, 340);
	canvas.lineTo(645, 335);
	canvas.moveTo(650, 340);
	canvas.lineTo(645, 345);
	//绘制纵轴线
	canvas.moveTo(40, 340);
	canvas.lineTo(40, 20);
	canvas.lineTo(45, 25);
	canvas.moveTo(40, 20);
	canvas.lineTo(35, 25);

	//绘制横轴坐标刻度
	for(let i=0;i<month.length;i++) {
		let x = 40 + 50 * i;
		canvas.moveTo(x, 340);
		canvas.lineTo(x, 345);
		canvas.fillText(month[i],x-13, 355);
	}
	//绘制纵轴坐标刻度 
	for(let i=0;i<5;i++) {
		let y = 340 - 60 * (i + 1);
		canvas.moveTo(40, y); canvas.lineTo(635, y);
		canvas.globalAlpha = 1;
		canvas.moveTo(40, y); canvas.lineTo(35, y);
		canvas.fillText((maxNum / 5) * (i + 1), 12, y + 4);
	}
	canvas.fillText(0,18,340);
	canvas.closePath();
	canvas.stroke();

	let filterData = [];
	for(let i=0;i<data.length;i++) {
		if(data[i].region == "华东")
			filterData.push(data[i].sale);
	}

	let ratio = 300 / maxNum; 	           //像素与值的比率
	let last_x, last_y;
	for(let i=0;i<filterData.length;i++) {
		canvas.fillStyle = `${color[i]}`;
		canvas.strokeStyle = `${color[i]}`;		
		for(let j=0;j<filterData[i].length;j++) {
			let y = 40 + 300 - (filterData[i][j]) * ratio;
			if(j == 0) {
				canvas.beginPath();
				canvas.arc(40, y, 4, 0, 2 * Math.PI,true);
				canvas.fill();
			} else {
				canvas.beginPath();
				canvas.arc(40 + 50 * j, y, 4, 0, 2 * Math.PI,true);
				canvas.moveTo(last_x,last_y);
				canvas.lineTo(40 + 50 * j, y);
				canvas.stroke();
				canvas.fill();
			}
			//记录当前数据点位置用于下次连线
			last_x = 40 + 50 * j;
			last_y = y;
					
		}
	}
	
 }

