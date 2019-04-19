class Carousel{
	constructor(selector){
		this.container = document.querySelector(selector);
		this.btns = this.container.querySelector("ol").children;
		this.imgs = this.container.querySelector("ul").children;
		this.goNext = document.querySelector("#goNext");
		this.goPrev = document.querySelector("#goPrev");
		
		this.lastIndex = 0;//上一次按钮
		this.index = 0;//当前按钮
		this.prelIndex = 0;//上上次按钮
		
		this.bindEvents();
	}
	
	//绑定事件
	bindEvents(){
		this.btnClick();
		this.goPrevClick();
		this.goNextClick();
		this.autoPlay();
		this.Clear();
		this.reStart();
	}
	
	//点击按钮
	btnClick(){
		let _this = this;
		Array.from(this.btns).forEach(function(btn,i){
			btn.onclick = () => {
				i > _this.index ? _this.changeImg(i) : _this.rechangeImg(i);//判断当前i是否大于上一个i，执行向前或者向后
			}
		})
	}
	
	//点击上一张按钮
	goPrevClick(){
		this.goPrev.onclick = () => {
			//判断当前图片是否是第一张，若是，点击上一张则返回最后一张
			this.index = this.index-1 < 0? this.btns.length-1 : this.index-1;
			this.rechangeImg(this.index);
		}
	}
	
	//点击下一张按钮
	goNextClick(){
		this.goNext.onclick = () => {
			//判断当前图片是否为最后一张，若是，点击下一张返回第一张
			this.index = this.index+1 > this.btns.length-1 ? 0 : this.index+1;
			this.changeImg(this.index);
		}
	}
	
	//下一张
	changeImg(i){
		this.index=i;
		//去掉上一张和上上张动画效果
		this.imgs[this.prelIndex].classList.remove("ani1");
		this.imgs[this.lastIndex].classList.remove("ani");
		this.imgs[this.prelIndex].classList.remove("reAni1");
		this.imgs[this.lastIndex].classList.remove("reAni");
		//给当前图片加上动画效果
		this.imgs[i].classList.add("ani");
		this.imgs[this.lastIndex].classList.add("ani1");
		
		this.btns[this.lastIndex].classList.remove("ac");//清除上一次点击按钮的样式
		this.btns[i].classList.add("ac");//添加当前点击按钮的样式
		this.imgs[this.lastIndex].classList.remove("ac");//清除上一次的图片样式
		this.imgs[i].classList.add("ac");//给当前图片加上ac中的样式
		 //把上一张变成上上张，并且把当前张变成上一张
		this.prelIndex=this.lastIndex;
		this.lastIndex=i;
	}
	
	rechangeImg(i){
		this.index=i;
		this.imgs[this.prelIndex].classList.remove("reAni1");
		this.imgs[this.lastIndex].classList.remove("reAni");
		this.imgs[this.prelIndex].classList.remove("ani1");
		this.imgs[this.lastIndex].classList.remove("ani");
			
		this.imgs[i].classList.add("reAni");
		this.imgs[this.lastIndex].classList.add("reAni1");
		
		this.btns[this.lastIndex].classList.remove("ac");//清除上一个
		this.btns[i].classList.add("ac");//添加当前
		this.imgs[this.lastIndex].classList.remove("ac");
		this.imgs[i].classList.add("ac");
		
		this.prelIndex=this.lastIndex;
		this.lastIndex=i;
	}
	//自动播放
	//每两秒自动触发下一张点击按钮
	autoPlay(){
		this.timer = setInterval(() => {
			this.goNext.onclick();
		},2000)
	}
	//鼠标移入清除定时器
	Clear(){
		this.container.onmouseover = () => {
			clearInterval(this.timer);
		}
	}
	//鼠标移出重启定时器
	reStart(){
		this.container.onmouseout = () => {
			this.autoPlay();
		}
	}
}
new Carousel("#div1");