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
function _1(_2){
var _3=$.data(_2,"menubutton").options;
var _4=$(_2);
_4.removeClass("m-btn-active m-btn-plain-active");
_4.linkbutton(_3);
if(_3.menu){
$(_3.menu).menu({onShow:function(){
_4.addClass((_3.plain==true)?"m-btn-plain-active":"m-btn-active");
},onHide:function(){
_4.removeClass((_3.plain==true)?"m-btn-plain-active":"m-btn-active");
}});
}
_5(_2,_3.disabled);
};
function _5(_6,_7){
var _8=$.data(_6,"menubutton").options;
_8.disabled=_7;
var _9=$(_6);
if(_7){
_9.linkbutton("disable");
_9.unbind(".menubutton");
}else{
_9.linkbutton("enable");
_9.unbind(".menubutton");
_9.bind("click.menubutton",function(){
_a();
return false;
});
var _b=null;
_9.bind("mouseenter.menubutton",function(){
_b=setTimeout(function(){
_a();
},_8.duration);
return false;
}).bind("mouseleave.menubutton",function(){
if(_b){
clearTimeout(_b);
}
});
}
function _a(){
if(!_8.menu){
return;
}
var _c=_9.offset().left;
if(_c+$(_8.menu).outerWidth()+5>$(window).width()){
_c=$(window).width()-$(_8.menu).outerWidth()-5;
}
$("body>div.menu-top").menu("hide");
$(_8.menu).menu("show",{left:_c,top:_9.offset().top+_9.outerHeight()});
_9.blur();
};
};
$.fn.menubutton=function(_d,_e){
if(typeof _d=="string"){
return $.fn.menubutton.methods[_d](this,_e);
}
_d=_d||{};
return this.each(function(){
var _f=$.data(this,"menubutton");
if(_f){
$.extend(_f.options,_d);
}else{
$(this).append("<span class=\"m-btn-downarrow\">&nbsp;</span>");
$.data(this,"menubutton",{options:$.extend({},$.fn.menubutton.defaults,$.fn.menubutton.parseOptions(this),_d)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.menubutton.methods={options:function(jq){
return $.data(jq[0],"menubutton").options;
},enable:function(jq){
return jq.each(function(){
_5(this,false);
});
},disable:function(jq){
return jq.each(function(){
_5(this,true);
});
}};
$.fn.menubutton.parseOptions=function(_10){
var t=$(_10);
return $.extend({},$.fn.linkbutton.parseOptions(_10),{menu:t.attr("menu"),duration:t.attr("duration")});
};
$.fn.menubutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100});
})(jQuery);

