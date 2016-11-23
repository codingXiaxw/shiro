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
var _3=$.data(_2,"numberbox").options;
var _4=parseFloat($(_2).val()).toFixed(_3.precision);
if(isNaN(_4)){
$(_2).val("");
return;
}
if(_3.min!=null&&_3.min!=undefined&&_3.min!=""&&_4<_3.min){
$(_2).val(_3.min.toFixed(_3.precision));
}else{
if(_3.max!=null&&_3.max!=undefined&&_3.max!=""&&_4>_3.max){
$(_2).val(_3.max.toFixed(_3.precision));
}else{
$(_2).val(_4);
}
}
};
function _5(_6){
$(_6).unbind(".numberbox");
$(_6).bind("keypress.numberbox",function(e){
if(e.which==45){
return true;
}
if(e.which==46){
return true;
}else{
if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
return true;
}else{
if(e.ctrlKey==true&&(e.which==99||e.which==118)){
return true;
}else{
return false;
}
}
}
}).bind("paste.numberbox",function(){
if(window.clipboardData){
var s=clipboardData.getData("text");
if(!/\D/.test(s)){
return true;
}else{
return false;
}
}else{
return false;
}
}).bind("dragenter.numberbox",function(){
return false;
}).bind("blur.numberbox",function(){
_1(_6);
});
};
function _7(_8){
if($.fn.validatebox){
var _9=$.data(_8,"numberbox").options;
$(_8).validatebox(_9);
}
};
function _a(_b,_c){
var _d=$.data(_b,"numberbox").options;
if(_c){
_d.disabled=true;
$(_b).attr("disabled",true);
}else{
_d.disabled=false;
$(_b).removeAttr("disabled");
}
};
$.fn.numberbox=function(_e,_f){
if(typeof _e=="string"){
var _10=$.fn.numberbox.methods[_e];
if(_10){
return _10(this,_f);
}else{
return this.validatebox(_e,_f);
}
}
_e=_e||{};
return this.each(function(){
var _11=$.data(this,"numberbox");
if(_11){
$.extend(_11.options,_e);
}else{
_11=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_e)});
$(this).removeAttr("disabled");
$(this).css({imeMode:"disabled"});
}
_a(this,_11.options.disabled);
_5(this);
_7(this);
});
};
$.fn.numberbox.methods={disable:function(jq){
return jq.each(function(){
_a(this,true);
});
},enable:function(jq){
return jq.each(function(){
_a(this,false);
});
},fix:function(jq){
return jq.each(function(){
_1(this);
});
}};
$.fn.numberbox.parseOptions=function(_12){
var t=$(_12);
return $.extend({},$.fn.validatebox.parseOptions(_12),{disabled:(t.attr("disabled")?true:undefined),min:(t.attr("min")=="0"?0:parseFloat(t.attr("min"))||undefined),max:(t.attr("max")=="0"?0:parseFloat(t.attr("max"))||undefined),precision:(parseInt(t.attr("precision"))||undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.validatebox.defaults,{disabled:false,min:null,max:null,precision:0});
})(jQuery);

