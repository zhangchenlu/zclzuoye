window.onload=function(){
	let song=document.querySelector('.song');
	let singer=document.querySelector('.singer');
	let audio=document.querySelector('audio');
	let pause=document.querySelector('.icon-zanting2');
	let pre=document.querySelector('.pre');
	let next=document.querySelector('.next');
	let list=document.querySelector('.list');
	let img=document.querySelector('.imgtu');
	let bar=document.querySelector('.bar');
	let current=document.querySelector('.start');
	let totall=document.querySelector('.end');
	let like=document.querySelector('.icon-aixin1');
	let name=document.querySelector('.song1');
    let pres=document.querySelector('.pre');
    let nexts=document.querySelector('.next');

	pause.onclick=function(){
		if(audio.paused){
			audio.play();
			pause.classList.add('icon-zanting1');	
			pause.classList.remove('icon-zanting2');
					
		}else{
			audio.pause();
			pause.classList.remove('icon-zanting1');
			pause.classList.add('icon-zanting2');
		}
		// pause.classList.toggle('icon-zanting1');		
	}
  //   audio.onended=function(){
  //   	i++;
  //   	bar.style.width=0;
  //   	if(i>database.length-1){
  //   		i=0;
  //   	}
  //   	if(audio.paused){
		// 	audio.play();
		// 	pause.classList.add('icon-zanting1');	
		// 	pause.classList.remove('icon-zanting2');
		// }
		// render(database[i]);
  //   }
	let i=0;
    pres.onclick=function(){
    	i--;
    	bar.style.width=0;
    	if(i<0){
    		i=database.length-1;
    	}
    	if(audio.paused){
			audio.play();
			pause.classList.add('icon-zanting1');	
			pause.classList.remove('icon-zanting2');
		}
		render(database[i]);
    };
    nexts.onclick=function(){
    	i++;
    	bar.style.width=0;
    	if(i>database.length-1){
    		i=0;
    	}
    	if(audio.paused){
			audio.play();
			pause.classList.add('icon-zanting1');	
			pause.classList.remove('icon-zanting2');
		}else{
			audio.pause();
			pause.classList.remove('icon-zanting1');
			pause.classList.add('icon-zanting2');
		}
		render(database[i]);
    }
	

	audio.ontimeupdate=function(){
		let bili=audio.currentTime/audio.duration;
		bar.style.width=`${bili*100}%`;
		let ct=Time(audio.currentTime)
		current.innerText=ct;

		database[i].lyrics.forEach((element,index)=>{
			if(element.time == ct){
				list.innerHTML='';
				let a=index;

				if(index<3){
					index=0;
				}
				if(index>=3){
					index-=3;//正在播放的index大于3，从index-3开始显示
				}
				for(let j=index;j<database[i].lyrics.length;j++){
					list.innerHTML+=`<li class=list${j}>${database[i].lyrics[j].lyric}</li>`;
				}
				 let obj=document.querySelector(`.list${a}`);
				 obj.style.color='#759c9c';
				 obj.style.fontSize='25px'
				 
			}
		})
	 }
	render(database[i]);
	function render(data){
		song.innerText=data.songs;
		singer.innerText=data.name;
		audio.src=data.src;
		name.innerText=data.songs+'-'+data.name;
		img.src=data.photo;
		current.innerText='00:00';
		totall.innerText=data.alltime;

		list.innerHTML='';
		for(let i=0;i<data.lyrics.length;i++){
			list.innerHTML+=`
				<li>${data.lyrics[i].lyric}</li>
			`;
		}
	}
	/////时间
	function Time(date){
		let minute=Math.floor(date/60)>=10 ? Math.floor(date/60) : `0${Math.floor(date/60)}`;
		let second=Math.floor(date%60)>=10 ? Math.floor(date%60):`0${Math.floor(date%60)}`;
		return `${minute}:${second}`;
	}

	let flag=true;
	like.onclick=function(){
		if(flag){
			like.style.color='red';
			flag=false;
		}else{
			like.style.color='';
            flag=true;
		}
	}
}