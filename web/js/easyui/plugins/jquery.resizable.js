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
$.fn.resizable=function(_1,_2){
if(typeof _1=="string"){
return $.fn.resizable.methods[_1](this,_2);
}
function _3(e){
var _4=e.data;
var _5=$.data(_4.target,"resizable").options;
if(_4.dir.indexOf("e")!=-1){
var _6=_4.startWidth+e.pageX-_4.startX;
_6=Math.min(Math.max(_6,_5.minWidth),_5.maxWidth);
_4.width=_6;
}
if(_4.dir.indexOf("s")!=-1){
var _7=_4.startHeight+e.pageY-_4.startY;
_7=Math.min(Math.max(_7,_5.minHeight),_5.maxHeight);
_4.height=_7;
}
if(_4.dir.indexOf("w")!=-1){
_4.width=_4.startWidth-e.pageX+_4.startX;
if(_4.width>=_5.minWidth&&_4.width<=_5.maxWidth){
_4.left=_4.startLeft+e.pageX-_4.startX;
}
}
if(_4.dir.indexOf("n")!=-1){
_4.height=_4.startHeight-e.pageY+_4.startY;
if(_4.height>=_5.minHeight&&_4.height<=_5.maxHeight){
_4.top=_4.startTop+e.pageY-_4.startY;
}
}
};
function _8(e){
var _9=e.data;
var _a=_9.target;
if($.boxModel==true){
$(_a).css({width:_9.width-_9.deltaWidth,height:_9.height-_9.deltaHeight,left:_9.left,top:_9.top});
}else{
$(_a).css({width:_9.width,height:_9.height,left:_9.left,top:_9.top});
}
};
function _b(e){
$.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e);
return false;
};
function _c(e){
_3(e);
if($.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)!=false){
_8(e);
}
return false;
};
function _d(e){
_3(e,true);
_8(e);
$(document).unbind(".resizable");
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
return false;
};
return this.each(function(){
var _e=null;
var _f=$.data(this,"resizable");
if(_f){
$(this).unbind(".resizable");
_e=$.extend(_f.options,_1||{});
}else{
_e=$.extend({},$.fn.resizable.defaults,_1||{});
}
if(_e.disabled==true){
return;
}
$.data(this,"resizable",{options:_e});
var _10=this;
$(this).bind("mousemove.resizable",_11).bind("mousedown.resizable",_12);
function _11(e){
var dir=_13(e);
if(dir==""){
$(_10).css("cursor","default");
}else{
$(_10).css("cursor",dir+"-resize");
}
};
function _12(e){
var dir=_13(e);
if(dir==""){
return;
}
var _14={target:this,dir:dir,startLeft:_15("left"),startTop:_15("top"),left:_15("left"),top:_15("top"),startX:e.pageX,startY:e.pageY,startWidth:$(_10).outerWidth(),startHeight:$(_10).outerHeight(),width:$(_10).outerWidth(),height:$(_10).outerHeight(),deltaWidth:$(_10).outerWidth()-$(_10).width(),deltaHeight:$(_10).outerHeight()-$(_10).height()};
$(document).bind("mousedown.resizable",_14,_b);
$(document).bind("mousemove.resizable",_14,_c);
$(document).bind("mouseup.resizable",_14,_d);
};
function _13(e){
var dir="";
var _16=$(_10).offset();
var _17=$(_10).outerWidth();
var _18=$(_10).outerHeight();
var _19=_e.edge;
if(e.pageY>_16.top&&e.pageY<_16.top+_19){
dir+="n";
}else{
if(e.pageY<_16.top+_18&&e.pageY>_16.top+_18-_19){
dir+="s";
}
}
if(e.pageX>_16.left&&e.pageX<_16.left+_19){
dir+="w";
}else{
if(e.pageX<_16.left+_17&&e.pageX>_16.left+_17-_19){
dir+="e";
}
}
var _1a=_e.handles.split(",");
for(var i=0;i<_1a.length;i++){
var _1b=_1a[i].replace(/(^\s*)|(\s*$)/g,"");
if(_1b=="all"||_1b==dir){
return dir;
}
}
return "";
};
function _15(css){
var val=parseInt($(_10).css(css));
if(isNaN(val)){
return 0;
}else{
return val;
}
};
});
};
$.fn.resizable.methods={};
$.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(e){
},onResize:function(e){
},onStopResize:function(e){
}};
})(jQuery);

