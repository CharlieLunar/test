class Publish{
	constructor(selector){
		this.btn = document.querySelector(selector);//找到点击发表日志按钮
		this.box = document.querySelector("#box");
		this.bindEvents();
	}
	bindEvents(){
		//给发表按钮绑定事件
		let _this = this;
		this.btn.onclick = function(){
			//点击按钮时给box插入内容
			_this.box.innerHTML = '<h4>发布微博</h4>'+
			'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
			'<p><label>用户名：<input class="username" type="text"></label></p>'+
			'<p><label>内容： <input class="maintext" type="text" ></label></p>'+
			'<p><button id="pubBtn" class="pub_Btn" type="button">确认发布</button></p>';
			//让box居中显示在页面中
			tools.showCenter(_this.box);
			//创建模态层
			_this.modal = document.createElement("div");
			_this.modal.className = "modal";
			document.body.appendChild(_this.modal);
			new Drag(_this.box, "h4").init();
			
		}
		// 给删除按钮绑事件（事件委托）
		this.box.onclick = function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			// case穿透
			switch(target.className) {
				case "pub_Btn":
					let username = document.querySelector(".username").value;
					let maintext= document.querySelector(".maintext").value;
					document.write(maintext);
				case "close_btn" :
					_this.box.style.display = "none";
					_this.modal.remove;
			}	
		}
	}
}
new Publish("#publish");