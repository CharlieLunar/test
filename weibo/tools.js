var tools = {
	/*获取窗口宽高*/
	getBody : function () {
		return {
			width : document.documentElement.clientWidth || document.body.clientWidth,
			height : document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	/* 给元素设置样式
	 * obj <DOM Object> 要设置样式的元素
	 * attrObj <object> 设置的样式，如 {"width" : "200px", "height" : "300px"}
	 */
	setStyle : function (obj, attrObj) {
		for(var key in attrObj) {
			obj.style[key] = attrObj[key];
		}
	},
	/*使元素在窗口范围绝对居中
	*obj <DOM Object>需要居中的元素
	*/
	showCenter(obj){
		//让元素显示
		obj.style.display = "block";
		let _this = this;
		function center(){
			obj.style.position = "absolute";
			//居中
			var	_left = (_this.getBody().width - obj.offsetWidth) / 2;
			var	_top = (_this.getBody().height  - obj.offsetHeight) / 2;
			
			obj.style.top = _top + "px";
			obj.style.left = _left + "px";
		};
		center();
		// 窗口大小发生改变的时候重新计算坐标
		window.onresize = center;
	}
	
}
