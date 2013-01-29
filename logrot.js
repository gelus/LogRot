//logo Rotator
(function logrot(logrot){
	logrot.create = function(id, option){

		//option defaults
		this.option = (option==undefined)? {}:option;
		this.option.fade = (this.option.fade==undefined)? false:this.option.fade;

		var elm  = document.getElementById(id),
				ul0  = elm.getElementsByTagName('ul')[0],
				ul1  = elm.getElementsByTagName('ul')[1],
				ops  = option,
				self = this,
				id   = "#"+id,
				biggestItemHeight = 0,
				widths = [0, 0],
				uls = elm.getElementsByTagName('ul'),
				speedCalc,

				startTime = Date.now(),
				lastFrame = startTime,
				elapsedTime = 0,
				fps = 40,
				speed = 75,
				defaultSpeed = speed;
		

		ul0.className = "logul0";
		ul1.className = "logul1";

		addCssRule(id+' ul li', 'float: left;margin:0;padding:0;');

		for(var i = 0, len = uls.length; i<len; i++){
			var lis = uls[i].getElementsByTagName('li');
			for(var x = 0, leng = lis.length;x<leng;x++){
				//window.node = lis[x];
				widths[i] += lis[x].offsetWidth;
				console.log(lis[x].offsetHeight, biggestItemHeight, lis[x].id);
				if(lis[x].offsetHeight > biggestItemHeight)biggestItemHeight = lis[x].offsetHeight;
			}
		}
		console.log(biggestItemHeight);


		addCssRule(id, "height: "+biggestItemHeight+"px; overflow: hidden;");
		addCssRule(id+' ul li', "height: "+biggestItemHeight+"px");
		addCssRule(
			id+" ul",
			"position: absolute;height: auto;list-style: none;padding: 0;margin: 0;"
			);
		addCssRule(".logul0", "width: "+widths[0]+"px; left: 0px");
		addCssRule(".logul1", "width: "+widths[1]+"px; left: "+widths[0]+"px");

		if(window.addEventListener){
			elm.addEventListener("mousemove", mouseMoveHandle, false);
			elm.addEventListener("mouseout", mouseOutHandle, false);
		}
		else if(window.attachEvent){
			elm.attachEvent("onmousemove", mouseMoveHandle);
			elm.attachEvent("onmouseout", mouseOutHandle);
		}

		function mouseMoveHandle(e){
			elm.moused = true;
			elm.slowing = false;
			var width = elm.offsetWidth, left = getLeft(elm), right = left+width;
			var XmousePos = e.clientX, XmouseRelPos = (XmousePos - left);
			prec = parseInt(((XmouseRelPos)/width*100)-50);
			speed = Math.ceil(defaultSpeed*(prec/10));

			if(speed >= 0 && speed<40)speed = 40;
			if(speed <0 && speed > -40)speed = -40;
		}

		function mouseOutHandle(e){
			var height = elm.offsetHeight, top = elm.offsetTop-getScrollTop(), bottom = top+height;
			var width = elm.offsetWidth, left = getLeft(elm), right = left+width;
			var Xmousepos = e.clientX, Ymousepos = e.clientY;
		
			if(Xmousepos<left||Xmousepos>right-10||Ymousepos<top+3||Ymousepos>bottom-3){
				elm.moused = false;
				elm.slowing = true;
				speedCalc = speed;
				slowing();
			}
		}

		function slowing(){
			if(speed > defaultSpeed){speedCalc -= 3;}
			else if(speed < defaultSpeed){speedCalc += 3}
			speed = speedCalc;
			if (Math.floor(self.speedCalc) == self.orgspeed)self.box.slowing = false;
			if(elm.moused == false && elm.slowing == true){
				if(speed <= defaultSpeed+2 && speed >= defaultSpeed){
					speed = defaultSpeed;
					return;
				}
				requestFrame(slowing);
			}
		}

		if(this.option.fade){
			addCssRule(id+" .fadeboxLeft", 'display:block;position: absolute;height: 100%;width: 50%;left:-1px;top:0;z-index:100;background: url('+link+'indexSupport/images/slider-gradient-left.png) repeat-y top left');
			addCssRule(id+" .fadeboxRight", 'display:block;position: absolute;height: 100%;width: 50%;right:-1px;top:0;z-index:100;background: url('+link+'indexSupport/images/slider-gradient-right.png) repeat-y top right;');
			var fadeboxLeft = document.createElement('div');
				fadeboxLeft.className = "fadeboxLeft";
			var fadeboxRight = document.createElement('div');
				fadeboxRight.className = "fadeboxRight"
			elm.appendChild(fadeboxLeft);
			elm.appendChild(fadeboxRight);
		}

		function loop(){
			var time = Date.now();
			elapsedTime = time-lastFrame;

			if(time >= lastFrame+(1000/fps)){
				lastFrame = Date.now();
				update();
			}
			requestFrame(loop);
		}

		function update(){
			if(ul0.style.left == "")ul0.style.left = 0+"px";
			if(ul1.style.left == "")ul1.style.left = widths[0]+"px";
			delta = elapsedTime/1000;
			var move = (speed * delta);
			

			ul0.style.left = Math.floor(parseInt(ul0.style.left) - move)+"px";
			ul1.style.left = Math.floor(parseInt(ul1.style.left) - move)+"px";

			rearangeIt();
			
		}

		loop();

		function rearangeIt(){
			if(speed < 0){
				if(parseInt(ul0.style.left)>elm.offsetWidth)ul0.style.left = (parseInt(ul1.style.left)-widths[0])+"px"
				if(parseInt(ul1.style.left)>elm.offsetWidth)ul1.style.left = (parseInt(ul0.style.left)-widths[1])+"px"
				return
			}
			else if(speed > 0){
				if(parseInt(ul0.style.left)<-widths[0])ul0.style.left = (parseInt(ul1.style.left)+widths[1])+"px"
				if(parseInt(ul1.style.left)<-widths[1])ul1.style.left = (parseInt(ul0.style.left)+widths[0])+"px"
				return;
			}
		}
	}// close create logrot
	function getScrollTop(){
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
	function getLeft(elm){
		var parent = elm.offsetParent,
				left = elm.offsetLeft;

		while(parent !== document.body && parent !== document.getElementsByTagName('html')[0]){
			left += parent.offsetLeft;
			parent = parent.offsetParent;
		}
		return left;
	}

	function requestFrame(callback){
		var x = window.requestAnimationFrame       || 
		        window.webkitRequestAnimationFrame || 
		        window.mozRequestAnimationFrame    || 
		        window.oRequestAnimationFrame      || 
		        window.msRequestAnimationFrame     || 
		        function( callback ){
		          window.setTimeout(callback, 1000 / 60);
		        };
		x(callback);
	}
	function addCssRule(selector, rule) {
	  if (document.styleSheets){
	    var head = document.getElementsByTagName('head')[0];
	    head.appendChild(document.createElement('style'));

	    var i = document.styleSheets.length-1;
	    var ss = document.styleSheets[i];

	    var l=0;
	    if (ss.cssRules) {
	      l = ss.cssRules.length;
	    } else if (ss.rules) {
	      // IE
	      l = ss.rules.length;
	    }

	    if (ss.insertRule) {
	      ss.insertRule(selector + ' {' + rule + '}', 0);
	    } else if (ss.addRule) {
	      // IE
	      ss.addRule(selector, rule, l);
	    }
	  }
	};
})(window.logrot = window.logrot||{});
//close logo Rotator