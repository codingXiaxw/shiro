/**
 * jQuery EasyUI 1.2.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(e){
var _2=$.data(e.data.target,"draggable").options;
var _3=e.data;
var _4=_3.startLeft+e.pageX-_3.startX;
var _5=_3.startTop+e.pageY-_3.startY;
if(_2.deltaX!=null&&_2.deltaX!=undefined){
_4=e.pageX+_2.deltaX;
}
if(_2.deltaY!=null&&_2.deltaY!=undefined){
_5=e.pageY+_2.deltaY;
}
if(e.data.parnet!=document.body){
if($.boxModel==true){
_4+=$(e.data.parent).scrollLeft();
_5+=$(e.data.parent).scrollTop();
}
}
if(_2.axis=="h"){
_3.left=_4;
}else{
if(_2.axis=="v"){
_3.top=_5;
}else{
_3.left=_4;
_3.top=_5;
}
}
};
function _6(e){
var _7=$.data(e.data.target,"draggable").options;
var _8=$.data(e.data.target,"draggable").proxy;
if(_8){
_8.css("cursor",_7.cursor);
}else{
_8=$(e.data.target);
$.data(e.data.target,"draggable").handle.css("cursor",_7.cursor);
}
_8.css({left:e.data.left,top:e.data.top});
};
function _9(e){
var _a=$.data(e.data.target,"draggable").options;
var _b=$(".droppable").filter(function(){
return e.data.target!=this;
}).filter(function(){
var _c=$.data(this,"droppable").options.accept;
if(_c){
return $(_c).filter(function(){
return this==e.data.target;
}).length>0;
}else{
return true;
}
});
$.data(e.data.target,"draggable").droppables=_b;
var _d=$.data(e.data.target,"draggable").proxy;
if(!_d){
if(_a.proxy){
if(_a.proxy=="clone"){
_d=$(e.data.target).clone().insertAfter(e.data.target);
}else{
_d=_a.proxy.call(e.data.target,e.data.target);
}
$.data(e.data.target,"draggable").proxy=_d;
}else{
_d=$(e.data.target);
}
}
_d.css("position","absolute");
_1(e);
_6(e);
_a.onStartDrag.call(e.data.target,e);
return false;
};
function _e(e){
_1(e);
if($.data(e.data.target,"draggable").options.onDrag.call(e.data.target,e)!=false){
_6(e);
}
var _f=e.data.target;
$.data(e.data.target,"draggable").droppables.each(function(){
var _10=$(this);
var p2=$(this).offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_10.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_10.outerHeight()){
if(!this.entered){
$(this).trigger("_dragenter",[_f]);
this.entered=true;
}
$(this).trigger("_dragover",[_f]);
}else{
if(this.entered){
$(this).trigger("_dragleave",[_f]);
this.entered=false;
}
}
});
return false;
};
function _11(e){
_1(e);
var _12=$.data(e.data.target,"draggable").proxy;
var _13=$.data(e.data.target,"draggable").options;
if(_13.revert){
if(_14()==true){
_15();
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}else{
if(_12){
_12.animate({left:e.data.startLeft,top:e.data.startTop},function(){
_15();
});
}else{
$(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){
$(e.data.target).css("position",e.data.startPosition);
});
}
}
}else{
$(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top});
_15();
_14();
}
_13.onStopDrag.call(e.data.target,e);
function _15(){
if(_12){
_12.remove();
}
$.data(e.data.target,"draggable").proxy=null;
};
function _14(){
var _16=false;
$.data(e.data.target,"draggable").droppables.each(function(){
var _17=$(this);
var p2=$(this).offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_17.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_17.outerHeight()){
if(_13.revert){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}
$(this).trigger("_drop",[e.data.target]);
_16=true;
this.entered=false;
}
});
return _16;
};
$(document).unbind(".draggable");
return false;
};
$.fn.draggable=function(_18,_19){
if(typeof _18=="string"){
return $.fn.draggable.methods[_18](this,_19);
}
return this.each(function(){
var _1a;
var _1b=$.data(this,"draggable");
if(_1b){
_1b.handle.unbind(".draggable");
_1a=$.extend(_1b.options,_18);
}else{
_1a=$.extend({},$.fn.draggable.defaults,_18||{});
}
if(_1a.disabled==true){
$(this).css("cursor","default");
return;
}
var _1c=null;
if(typeof _1a.handle=="undefined"||_1a.handle==null){
_1c=$(this);
}else{
_1c=(typeof _1a.handle=="string"?$(_1a.handle,this):_1c);
}
$.data(this,"draggable",{options:_1a,handle:_1c});
_1c.bind("mousedown.draggable",{target:this},_1d);
_1c.bind("mousemove.draggable",{target:this},_1e);
function _1d(e){
if(_1f(e)==false){
return;
}
var _20=$(e.data.target).position();
var _21={startPosition:$(e.data.target).css("position"),startLeft:_20.left,startTop:_20.top,left:_20.left,top:_20.top,startX:e.pageX,startY:e.pageY,target:e.data.target,parent:$(e.data.target).parent()[0]};
$(document).bind("mousedown.draggable",_21,_9);
$(document).bind("mousemove.draggable",_21,_e);
$(document).bind("mouseup.draggable",_21,_11);
};
function _1e(e){
if(_1f(e)){
$(this).css("cursor",_1a.cursor);
}else{
$(this).css("cursor","default");
}
};
function _1f(e){
var _22=$(_1c).offset();
var _23=$(_1c).outerWidth();
var _24=$(_1c).outerHeight();
var t=e.pageY-_22.top;
var r=_22.left+_23-e.pageX;
var b=_22.top+_24-e.pageY;
var l=e.pageX-_22.left;
return Math.min(t,r,b,l)>_1a.edge;
};
});
};
$.fn.draggable.methods={options:function(jq){
return $.data(jq[0],"draggable").options;
},proxy:function(jq){
return $.data(jq[0],"draggable").proxy;
},enable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:true});
});
}};
$.fn.draggable.defaults={proxy:null,revert:false,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:false,edge:0,axis:null,onStartDrag:function(e){
},onDrag:function(e){
},onStopDrag:function(e){
}};
})(jQuery);

