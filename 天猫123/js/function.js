/*
* @Author: Administrator
* @Date:   2017-08-14 09:26:58
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-17 09:00:53
*/
/*获取元素，返回
添加window.onload
$(select[,ranger])
参数：
	select 字符串->选择器 #box .box div
			函数->window.onload
	ranger 范围
1.判断首字符
	# ->document.getElementById
	. ->document.getElementByClassName
	符合标签
2.return

*/
function $(select,ranger=document){
	if(typeof select=='string'){
		/*if(ranger == undefined){
			ranger==document;
		}
		ranger=ranger?ranger:document;
		ranger=ranger || document;*/
		let selector=select.trim();
		let firstChar=selector.charAt();
		if(firstChar=='#'){
			return document.getElementById(selector.substring(1));
		}else if(firstChar=='.'){
			return ranger.getElementsByClassName(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
		//正则表达式 第一位a-z或者A-Z,第二位a-z或者A-Z或者1-6，第二位最少出现0次，最多8次
			return ranger.getElementsByTagName(selector);
		}
	}else if(typeof select=='function'){
		window.onload=function(){
			select();
		}
	}
}
/*html()获取或设置元素内容
*/
function html(element,content){
	if(arguments.length==2){
		element.innerHTML=content;
	}else if(arguments.length==1){
		return element.innerHTML;
	}
}
/*text()获取或设置元素内容*/
function text(element,content){
	if(arguments.length==2){
		element.innerText=content;
	}else if(arguments.length==1){
		return element.innerText;
	}
}
/*设置样式
	css(element,yangshi)
*/
function css(element,attrObj){
	for(let i in attrObj){
		element.style[i]=attrObj[i];
	}
}
/*添加事件 集合，事件，事件函数
on(collection,type,fn)
 */
function on(collection,type,fn){
	for(let i=0;i<collection.length;i++){
			collection[i][type]=fn;
	}
}
function off(collection,type){
	for(let i=0;i<collection.length;i++){
		collection[i][type]=null;
	}
}
/*animate*/
function animate(element,attrObj,speed,fn){
	let t=setInterval(function(){
		for(let i in attrObj){
			let start=parseInt(getComputedStyle(element,null)[i]);
			if(start>=attrObj[i]){
				clearInterval(t);
				if(fn){					
					fn();
				}
			}
			element.style[i]=`${start+speed}px`;
		}
	},60);
}
/*
insertAfter()
在一个元素后面插入一个元素
 */
HTMLElement.prototype.insertAfter=function(insert){
	let next=this.nextElementSibling;
	let parent=this.parentNode;
	if(next){
		parent.insertBefore(insert,next);
	}else{
		parent.appendChild(insert);
	}
}
/*prependChild
在一个元素前面插入一个元素*/
HTMLElement.prototype.prependChild=function(insert){
	let first=this.firstElementSibling;
	if(first){
		this.insertBefore(insert,first);
	}else{
		this.appendChild(insert);
	}
}
/*prependTo
将一个元素插入到另一个元素中*/
HTMLElement.prototype.prependTo=function(parent){
	parent.prependChild(this);
}
/*
appendTo 将子元素插入到父元素的最后
 */
HTMLElement.prototype.appendTo=function(parent){
	parent.appendChild(this);
}
/*
empty  删除里面的子元素
 */
HTMLElement.prototype.empty=function(){
	let child=this.childNodes;//获取其里面的所有节点
	for(let i=child.length-1;i>0;i--){
		this.removeChild(child[i]);
	}
}
HTMLElement.prototype.empty1=function(){
	this.innerHTML='';
	
}
/*
remove删除它本身
 */
HTMLElement.prototype.remove=function(){
	let parent=this.parentNode;
	parent.removeChild(this);
}
/*
next() nextAll() nextUntil()
 */
HTMLElement.prototype.next=function(){
	let next=this.nextElementSibling;
	if(next){
		return next;
	}else{
		return false;
	}
}
HTMLElement.prototype.nextAll=function(){
	let nexte=this.next();
	let newarr=[];
	if(nexte){
		newarr.push(nexte);
	}else{
		return false;
	}
	while(nexte){
		nexte=nexte.next();
		newarr.push(nexte);
	}
	newarr.pop();
	return newarr;
}
/*
nextUntil()获取下面的直到
 */
HTMLElement.prototype.nextUntil=function(length){
	let arr=this.nextAll();
	let newarr=[];
	if(length>arr.length){
		return false;
	}else{
		for(let i=0;i<length;i++){
			newarr.push(arr[i]);
		}
	}
	return newarr;
}
/*
previous 获取上一个元素
 */
HTMLElement.prototype.previous=function(){
	let  pre=this.previousElementSibling;
	if(pre){
		return pre;
	}else{
		return false;
	}
}
/*previousAll
*/
HTMLElement.prototype.previousAll=function(){
	let pre=this.previous();
	let newarr=[];
	if(pre){
		newarr.push(pre);
	}else{
		return false;
	}
	while(pre){
		pre=pre.previous();
		newarr.push(pre);
	}
	newarr.pop();
	return newarr;
}
/*parent*/
HTMLElement.prototype.parent=function(){
	let parent=this.parentNode;
	if(parent){
		parent.empty();
		return parent;
	}
	else{
		return false;
	}
}
/*
parents获取所有的父辈元素
 */
HTMLElement.prototype.parents=function(){
	let parents=this.parentNode;
	let newarr=[];
	if(parents){
		newarr.push(parents);
	}else{
		return false;
	}
	while(parents!=document.body){
		parents=parents.parentNode;
		newarr.push(parents);
	}	
	return newarr;
}
/*parentUntil
*/
HTMLElement.prototype.parentUntil=function(length){
	let arr=this.parents();
	let newarr=[];
	if(length>arr.length){
		return false;
	}else{
		for(let i=0;i<length;i++){
			newarr.push(arr[i]);
		}
	}
	return newarr;
}