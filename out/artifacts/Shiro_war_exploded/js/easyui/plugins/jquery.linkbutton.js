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
var _3=$.data(_2,"linkbutton").options;
$(_2).empty();
$(_2).addClass("l-btn");
if(_3.id){
$(_2).attr("id",_3.id);
}else{
$(_2).removeAttr("id");
}
if(_3.plain){
$(_2).addClass("l-btn-plain");
}else{
$(_2).removeClass("l-btn-plain");
}
if(_3.text){
$(_2).html(_3.text).wrapInner("<span class=\"l-btn-left\">"+"<span class=\"l-btn-text\">"+"</span>"+"</span>");
if(_3.iconCls){
$(_2).find(".l-btn-text").addClass(_3.iconCls).css("padding-left","20px");
}
}else{
$(_2).html("&nbsp;").wrapInner("<span class=\"l-btn-left\">"+"<span class=\"l-btn-text\">"+"<span class=\"l-btn-empty\"></span>"+"</span>"+"</span>");
if(_3.iconCls){
$(_2).find(".l-btn-empty").addClass(_3.iconCls);
}
}
_4(_2,_3.disabled);
};
function _4(_5,_6){
var _7=$.data(_5,"linkbutton");
if(_6){
_7.options.disabled=true;
var _8=$(_5).attr("href");
if(_8){
_7.href=_8;
$(_5).attr("href","javascript:void(0)");
}
var _9=$(_5).attr("onclick");
if(_9){
_7.onclick=_9;
$(_5).attr("onclick","");
}
$(_5).addClass("l-btn-disabled");
}else{
_7.options.disabled=false;
if(_7.href){
$(_5).attr("href",_7.href);
}
if(_7.onclick){
_5.onclick=_7.onclick;
}
$(_5).removeClass("l-btn-disabled");
}
};
$.fn.linkbutton=function(_a,_b){
if(typeof _a=="string"){
return $.fn.linkbutton.methods[_a](this,_b);
}
_a=_a||{};
return this.each(function(){
var _c=$.data(this,"linkbutton");
if(_c){
$.extend(_c.options,_a);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_a)});
$(this).removeAttr("disabled");
}
_1(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},enable:function(jq){
return jq.each(function(){
_4(this,false);
});
},disable:function(jq){
return jq.each(function(){
_4(this,true);
});
}};
$.fn.linkbutton.parseOptions=function(_d){
var t=$(_d);
return {id:t.attr("id"),disabled:(t.attr("disabled")?true:undefined),plain:(t.attr("plain")?t.attr("plain")=="true":undefined),text:$.trim(t.html()),iconCls:(t.attr("icon")||t.attr("iconCls"))};
};
$.fn.linkbutton.defaults={id:null,disabled:false,plain:false,text:"",iconCls:null};
})(jQuery);

