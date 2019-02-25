# flex布局(display:flex)
* 父容器属性
	* flex-direction:决定项目排列的方向
	* flex-wrap
		* wrap:换行,第一行在上方。
		* nowrap:不换行。
		* wrap-reverse:换行,第一行在下方。
	* flex-flow:(flex-direction 和 flex-wrap结合)
	* justify-content:定义项目在主轴上的定义方式。
		* flex-start
		* center
		* flex-end
		* space-between:两端对齐，项目之前间隔相等
		* space-around:每个项目的间隔相等
	* align-items:定义项目在交叉轴如何对齐
		* flex-start
		* flex-end
		* center
		* baseline:项目第一行的基线对齐
		* stretch:如果项目未设置高度或auto,将占满整个容器
* 子容器属性(项目)
	* order: 定义项目的排列顺序;数值越小、排列越靠前.
	* flex-grow: 属性定义项目的放大比例.
	* flex-shrink: 属性定义了缩小比例.
	* flex-basis: 定义了在分配多余空间之前，项目占据主轴的大小，可设定如100px等.


