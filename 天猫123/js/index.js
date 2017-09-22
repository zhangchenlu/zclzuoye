$(function(){
	let headRight1=document.getElementsByClassName('taobao1')[0];
	let headRight2=document.getElementsByClassName('taobao2')[0];
	let wode=document.getElementsByClassName('wode2')[0];
	let wode1=document.getElementsByClassName('wode3')[0];
	let shangjia=document.getElementsByClassName('shangjia')[0];	
	let shangSlide=document.getElementsByClassName('shangSlide')[0];
	let wangzhan=document.getElementById('wangzhan');
	let daoHang=document.getElementsByClassName('daoHang')[0];
	console.dir(wode);
	headRight1.onmouseenter=function(){
		wode.style.display='block';
	}
	headRight1.onmouseleave=function(){
		wode.style.display='none';
	}
	headRight2.onmouseenter=function(){		
		wode1.style.display='block';
	}
	headRight2.onmouseleave=function(){
		wode1.style.display='none';
	}
	 shangjia.onmouseenter=function(){
	 	 shangSlide.style.display='block';
	 }
	 shangjia.onmouseleave=function(){
	 	 shangSlide.style.display='none';
	 }
	 wangzhan.onmouseenter=function(){
	 	daoHang.style.display='block';
	 }
	 wangzhan.onmouseleave=function(){
	 	daoHang.style.display='none';
	 }

///////////////////////轮播图//////////////////////////////////
	let banner=document.getElementsByClassName('ban-right')[0];
	// let bannerBox=document.getElementsByClassName('ban-right')[0];
	let bannerBox1=document.getElementsByClassName('bannerBox1');
	let lunbodian=document.getElementsByClassName('lunbodian')[0];
	let yuan1=lunbodian.getElementsByClassName('yuan');
	let num=0;
	for(let i=0;i<yuan1.length;i++){
		yuan1[i].onmouseenter=function(){
			for(let j=0;j<bannerBox1.length;j++){
				bannerBox1[j].style.display='none';
				yuan1[j].style.background='rgba(162,162,162,0.6)';
			}			
			bannerBox1[i].style.display='block';
			yuan1[i].style.background='rgba(255,255,255,0.6)';
			num=i;			
		}
	}
	let t;
	t=setInterval(fn,2000);
	function fn(){
		num++;
	 	if(num==bannerBox1.length){
	 		num=0;
	 	}	 	
	 	for(let i=0;i<yuan1.length;i++){
	 		bannerBox1[i].style.display='none';
	 		yuan1[i].style.background='rgba(162,162,162,0.6)';
	 	}
	 	yuan1[num].style.background=' rgba(255,255,255,0.2)';
	 	bannerBox1[num].style.display='block';
	}

	//鼠标移入停止轮播
	  banner.onmouseenter=function(){
	  	clearInterval(t);
	  }
	   banner.onmouseleave=function(){
	  	t=setInterval(fn,3000);
	  }
	  /////////////////////侧导航/////////////
	  let cedaohang=$('.ban-left')[0];
	  let lis=$('.cdh',cedaohang);
	  for(let i=0;i<lis.length;i++){
	  		lis[i].onmouseenter=function(){
	  			let items=$('.items',lis[i])[0];
	  			items.style.display='block';
	  		}
	  		lis[i].onmouseleave=function(){
	  			let items=$('.items',lis[i])[0];
	  			items.style.display='none';
	  		}
	  }
	    ////上面出来的搜索框///
	  	let souTop=$('.souTop')[0]; 
		let sflag=true;
		let fourBox=document.querySelectorAll('.fashion');
		let shisan=document.querySelector('.box4');
		console.dir(shisan)
		let slide=document.querySelector('.slide');
		let mli=document.querySelectorAll('.mli');
		let dingbu=document.querySelector('.dingbu');
		let pg=window.innerHeight;
		let sg=shisan.offsetTop-100;
		let newarr=[];
		
		
		fourBox.forEach(element=>{
					let lg=element.offsetTop-100;
					newarr.push(lg);
			})
		newarr.push(sg);
	  	window.onscroll=function(){
  		 	let st=document.body.scrollTop;		  			
			  if(st>500){
					if(sflag){				
						sflag=false;
						souTop.style.top='0';
						slide.style.left='10px';					
					}
				}else{
					if(!sflag){
						sflag=true;
						souTop.style.top='-50px';
						slide.style.left='-36px';
					}
				}
				//点击哪个楼层，滚动到哪个楼层
				for(let i=0;i<mli.length;i++){
					mli[i].onclick=function(){
						animate(document.body,{scrollTop:newarr[i]});
						for(let j=0;j<mli.length;j++){
							mli[j].style.background='';
						}
						mli[i].style.background=`${Color(i)}`;
					}
				}
				//滚动到哪个楼层,哪个楼层颜色发生变化
				for(let i=0;i<newarr.length;i++){
					if((document.body.scrollTop+100)>newarr[i] && (document.body.scrollTop+100)<newarr[i+1]){
						mli[i].style.background=`${Color(i)}`;
					}else if((document.body.scrollTop+100)>newarr[newarr.length-1]){
						mli[i].style.background='';
						mli[newarr.length-1].style.background=`${Color(newarr.length-1)}`;
					}
					else{
						mli[i].style.background='';
					}
				}
				
				dingbu.onclick=function(){
					animate(document.body,{scrollTop:0});
				}	
				
				function Color(num){
					let newarr1=[];
					newarr1.push(`#ea5f8d`,`#0aa6e8`,`#64c333`,`#f15453`,`#f7a945`,`#ea5f8d`,`#ff0036`);
					return newarr1[num];
				}		

	  }//滚轮事件括号
	 /////////////////右边固定//////////
	 let guding=$('.guding')[0];
	 let list=$('li',guding);
	 let quan=$('.quan')[0];
	 let jiao=$('.jiao')[0];
	
	 //移入时的显示

	 list[0].onmouseenter=function(){
	 	quan.style.display='block';		 	 	
	 	animate(quan,{right:35},300)	 	
	 }
	 list[0].onmouseleave=function(){
	 	quan.style.display='none';	 	 	
	 	animate(quan,{right:70},300);	 	
	 }
	 for(let i=2;i<list.length-1;i++){
	 	let quan=$('.quan')[i-1];	 	
	 	list[i].onmouseenter=function(){
		 	quan.style.display='block';	 		
		 	animate(quan,{right:35},300)	 	
		 }
		 list[i].onmouseleave=function(){
		 	quan.style.display='none';		 		
		 	animate(quan,{right:70},300);	 	
		 }
	 }
	 let sc=$('.sc')[0];
	 list[8].onmouseenter=function(){
	 		sc.style.display='block';
	 }
	 list[8].onmouseleave=function(){
	 		sc.style.display='none';
	 }
	 list[9].onclick=function(){
	 	animate(document.body,{scrollTop:0});
	 }
	 list[9].onmouseenter=function(){
		 	quan[8].style.display='block';	 		
		 	animate(quan[8],{right:35},300)	 	
	 }
	 list[9].onmouseleave=function(){
		 	quan[8].style.display='none';		 		
		 	animate(quan[8],{right:70},300);	 	
	 }

})
	
	
