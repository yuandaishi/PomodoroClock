//使用canvas来搞，效果比较好
;(function(){
	var PomodoroClock=function(a){
		//console.log("hhshs");
		var that=this;
		var con=false;//是否开始渲染
		var breakLenght=false;//breakLenght是否开始
		var sessionMove=undefined;
		var breakMove=undefined;
		this.settings={
			breakLenght:25,//默认打断时间
			sessionLength:25,//默认倒计时时长
			borderColor:"green",//圆的颜色
			breakColor:"pink",//渐变色1，颜色可以更多
			sessionColor:"#8a8000",//渐变色2
			circleR:300,//圆的默认半径
			padding:15,//默认padding
			textBoxH:80,//文字提示框默认高度
			textBoxBottom:15,//文字提示距离圆的距离
			bg:"#333333",//默认背景色
			textBg:"#cccccc"//
		}
		this.settings=this.extend(a,this.settings);
		//console.log(this.settings);
		var breakLenghtP=document.createElement("div");
		breakLenghtP.setAttribute("style","width:"+(this.settings.circleR+this.settings.padding)*2+"px;height:"+((this.settings.circleR+this.settings.padding)*2+this.settings.textBoxH+this.settings.textBoxBottom)+"px;background:"+this.settings.bg);
		breakLenghtP.style.margin="0 auto";
		breakLenghtP.className="container";
		document.body.appendChild(breakLenghtP);
		var textDiv=document.createElement("div");
		textDiv.setAttribute("style","height: "+this.settings.textBoxH+"px;background:"+this.settings.textBg);
		textDiv.className="textBox";
		breakLenghtP.appendChild(textDiv);
		var leftDiv=document.createElement("div");
		leftDiv.setAttribute("style","width:50%;height:"+this.settings.textBoxH+"px;float:left");
		leftDiv.className="leftDiv";
		var rightDiv=document.createElement("div");
		rightDiv.setAttribute("style","width:50%;height:"+this.settings.textBoxH+"px;float:left");
		rightDiv.className="rigthDiv";
		textDiv.appendChild(leftDiv);
		textDiv.appendChild(rightDiv);
		var promptLeft=document.createElement("p");
		promptLeft.innerHTML="BREAK LENGTH";
		promptLeft.setAttribute("style","font-size: 15px;color: white;text-align: center;line-height: 25px;padding: 10px;");
		leftDiv.appendChild(promptLeft);
		var numberLeft=document.createElement("p");
		numberLeft.innerHTML="<a href='javascript:;' class='leftSub' style='padding: 0 15px'>-</a><span class='leftNum' style='color:red;'>"+this.settings.breakLenght+"</span><a href='javascript:;' class='leftAdd' style='padding: 0 15px'>+</a>";
		numberLeft.setAttribute("style","font-size: 25px;color: white;text-align: center;");
		leftDiv.appendChild(numberLeft);
		
		var promptRight=document.createElement("p");
		promptRight.innerHTML="SESSION LENGTH";
		promptRight.setAttribute("style","font-size: 15px;color: white;text-align: center;line-height: 25px;padding: 10px;");
		rightDiv.appendChild(promptRight);
		var numberRight=document.createElement("p");
		numberRight.innerHTML="<a href='javascript:;' class='rightSub' style='padding: 0 15px'>-</a><span class='rightNum' style='color:red;'>"+this.settings.sessionLength+"</span><a href='javascript:;' class='rightAdd' style='padding: 0 15px'>+</a>";
		numberRight.setAttribute("style","font-size: 25px;color: white;text-align: center;");
		rightDiv.appendChild(numberRight);
		
		//控制数字
		document.getElementsByClassName("leftSub")[0].addEventListener("click",
			function(e){//不加这个就直接执行了
				e.stopPropagation();//阻止冒泡，防止document的动作也发生
				con=false;
				that.sub(document.getElementsByClassName("leftNum")[0].innerHTML,1,document.getElementsByClassName("leftNum")[0]);
				breakNum=document.getElementsByClassName("leftNum")[0].innerHTML+":00";
				breakNumC=document.getElementsByClassName("leftNum")[0].innerHTML;
				clearInterval(breakMove);
				clearInterval(sessionMove);
				if(breakLenght){
					ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
					that.write([["Break","60px","green",canvasDom.height/2,canvasDom.height/4],[breakNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
					that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);	
				}
			}
		);
		
		document.getElementsByClassName("leftAdd")[0].addEventListener("click",
			function(e){//不加这个就直接执行了
				e.stopPropagation();//阻止冒泡，防止document的动作也发生
				con=false;
				that.add(document.getElementsByClassName("leftNum")[0].innerHTML,1,document.getElementsByClassName("leftNum")[0]);
				//return false;// 使用原生js方法时，return false只能阻止默认行为，但却不能阻止冒泡
				breakNum=document.getElementsByClassName("leftNum")[0].innerHTML+":00";
				breakNumC=document.getElementsByClassName("leftNum")[0].innerHTML;
				clearInterval(breakMove);
				clearInterval(sessionMove);
				if(breakLenght){
					ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
					that.write([["Break","60px","green",canvasDom.height/2,canvasDom.height/4],[breakNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
					that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);	
				}
			}
		);
		
		document.getElementsByClassName("rightSub")[0].addEventListener("click",
			function(e){//不加这个就直接执行了
				e.stopPropagation();//阻止冒泡，防止document的动作也发生
				con=false;
				that.sub(document.getElementsByClassName("rightNum")[0].innerHTML,1,document.getElementsByClassName("rightNum")[0]);
				sessionNum=document.getElementsByClassName("rightNum")[0].innerHTML+":00";
				sessionNumC=document.getElementsByClassName("rightNum")[0].innerHTML;//用来计算的数
				clearInterval(breakMove);
				clearInterval(sessionMove);
				if(!breakLenght){
					ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
					that.write([["Session","60px","green",canvasDom.height/2,canvasDom.height/4],[sessionNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
					that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);	
				}
			}
		);
		
		document.getElementsByClassName("rightAdd")[0].addEventListener("click",
			function(e){//不加这个就直接执行了
				e.stopPropagation();//阻止冒泡，防止document的动作也发生
				con=false;
				that.add(document.getElementsByClassName("rightNum")[0].innerHTML,1,document.getElementsByClassName("rightNum")[0]);
				sessionNum=document.getElementsByClassName("rightNum")[0].innerHTML+":00";
				sessionNumC=document.getElementsByClassName("rightNum")[0].innerHTML;//用来计算的数
				clearInterval(breakMove);
				clearInterval(sessionMove);
				if(!breakLenght){
					ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
					that.write([["Session","60px","green",canvasDom.height/2,canvasDom.height/4],[sessionNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
					that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);	
				}
			}
		);
		
		//创建canvas标签
		var canvasDom=document.createElement("canvas");
		canvasDom.width=(this.settings.circleR+this.settings.padding)*2;
		canvasDom.height=(this.settings.circleR+this.settings.padding)*2
		canvasDom.style.marginTop=this.settings.textBoxBottom+"px";
		canvasDom.className="clock";
		breakLenghtP.appendChild(canvasDom);

		ctx=canvasDom.getContext("2d");
		that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);
		sessionNum=document.getElementsByClassName("rightNum")[0].innerHTML+":00";//要绘制的数
		breakNum=document.getElementsByClassName("leftNum")[0].innerHTML+":00";
		
		var sessionNumC=document.getElementsByClassName("rightNum")[0].innerHTML;//用来计算的数
		var breakNumC=document.getElementsByClassName("leftNum")[0].innerHTML;
		that.write([["Session","60px","green",canvasDom.height/2,canvasDom.height/4],[sessionNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
		
		document.addEventListener("click",function(){
			if(con){
				con=false;
				var a=clearInterval(sessionMove);
				var b=clearInterval(breakMove);
			}else{
				con=true;
			}
			if(con&&(!breakLenght)){//点击了屏幕，并且breakLenght时间未开始
//				console.log("jsjs");
//				var sessionNum=document.getElementsByClassName("rightNum")[0].innerHTML+":00";//要绘制的数
//				var breakNum=document.getElementsByClassName("leftNum")[0].innerHTML+":00";//要绘制的数
				sessionMove=setInterval(function(){//每隔一秒钟渲染一次
					console.log("jsjs")
					var strNumStart=sessionNum.substring(0,sessionNum.indexOf(":"));
					var strNumEnd=sessionNum.substring(sessionNum.indexOf(":")+1,sessionNum.length);
	//					console.log(strNumStart);
	//					console.log(strNumEnd);
					if(strNumEnd=="00"&&strNumStart!="00"){//01-1=0;
						strNumEnd="59";
						strNumStart-=1;
					}else if(strNumEnd=="00"&&strNumStart=="00"){
						breakLenght=true;//开始breaktime
						clearInterval(sessionMove);
						//立即执行一次
						ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
						that.write([["Break","60px","green",canvasDom.height/2,canvasDom.height/4],[breakNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
						that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);
						breakMove=setInterval(function(){;
							console.log("hehe");
							//console.log(breakNum);
							var breakNumStart=breakNum.substring(0,breakNum.indexOf(":"));
							var breakNumEnd=breakNum.substring(breakNum.indexOf(":")+1,breakNum.length);
							if(breakNumEnd=="00"&&breakNumStart!="00"){
								breakNumEnd="59";
								breakNumStart-=1;
							}else if(breakNumEnd=="00"&&breakNumStart=="00"){
								clearInterval(breakMove);
							}else{
								breakNumEnd-=1;	
							}
							breakNum=that.addSero(breakNumStart)+":"+that.addSero(breakNumEnd);
							ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
							that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);
							var angleEnd=(60-breakNumEnd)/60*Math.PI*2;
							var angleLeave=(breakNumC*60-(breakNumStart*60+parseInt(breakNumEnd)))/(breakNumC*60)*Math.PI*2;
							that.drawArc(canvasDom.width/2,canvasDom.height/2,that.settings.circleR,-Math.PI/2,-Math.PI/2+angleEnd,"gold");
							that.drawCamber(canvasDom.width/2,canvasDom.height/2,that.settings.circleR-10,-Math.PI/2+Math.PI-angleLeave/2,-Math.PI/2+angleLeave/2+Math.PI,that.settings.breakColor);
							that.write([["Break","60px","green",canvasDom.height/2,canvasDom.height/4],[breakNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
						},1000)//不是立即执行，是一秒钟之后才开始第一次
					}else{
						strNumEnd-=1;
					}
					if(!breakLenght){//加这个判断，是为了防止覆盖breakLenght的第一次绘制
						sessionNum=that.addSero(strNumStart)+":"+that.addSero(strNumEnd);
						ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
						that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);
						var angleEnd=(60-strNumEnd)/60*Math.PI*2;
						var angleLeave=(sessionNumC*60-(strNumStart*60+parseInt(strNumEnd)))/(sessionNumC*60)*Math.PI*2;
//						console.log(sessionNumC*60+"||"+(strNumStart*60+parseInt(strNumEnd)));
//						console.log(angleLeave);
						that.drawArc(canvasDom.width/2,canvasDom.height/2,that.settings.circleR,-Math.PI/2,-Math.PI/2+angleEnd,"blue");
						that.drawCamber(canvasDom.width/2,canvasDom.height/2,that.settings.circleR-10,-Math.PI/2+Math.PI-angleLeave/2,-Math.PI/2+angleLeave/2+Math.PI,that.settings.sessionColor);
						that.write([["Session","60px","green",canvasDom.height/2,canvasDom.height/4],[sessionNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
					}
				},1000);
			}else if(con&&breakLenght){
				breakMove=setInterval(function(){
					console.log("hehe1");
					//console.log(breakNum);
					var breakNumStart=breakNum.substring(0,breakNum.indexOf(":"));
					var breakNumEnd=breakNum.substring(breakNum.indexOf(":")+1,breakNum.length);
					if(breakNumEnd=="00"&&breakNumStart!="00"){
						breakNumEnd="59";
						breakNumStart-=1;
					}else if(breakNumEnd=="00"&&breakNumStart=="00"){
						clearInterval(breakMove);
					}else{
						breakNumEnd-=1;	
					}
					breakNum=that.addSero(breakNumStart)+":"+that.addSero(breakNumEnd);
					ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
					that.circle(canvasDom,that.settings.circleR,that.settings.borderColor);
					var angleEnd=(60-breakNumEnd)/60*Math.PI*2;
					var angleLeave=(breakNumC*60-(breakNumStart*60+parseInt(breakNumEnd)))/(breakNumC*60)*Math.PI*2;
					that.drawArc(canvasDom.width/2,canvasDom.height/2,that.settings.circleR,-Math.PI/2,-Math.PI/2+angleEnd,"gold");
					that.drawCamber(canvasDom.width/2,canvasDom.height/2,that.settings.circleR-10,-Math.PI/2+Math.PI-angleLeave/2,-Math.PI/2+angleLeave/2+Math.PI,that.settings.breakColor);
					that.write([["Break","60px","green",canvasDom.height/2,canvasDom.height/4],[breakNum,"70px","green",canvasDom.height/2,canvasDom.height/5*3]]);
				},1000)//不是立即执行，是一秒钟之后才开始第一次
			}
		});
		
		//console.log(breakLenght);
		
	};
	PomodoroClock.prototype={
		extend:function(a,b){
			for(var key in a){
				if(b.hasOwnProperty(key)){//in 操作符会检测原型链上的，但是var in不会列举原型链上的
					b[key]=a[key];
				}
			}
			return b;
		},
		sub:function(a,b,c){//数字减一
//			console.log(a)
//			console.log(b);
			if(a>b){
//				console.log("hshs")
				c.innerHTML=a-b;
			}
		},
		add:function(a,b,c){//数字增加
			c.innerHTML=parseInt(a)+b;	
		},
		circle:function(a,b,c){//画圆
			//ctx=a.getContext("2d");
			ctx.beginPath();
			ctx.arc(a.width/2,a.height/2,b,0,Math.PI*2,false);
			ctx.strokeStyle=c;
			ctx.lineWidth=5;
			ctx.stroke();
		},
		write:function(a){//canvas书写文字,a是一个数组，包含两个元素，每个分别包含字符串,字号，颜色，距离canvas顶部距离
			ctx.font=a[0][1]+" serif";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillStyle=a[0][2];
			ctx.fillText(a[0][0],a[0][3],a[0][4]);
			ctx.font=a[1][1]+" serif";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillStyle=a[1][2];
			ctx.fillText(a[1][0],a[1][3],a[1][4]);
		},
		addSero:function(a){//加0
			//console.log(a.toString().charAt(0))
			if(a<10&&a.toString().charAt(0)!="0"){
				return "0"+a;
			}else if(a==0){
				return "00";
			}else{
				return a;
			}
		},
		drawArc:function(arc_x,arc_y,r,angleStart,angleEnd,color){//绘制圆弧
			ctx.beginPath();
			ctx.arc(arc_x,arc_y,r,angleStart,angleEnd,false);//false顺时针画
			ctx.strokeStyle=color;
			ctx.lineWidth=5;
			ctx.stroke();
		},
		drawCamber:function(arc_x,arc_y,r,angleStart,angleEnd,color){
			ctx.beginPath();
			ctx.arc(arc_x,arc_y,r,angleStart,angleEnd,false);//false顺时针画
			ctx.closePath();
			ctx.fillStyle=color;
			ctx.fill();
		}
	};
	window.PomodoroClock=PomodoroClock;
})()
