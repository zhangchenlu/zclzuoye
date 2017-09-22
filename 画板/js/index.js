/*
* @Author: asus
* @Date:   2017-08-28 18:10:56
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-29 18:15:04
*/
window.onload=function(){
	let canvas=document.querySelector('canvas')
	let pale=new Palette(canvas);
	let btn=document.querySelectorAll('.xingzhuang>.iconfont')

	btn.forEach(element=>{
		element.onclick=function(){
            let act=document.querySelector(".xingzhuang>label[active=true]");
            console.dir(act);
            act.setAttribute('active',false);
            element.setAttribute('active',true);            
        
        if(element.id=='pen'){
           pale.pen()
        }
        else if(element.id=='more'||element.id=='wujiao'){
        	let jiao=prompt('请输入')
        	pale.drow(this.id,jiao)
        }
        else{
        	pale.drow(this.id)
        }
     }
	})

}
