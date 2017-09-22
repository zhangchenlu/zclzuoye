/*
* @Author: asus
* @Date:   2017-08-28 18:10:56
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-31 08:54:59
*/
/*
属性：
	颜色、线宽、端点、边数、角、橡皮尺寸、width height、history、ctx、
	canvas
方法：
	画线、画虚线、铅笔、新建、保存、裁切、多边形、画圆、多角形、橡皮
 */
function Palette(canvas,mask){
	this.canvas=canvas;
	this.ctx=this.canvas.getContext("2d");
	this.history=[];
	this.cw=this.canvas.width;
	this.ch=this.canvas.height;
	this.lineWidth=1;
	this.lineCap='butt';
	this.fillStyle='#266355'
	this.strokeStyle='#266355'
	this.mask=mask;
	this.style='stroke';
    this.temp=null;
}
Palette.prototype={
	init:function(){
		this.ctx.lineWidth=this.lineWidth;
		this.ctx.lineCap=this.lineCap;
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.setLineDash([0,0])
	},
	line:function(ox,oy,cx,cy){
		this.ctx.beginPath();
		this.ctx.moveTo(ox, oy);
		this.ctx.lineTo(cx, cy);
		this.ctx.closePath();
		this.ctx.stroke();
	},
	more:function(ox,oy,cx,cy,num){
		let that=this;
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2))
		poly(ox,oy,num,r)
		function poly(x,y,num,r){
			that.ctx.clearRect(0, 0, that.cw, that.ch);
			if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
			let ang=360/num*Math.PI/180
			that.ctx.beginPath()
			that.ctx.moveTo(x+r, y)
			for(let i=1;i<num;i++){
				that.ctx.lineTo(x+r*Math.cos(ang*i), y+r*Math.sin(ang*i))
			}
			that.ctx.closePath();
			that.ctx[that.style]();
		}
	},

	pen:function(){
		let that=this;
		that.init();
		this.ctx.setLineDash([0,0])
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			if(that.history.length>0){
				that.ctx.putImageData(that.history[that.history.length-1],0,0)
			}
			that.ctx.beginPath();
			that.ctx.moveTo(ox, oy)
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				that.ctx.lineTo(cx, cy)
				that.ctx.stroke();
				that.mask.onmouseup=function(){
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
					that.mask.onmousemove=null;
					that.mask.onmouseup=null;
				}
			}
		}
		document.onkeydown=function(e){
			if(e.ctrlKey && e.keyCode==90){
				let datas=that.history.pop();
				that.ctx.putImageData(datas,0,0)

			}
		}
	},
	dash:function(ox,oy,cx,cy){
				this.ctx.beginPath();
				this.ctx.setLineDash([1,5]);
				this.ctx.moveTo(ox, oy);
				this.ctx.lineTo(cx, cy);
				this.ctx.closePath();
				this.ctx.stroke();
	},
	wujiao:function(ox,oy,cx,cy,num){
		let that=this;
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2))
		poly(ox,oy,num,r)
		function poly(x,y,num,r){
			that.ctx.clearRect(0, 0, that.cw, that.ch);
			if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
			let ang=360/(num*2)*Math.PI/180
			let r1=r/2;
			that.ctx.beginPath()
			that.ctx.moveTo(x+r, y)
			for(let i=1;i<(num*2);i++){
				if(i%2){
					that.ctx.lineTo(x+r1*Math.cos(ang*i), y+r1*Math.sin(ang*i))
				}else{
					that.ctx.lineTo(x+r*Math.cos(ang*i), y+r*Math.sin(ang*i))
				}	
			}
			that.ctx.closePath();
			that.ctx[that.style]();
		}
	},
	circle:function(ox,oy,cx,cy){
				let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2))
				this.ctx.beginPath();
				this.ctx.arc(ox, oy, r, 0, 2*Math.PI, false)
				this.ctx.closePath();
				this.ctx[this.style]();
	},
	four:function(ox,oy,cx,cy){
				let x=cx-ox,y=cy-oy;
				this.ctx.strokeRect(ox, oy, x, y)	
	},
	draw:function(type,num){
		let that=this;
		this.mask.onmousedown=function(e){
			that.init();
			let ox=e.offsetX,oy=e.offsetY;
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that[type](ox,oy,cx,cy,num)
				that.mask.onmouseup=function(){
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
					that.mask.onmousemove=null;
					that.mask.onmouseup=null;
				}
			}
		}
		document.onkeydown=function(e){
			if(e.ctrlKey && e.keyCode==90){
				let datas=that.history.pop();
				that.ctx.putImageData(datas,0,0)

			}
		}

	},
	eraser:function(obj,w,h){
		let that=this;
		this.mask.onmousedown=function(){
			obj.style.display='block';
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				let lefts=cx-w/2;
				let tops=cy-h/2;
				if(lefts<=0){
					lefts=0;
				}else if(lefts>=that.w-w){
					lefts=cx-w
				}
				if(tops<=0){
					tops=0;
				}else if(lefts>=that.ch-h){
					tops=cy-h;
				}
				obj.style.left=`${lefts}px`
				obj.style.top=`${tops}px`
				that.ctx.clearRect(lefts, tops, w, h)
				that.mask.onmouseup=function(){
					obj.style.display='none';
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
					that.mask.onmousemove=null;
					that.mask.onmouseup=null;
				}
			}
		}
	},

	font:function(){
		let that=this;
		this.mask.ondblclick=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			let divs=document.createElement('div');
            divs.style.cssText=`
             width:100px;
             height:20px;
             border:1px dashed #999;
             position:absolute;
             left:${ox}px;
             top:${oy}px;
            `
            that.mask.appendChild(divs);
            divs.contentEditable=true;

            that.ctx.textAlign='center';
            that.ctx.textBaseLine='middle';
            let lefts,tops;
            divs.onmousedown=function(e){
                let cxd= e.clientX,cyd=e.clientY;
                let wl=divs.offsetLeft,wt=divs.offsetTop;
                divs.onmousemove=function(e){
                	let cx=e.clientX,cy=e.clientY;
                	lefts=cx-cxd+wl;
                	tops=cy-cyd+wt;
                	if(lefts<=0){
					lefts=0;
					 }
					// else if(lefts>=that.w-w){
					// 	lefts=cx-w
					// }
					if(tops<=0){
						tops=0;
					 }
					// else if(lefts>=that.ch-h){
					// 	tops=cy-h;
					// }
                	divs.style.left=`${lefts}px`;
                	divs.style.top=`${tops}px`;
                }
            }
            divs.onmouseup=function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
            	divs.onmousemove=null;
            	.onmousemove=null;
            	this.onmouseup=null;
            }
            divs.onblur=function(){
            	that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
            	let value=this.innerText;            	
            	that.ctx.fillText(value,lefts,tops);
            	that.mask.removeChild(divs);
            }
            
		}
	},

    clip:function(clipObj){
    	 let that=this;
    	 let minX,minY,w,h;
         this.mask.onmousedown=function(e){
         	let ox=e.offsetX,oy=e.offsetY;         	
         	that.mask.onmousemove=function(e){
                let cx=e.offsetX,cy=e.offsetY;
                w=Math.abs(cx-ox),h=Math.abs(cy-oy);
                minX=cx>ox?ox:cx;
                minY=cy>oy?oy:cy;
                clipObj.style.cssText=`
                  display:block;
                  width:${w}px;height:${h}px;
                  left:${minX}px;
                  top:${minY}px;   
                `
         	}
         }
         this.mask.onmouseup=function(){
         	that.mask.onmousemove=null;
         	that.mask.onmouseup=null;
         	that.temp=that.ctx.getImageData(minX,minY,w,h);
         	that.ctx.clearRect(minX,minY,w,h);
			that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
			that.ctx.putImageData(that.temp,minX,minY);
			that.drag(minX,minY,w,h,clipObj);

         } 
    },
    drag:function(minX,minY,w,h,clipObj){
            let that=this;
            this.mask.onmousemove=function(e){
                let ox=e.offsetX,oy=e.offsetY;
                if(ox>minX&&ox<minX+w&&oy>minY&&oy<minY+h){
                	that.mask.style.cursor='move';
                }else{
                	that.mask.style.cursor='default';
                }
            }
            this.mask.onmousedown=function(e){
            	 let ox=
            }
    }

}