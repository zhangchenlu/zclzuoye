/*
* @Author: asus
* @Date:   2017-08-14 09:18:04
* @Last Modified by:   asus
* @Last Modified time: 2017-08-14 16:44:31
*/

'use strict';
function $(select,ranger=document){
	if(typeof select=='string'){
		let selects=select.trim();
		let first=selects.charAt(0);
		if(first=='#'){
			return document.getElementById(selects.substr(1))
		}
		else if(first=='.'){
			return ranger.getElementsByClassName(selects.substr(1))
		}
		else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selects)){
			return ranger.getElementsByTagName(selects)
		}
	}else if(typeof select=='function'){
		window.onload=function(){
			select();
		}
	}
}
function html(element,content){
	if(arguments.length==2){
		element.innerHTML=content;
	}
	if(arguments.length==1){
		return element.innerHTML;
	}
}
function text(element,content){
	if(arguments.length==2){
		element.innerText=content;
	}
	if(arguments.length==1){
		return element.innerText;
	}
}
function css(element,attrobj){
	for(let i in attrobj){
		element.style[i]=attrobj[i];
	}
}
function on(collect,type,fn){
	for(let i=0;i<collect.length;i++){
		collect[i][type]=fn;
	}
}
function off(collect,type){
	for(let i=0;i<collect.length;i++){
		collect[i][type]=null;
	}
}
// function animate(element,attrobj,speed,fn){
// 	let t=setInterval(function(){
// 		for(let i in attrobj){
// 			let start=parseInt(getComputedStyle(element,null)[i]);
// 			if(start>=attrobj[i]){
// 				clearInterval(t);
// 				if(fn){
// 					fn();
// 				}
// 			}
// 			element.style[i]=`${start+speed}px`;
// 		}
// 	},50)
// }