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
//初始化默认全选
checkedAll(regionsT);
checkedAll(productsT)
//初始化表格
renderForm(sourceData);

//事件委托增加监听事件
region_wrapper.addEventListener("change",changeData);
product_wrapper.addEventListener("change",changeData);