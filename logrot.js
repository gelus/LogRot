// JavaScript Document
function logrot(id, option){
	
	//option defaults
	this.option = (option==undefined)? {}:option;
	this.option.fade = (this.option.fade==undefined)? false:this.option.fade;
	
	
	var self = this;
	this.speed = -1;
	this.orgspeed = this.speed;
	
	this.ul = document.getElementById(id);
		this.box = this.ul.parentNode;
			this.box.style.position = "relative";
			this.box.style.overflow = "hidden";		
			//close parentNode setup	
		this.ul.style.position = "absolute";		
		this.ul.style.left = "0px";
		this.ul.style.width = this.box.offsetWidth+"px";
		this.ul.style.height = "10px";
		this.ul.style.listStyle = "none";
		this.ul.style.padding = "0";
		this.ul.style.margin = "0";
		//close setup for ul
		var exWidth = 0;
	this.items = this.ul.getElementsByTagName("li");
		for(var i = 0; i < this.items.length; i++){
			var istyle = this.items[i].style;
			istyle.display = "inline-block";
			istyle.padding = 0;
			istyle.styleFloat = "left";
			istyle.cssFloat = "left";
			istyle.marginLeft = 0;
			istyle.width = (Math.floor(this.ul.offsetWidth/this.items.length)>this.items[i].offsetWidth)? 
											Math.floor(this.ul.offsetWidth/this.items.length)+"px":
											this.items[i].offsetWidth+"px";
			istyle.textAlign = "center";
			
			exWidth += this.items[i].offsetWidth;
			
			}//close setup for each item
		this.ul.style.width = exWidth+20+"px";
		for(var i = 0; i < this.items.length; i++){
			for(var x = 0; x < this.items.length; x++){
				this.box.style.height = parseInt(this.ul.style.height)+"px";
				this.ul.style.height = (this.items[x].offsetHeight > parseInt(this.ul.style.height)  || x == 0)? this.items[x].offsetHeight+"px":this.ul.style.height;
				}
			this.items[i].style.marginTop = (parseInt(this.ul.style.height)/2 - this.items[i].offsetHeight/2) + "px";
			}//for to align horizontally
			//close Itemsetup
	//make copy
	this.ul2 = this.ul.cloneNode(true);
		this.ul2.setAttribute('id', this.ul.id+"2")
		this.items2 = this.ul2.getElementsByTagName("li");
		this.box.appendChild(this.ul2);
		this.ul2.style.left = (this.speed < 0)? this.ul.offsetLeft+this.ul.offsetWidth+"px":-this.ul.offsetWidth+"px";
	
	this.move = function(){
		var newleft = parseInt(self.ul.style.left)+self.speed;
		var newleft2 = parseInt(self.ul2.style.left)+self.speed;
		if(self.speed < 0){
			if(newleft2+this.ul2.offsetWidth <= 0 || newleft+this.ul.offsetWidth <= 0){
				newleft = 0;
				self.ul.style.left = newleft+"px";
				self.ul2.style.left = newleft+self.ul.offsetWidth+"px";
				return;
				}
			}
		else if(self.speed > 0){
			if(newleft2 >= this.ul2.offsetWidth || newleft >= this.ul.offsetWidth){
				newleft = 0;
				self.ul.style.left = newleft+"px";
				self.ul2.style.left = newleft-self.ul.offsetWidth+"px";
				return;
				}
			}
		self.ul.style.left = newleft+"px";
		self.ul2.style.left = newleft2+"px";
		}
		
	this.ticker = function(){
		requestAnimationFrame(self.ticker);
		self.move();
		}
	this.ticker();
	
	this.getScrollTop = function(){
			if(typeof pageYOffset!= 'undefined'){
					//most browsers
					return pageYOffset;
			}
			else{
					var B= document.body; //IE 'quirks'
					var D= document.documentElement; //IE with doctype
			D= (D.clientHeight)? D: B;
					return D.scrollTop;
			}
	}
	
	this.slowing = function(){
		
		if(parseInt(self.speed) > self.orgspeed){self.speedCalc -= .1;}
		else if(parseInt(self.speed) < self.orgspeed){self.speedCalc += .1}
		self.speed = Math.floor(self.speedCalc);
		if (Math.floor(self.speedCalc) == self.orgspeed)self.box.slowing = false;
		if(self.box.moused == false && self.box.slowing == true){requestAnimationFrame(self.slowing);}
		}
	this.noMousey = function(e){
		var height = this.box.offsetHeight, top = this.box.offsetTop-self.getScrollTop(), bottom = top+height;
		var width = this.box.offsetWidth, left = this.box.offsetLeft, right = left+width;
		var Xmousepos = e.clientX, Ymousepos = e.clientY;
		
		if(Xmousepos<left+10||Xmousepos>right-10||Ymousepos<top+3||Ymousepos>bottom-3){
			self.box.moused = false;
			self.box.slowing = true;
			self.speedCalc = self.speed;
			self.slowing();
			}
		}
	this.mousey = function(e){
		self.box.moused = true;
		self.box.slowing = false;
		var width = this.box.offsetWidth, left = this.box.offsetLeft, right = left+width;
		var XmousePos = e.clientX, XmouseRelPos = (XmousePos - left);
		prec = parseInt(((XmouseRelPos)/width*100)-50);
		this.speed = (prec/5 >= 0)? Math.ceil(prec/5):Math.floor(prec/5);
		if(this.speed === 0)this.speed++;
		}
	//events:
		if(window.addEventListener){
			this.box.addEventListener("mousemove", function(event){self.mousey(event)}, false);
			this.box.addEventListener("mouseout", function(event){self.noMousey(event);}, false);
			}
		else if(window.attachEvent){
			this.box.attachEvent("onmousemove", function(event){self.mousey(event)});
			this.box.attachEvent("onmouseout", function(){self.noMousey(event);})
			}
			
	//options---
	if(this.option.fade){
		var fadeboxLeft = document.createElement('div');
			fadeboxLeft.setAttribute('style', 'display:block;position: absolute;height: 100%;width: 130px;left:0;top:0;z-index:100;background: url(img/slider-gradient-left.png) repeat-y top left');
		var fadeboxRight = document.createElement('div');
			fadeboxRight.setAttribute('style', 'display:block;position: absolute;height: 100%;width: 130px;right:0;top:0;z-index:100;background: url(img/slider-gradient-right.png) repeat-y top right;');
		this.box.appendChild(fadeboxLeft);
		this.box.appendChild(fadeboxRight);
		}
		
	}//close logrot constructor
	
	
	
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
|| window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
