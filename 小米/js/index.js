/*
* @Author: Administrator
* @Date:   2017-08-11 10:58:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-21 11:15:26
*/

'use strict';


window.onload=function(){

      //购物车
      let head=document.getElementsByClassName('gouwuche');
      let menu=document.getElementsByClassName('cart-menu');
      head[0].onmouseover=function(){
        menu[0].style.height='100px'
      }
      head[0].onmouseout=function(){
        menu[0].style.height=0;
      }
      
      // input框
      let search=document.getElementById('search');
      let navright=document.getElementsByClassName('nav-right');
      let xiaomi=document.getElementsByClassName('kuang1');
      let zhineng=document.getElementsByClassName('kuang2');
      let sousuo=document.getElementsByClassName('soushuo');
      let searchmenu=document.getElementsByClassName('search-menu');
      search.onfocus=function(){
        xiaomi[0].classList.add('none');
        zhineng[0].classList.add('none');
        navright[0].style.borderColor='#ff6700';
        sousuo[0].style.borderLeftColor='#ff6700'; 
        searchmenu[0].className='search-menu block';
        }
      search.onblur=function(){
        xiaomi[0].classList.remove('none');
        zhineng[0].classList.remove('none');
        navright[0].style.borderColor='#e0e0e0'
        sousuo[0].style.borderLeftColor='#e0e0e0'; 
        searchmenu[0].className='search-menu none';
      }


      // 轮播图
      let banner=document.getElementsByClassName('banner-right')
      let btn=document.getElementsByClassName('btn');
      let yuan=document.getElementsByClassName('yuan');
      let left=document.getElementsByClassName('zhezhao1')[0];
      let right=document.getElementsByClassName('zhezhao2')[0];
      let num=0;
      let t;
      let flag=true;
      t=setInterval(fn,3000);
      right.onclick=function(){
        if(flag){
          flag=false;
          num++;
        if(num == yuan.length){
          num=0;
        }
        for(let i=0;i<yuan.length;i++){
          btn[i].style.display='none';
          yuan[i].style.background=''
        }
        btn[num].style.display='block';
        yuan[num].style.background='#fff';
        flag=true;
        }
      }
      left.onclick=function(){
        if(flag){
          flag=false;
          fn1();
        }
      }

      banner[0].onmouseenter=function(){
        clearInterval(t)
      }
      banner[0].onmouseleave=function(){
        t=setInterval(fn,3000)
      }

      function fn(){
        num++;
        if(num == yuan.length){
          num=0;
        }
        for(let i=0;i<yuan.length;i++){
          btn[i].style.display='none';
          yuan[i].style.background=''
        }
        btn[num].style.display='block';
        yuan[num].style.background='#fff';
        flag=true;
      }

      function fn1(){
        num--;
        if(num <0){
          num= yuan.length-1;
        }
        for(let i=0;i<yuan.length;i++){
          btn[i].style.display='none';
          yuan[i].style.background=''
        }
        btn[num].style.display='block';
        yuan[num].style.background='#fff';
        flag=true;
      }
     
     for(let i=0;i<yuan.length;i++){
        yuan[i].onclick=function(){
             btn[num].style.display='none';
             yuan[num].style.background='';
             btn[i].style.display='block';
             yuan[i].style.background='#fff';
             num=i;
        }
     }
      // 侧导航
      let asides=document.getElementsByClassName('cdh');
      let cdh=document.getElementsByClassName('asides');
      for(let i=0;i<10;i++){
                asides[0].onmouseover=function(){
                 cdh[0].style.width='744px';
                }
                asides[0].onmouseout=function(){
                 cdh[0].style.width=0;
                }
                asides[1].onmouseover=function(){
                 cdh[1].style.width='496px';
                }
                asides[1].onmouseout=function(){
                 cdh[1].style.width=0;
                }
                asides[2].onmouseover=function(){
                 cdh[2].style.width='992px';
                }
                asides[2].onmouseout=function(){
                 cdh[2].style.width=0;
                }
                asides[3].onmouseover=function(){
                 cdh[3].style.width='992px';
                }
                asides[3].onmouseout=function(){
                 cdh[3].style.width=0;
                }
                asides[4].onmouseover=function(){
                 cdh[4].style.width='496px';
                }
                asides[4].onmouseout=function(){
                 cdh[4].style.width=0;
                }
                asides[5].onmouseover=function(){
                  cdh[5].style.width='992px';
                }
                asides[5].onmouseout=function(){
                  cdh[5].style.width=0;
                }
                asides[6].onmouseover=function(){
                  cdh[6].style.width='248px';
                }
                asides[6].onmouseout=function(){
                  cdh[6].style.width=0;
                }
                asides[7].onmouseover=function(){
                  cdh[7].style.width='248px';
                }
                asides[7].onmouseout=function(){
                  cdh[7].style.width=0;
                }
                asides[8].onmouseover=function(){
                  cdh[8].style.width='248px';
                }
                asides[8].onmouseout=function(){
                  cdh[8].style.width=0;
                }
                asides[9].onmouseover=function(){
                  cdh[9].style.width='248px';
                }
                asides[9].onmouseout=function(){
                  cdh[9].style.width=0;
                }
      }
      // 菜单
      let nav1=document.getElementsByClassName('nav1');
      let nav=document.getElementsByClassName('nav');
      let nav2=document.getElementById('nav');
      for(let i=0;i<7;i++){
          nav1[i].onmouseenter=function(){
             nav[i].style.height='200px';
             nav[i].style.borderTop='1px solid #999'
         }  
      
          nav1[i].onmouseleave=function(){       
             nav[i].style.height=0;
              nav[i].style.borderTop='none';
        }  
      }
// 小米明星单品
      // 
      let erzuo=document.getElementsByClassName('erzuo');
      let qianjin=document.getElementsByClassName('qianjin');
      let houtui=document.getElementsByClassName('houtui');
      let now=0,next=0;
      let widths=erzuo[0].offsetWidth;
      qianjin[0].onclick=function(){
        if(now==1){
          return;
        }
        next++;
        erzuo[next].style.left=`${widths}px`;
        erzuo[now].style.left=`${-widths}px`;
        erzuo[next].style.left=0; 
        now=next;    
       }
      houtui[0].onclick=function(){
        if(now==0){
          return;
        }
        next--;
        erzuo[next].style.left=`${-widths}px`;
        erzuo[now].style.left=`${widths}px`;
        erzuo[next].style.left=0; 
        now=next;
      }

     // 智能硬件
     // 
     let dapeione=$('.zhineng')[0];
      let mainone=$('.disan')[0];
      let dapeitwo=$('.zhineng')[1];
      let maintwo=$('.disan')[1];
      let dapeithree=$('.zhineng')[2];
      let mainthree=$('.disan')[2];
      let dapeifour=$('.zhineng')[3];
      let mainfour=$('.disan')[3];
      remen(dapeione,mainone);
      remen(dapeithree,mainthree);
      remen(dapeitwo,maintwo);
      remen(dapeifour,mainfour);
     function remen(zhineng,disan){
         let a=$('.classa',zhineng)
         let qiehuan=$('.san2',disan)
        for(let i=0;i<a.length;i++){
          a[i].onmouseover=function(){
            for(let j=0;j<qiehuan.length;j++){
              qiehuan[j].style.display='none';
              a[j].style.color='#424242'
              a[j].style.borderColor='white'
            }
            qiehuan[i].style.display='block';
            a[i].style.color='#ff6700'
            a[i].style.borderColor='#ff6700'
          }
        }
     }

      // 为你推荐
      let qiqi1=document.getElementsByClassName('qiqi');
      let now1=0,next1=0;
      let width1=qiqi1[0].offsetWidth;
      console.dir(qianjin1)
      qianjin[1].onclick=function(){
        if(now1==3){
          return;
        }
        next1++;
        qiqi1[next1].style.left=`${width1}px`;
        qiqi1[now1].style.left=`${-width1}px`;
        qiqi1[next1].style.left=0; 
        now1=next1;
        console.dir(now1)
       }

      houtui[1].onclick=function(){
        if(now1==0){
          return;
        }
        next1--;
        qiqi1[next1].style.left=`${-width1}px`;
        qiqi1[now1].style.left=`${width1}px`;
        qiqi1[next1].style.left=0; 
        now1=next1;
      }



    //内容
  let nr= $('.neirong1')[0];
  let lunbo= $('.lunbo')[0];
  let nr1= $('.neirong1')[1];
  let lunbo1= $('.lunbo')[1];
  let nr2= $('.neirong1')[2];
  let lunbo2= $('.lunbo')[2];
  let nr3= $('.neirong1')[3];
  let lunbo3= $('.lunbo')[3];
  book(nr,lunbo)
  book(nr1,lunbo1)
  book(nr2,lunbo2)
  book(nr3,lunbo3)
  function book(nr,lunbo){
    let book= $('.bigbook',nr);
    let clef= $('.corleft',nr)[0];
    let crig= $('.corright',nr)[0];
    let cir= $('.circle',lunbo);
    let now=0;
    let next=0;
    for(let i=0;i<cir.length;i++){
      cir[i].onclick=function(){
        if(now==i){
          return;
        }
        if(now<i){
          cir[now].classList.remove('circle1')
          cir[i].classList.add('circle1')
          book[i].style.left='296px';
          book[now].style.left='-296px';
          book[i].style.left=0;
        }
        if(now>i){
          cir[now].classList.remove('circle1')
          cir[i].classList.add('circle1')
          book[i].style.left='-296px';
          book[now].style.left='296px';
          book[i].style.left=0;
        }
        now=next=i
      }
    }
    crig.onclick=function(){
      
      if(next==2){
        return;
      }
      next++;

      cir[now].classList.remove('circle1')
      cir[next].classList.add('circle1')
      book[next].style.left='296px';
      book[now].style.left='-296px';
      book[next].style.left=0;
      now=next;
    }
    clef.onclick=function(){
      if(next==0){
        return;
      }
      next--;
      cir[now].classList.remove('circle1')
      cir[next].classList.add('circle1')
      book[next].style.left='-296px';
      book[now].style.left='296px';
      book[next].style.left=0;
      now=next;
    }
  }


}











      

