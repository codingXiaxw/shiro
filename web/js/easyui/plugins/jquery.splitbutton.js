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
var _3=$.data(_2,"splitbutton").options;
var _4=$(_2);
_4.removeClass("s-btn-active s-btn-plain-active");
_4.linkbutton(_3);
if(_3.menu){
$(_3.menu).menu({onShow:function(){
_4.addClass((_3.plain==true)?"s-btn-plain-active":"s-btn-active");
},onHide:function(){
_4.removeClass((_3.plain==true)?"s-btn-plain-active":"s-btn-active");
}});
}
_5(_2,_3.disabled);
};
function _5(_6,_7){
var _8=$.data(_6,"splitbutton").options;
_8.disabled=_7;
var _9=$(_6);
var _a=_9.find(".s-btn-downarrow");
if(_7){
_9.linkbutton("disable");
_a.unbind(".splitbutton");
}else{
_9.linkbutton("enable");
_a.unbind(".splitbutton");
_a.bind("click.splitbutton",function(){
_b();
return false;
});
var _c=null;
_a.bind("mouseenter.splitbutton",function(){
_c=setTimeout(function(){
_b();
},_8.duration);
return false;
}).bind("mouseleave.splitbutton",function(){
if(_c){
clearTimeout(_c);
}
});
}
function _b(){
if(!_8.menu){
return;
}
var _d=_9.offset().left;
if(_d+$(_8.menu).outerWidth()+5>$(window).width()){
_d=$(window).width()-$(_8.menu).outerWidth()-5;
}
$("body>div.menu-top").menu("hide");
$(_8.menu).menu("show",{left:_d,top:_9.offset().top+_9.outerHeight()});
_9.blur();
};
};
$.fn.splitbutton=function(_e,_f){
if(typeof _e=="string"){
return $.fn.splitbutton.methods[_e](this,_f);
}
_e=_e||{};
return this.each(function(){
var _10=$.data(this,"splitbutton");
if(_10){
$.extend(_10.options,_e);
}else{
$(this).append("<span class=\"s-btn-downarrow\">&nbsp;</span>");
$.data(this,"splitbutton",{options:$.extend({},$.fn.splitbutton.defaults,$.fn.splitbutton.parseOptions(this),_e)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.splitbutton.methods={options:function(jq){
return $.data(jq[0],"splitbutton").options;
},enable:function(jq){
return jq.each(function(){
_5(this,false);
});
},disable:function(jq){
return jq.each(function(){
_5(this,true);
});
}};
$.fn.splitbutton.parseOptions=function(_11){
var t=$(_11);
return $.extend({},$.fn.linkbutton.parseOptions(_11),{menu:t.attr("menu"),duration:t.attr("duration")});
};
$.fn.splitbutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100});
})(jQuery);

