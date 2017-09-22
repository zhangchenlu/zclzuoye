/*
* @Author: asus
* @Date:   2017-08-28 18:10:56
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-29 18:34:05
*/
/*
属性：
	颜色、线宽、端点、边数、角、橡皮尺寸、width height、history、ctx、
	canvas
方法：
	画线、画虚线、铅笔、新建、保存、裁切、多边形、画圆、多角形、橡皮
 */
function Palette(canvas){
	this.canvas=canvas;
	this.ctx=this.canvas.getContext("2d");
	this.history=[];
	this.cw=this.canvas.width;
	this.ch=this.canvas.height;
	this.lineWidth=1;
	this.lineCap='butt';
	this.fillStyle='#266355'
	this.strokeStyle='#266355'
}
Palette.prototype={
	inte:function(){
		this.ctx.setLineDash([0,0]);
	},
	line:function(ox,oy,cx,cy){	
	            this.inte();	    
				this.ctx.lineWidth=this.lineWidth;							
				this.ctx.beginPath();
				this.ctx.moveTo(ox, oy);
				this.ctx.lineTo(cx, cy);
				this.ctx.closePath();
				this.ctx.stroke();
	},
	more:function(ox,oy,cx,cy,num){
		    this.inte()
			let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2))						
			let ang=360/num*Math.PI/180
			this.ctx.beginPath()
			this.ctx.moveTo(ox+r, oy)
			for(let i=1;i<num;i++){
				this.ctx.lineTo(ox+r*Math.cos(ang*i), oy+r*Math.sin(ang*i))
			}
			this.ctx.closePath();
			this.ctx.stroke();	
},
	pen:function(){
			let that=this;
			this.canvas.onmousedown=function(e){
				let ox=e.offsetX,oy=e.offsetY;
				//每次开始画之前不需要清除之前的鼠标按下开始路径
				that.inte();
				that.ctx.beginPath();
				that.ctx.setLineDash([10,0]);
				that.ctx.moveTo(ox,oy);
				that.canvas.onmousemove=function(e){
					let cx=e.offsetX,cy=e.offsetY;//鼠标停止的地方	
					if(that.history.length>0){
						//将上一次画的放在画布中，然后开始下一次画
						that.ctx.putImageData(that.history[that.history.length-1],0,0);
					}	
					that.ctx.lineTo(cx,cy);			
					that.ctx.stroke();//不需要关闭路径
					that.canvas.onmouseup=function(){
						//鼠标抬起之后保存所画的
						that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch  ));
						that.canvas.onmousemove=null;
						that.canvas.onmouseup=null;
						}
					}
				}
				//撤销
			document.onkeydown=function(e){
				if(e.ctrlKey && e.keyCode==90){
					let cexiao=that.history.pop();
					that.ctx.putImageData(cexiao,0,0);
				}
			}
		},
	dash:function(ox,oy,cx,cy){		
               this.ctx.beginPath();
               this.ctx.moveTo(ox,oy);
               this.ctx.setLineDash([10,20]);//画虚线
               this.ctx.lineTo(cx,cy);
               this.ctx.closePath();
               this.ctx.stroke();
               
    },
	wujiao:function(ox,oy,cx,cy,num){
			let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2))
			let ang=360/num/2/Math.PI*180
			this.ctx.beginPath()
			this.ctx.moveTo(ox+r/2, oy)
			for(let i=1;i<num*2;i++){
				this.ctx.lineTo(ox+r*Math.cos(ang*i), oy+r*Math.sin(ang*i))
			}
			for(let i = 1;i<num*2;i++){
					if(i%2){
					this.ctx.lineTo(cx+r*Math.cos(ang*i),cy+r*Math.sin(ang*i))
					}else {
					this.ctx.lineTo(cx+r/2*Math.cos(ang*i),cy+r/2*Math.sin(ang*i))
					}
		    }
			this.ctx.closePath();
			this.ctx.fill();
		
	},
	circle:function(ox,oy,cx,cy){	
	            let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));	
				this.ctx.beginPath();
				this.ctx.arc(ox, oy, r, 0, 2*Math.PI, false)
				this.ctx.closePath();
				this.ctx.fill();		
	},	
	drow:function(type,num){
		   let that=this;
		   this.canvas.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;		
			that.canvas.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;				
				that.ctx.clearRect(0, 0, that.cw, that.ch)
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that[type](ox,oy,cx,cy,num);
 				that.canvas.onmouseup=function(){
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
					that.canvas.onmousemove=null;
					that.canvas.onmouseup=null;
				}
			}
		}
		document.onkeydown=function(e){
			if(e.ctrlKey && e.keyCode==90){
				let datas=that.history.pop();
				that.ctx.putImageData(datas,0,0)
			}
		}
     }



}