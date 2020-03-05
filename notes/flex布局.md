# flex布局

### 常见属性
* justify-content：沿主轴的排列叫`排布`，主轴由flex-direction有关
* align-items：沿辅轴的排列叫`对齐`，辅轴由flex-direction有关
* flex-wrap: 是否换行
* flex-grow：定义项目的放大比例
* flex-shrink：定义项目的缩小比例
* flex-basis：定义了在分配多余空间之前，项目占据主轴的大小，可设定如100px等

### 常见问题
* align-items和align-self有什么区别  
前者是作用于所有的子项目，后者是针对个别项
* order的作用是什么  
定义子项目在父容器中的排列顺序，数值越小，排列越靠前
* flex设定的值有哪些情况  
```
flex简写属性可一次性设置flex-grow、flex-shrink、flex-basis，默认为0 1 auto
1. flex: none <=> flex: 0 0 auto
2. flex: auto <=> flex: 1 1 auto
3. flex: 1 <=> 1 1 0%
4. flex: 0%或0px <=> 1 1 0% / 1 1 0px
5. flex: 2 3 <=> flex: 2 3 0%
6. flex: 2 3px <=> flex: 2 1 3px
```
* flex设定属性的算法  
```
1. 检查flex-basis，确定假想的主尺寸
2. 确定实际的主尺寸。如果按照flex-basis设定排布之后，还有剩余空间，则由flex-grow系数决定；同理，装不下那么多项，由flex-shrink决定
```
