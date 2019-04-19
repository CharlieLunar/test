function Drag (obj, title) {
	this.obj = obj;
	this.title = title ? this.obj.querySelector(title) : obj;
}
Drag.prototype = Object.assign(Drag.prototype, {
	init : function () {
		var _this = this;
		this.title.onmousedown = function (e) {
			// 获取鼠标距离元素左上角的坐标
			var disX = e.offsetX,
				disY = e.offsetY;
			document.onmousemove = function (e) {
				var _top = e.clientY - disY,
					_left = e.clientX - disX;
				_this.move(_top, _left);
			}
			// 鼠标抬起，move失效
			document.onmouseup = function () {
				document.onmousemove = null;
			}
			// 阻止默认事件
			return false;
		}
	},
	move : function (top, left) {
		// 边界限制
		if(left < 0) left = 0;
		if(top < 0) top = 0;
		// 窗口宽度减去盒子自身宽度
		if(left > tools.getBody().width - this.obj.offsetWidth) left = tools.getBody().width - this.obj.offsetWidth;
		if(top > tools.getBody().height - this.obj.offsetHeight) top = tools.getBody().height - this.obj.offsetHeight;
		tools.setStyle(this.obj, {
			left : left + "px",
			top : top + "px"
		})
	}
})