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
function _1(_2,_3){
_3=_3||{};
if(_3.onSubmit){
if(_3.onSubmit.call(_2)==false){
return;
}
}
var _4=$(_2);
if(_3.url){
_4.attr("action",_3.url);
}
var _5="easyui_frame_"+(new Date().getTime());
var _6=$("<iframe id="+_5+" name="+_5+"></iframe>").attr("src",window.ActiveXObject?"javascript:false":"about:blank").css({position:"absolute",top:-1000,left:-1000});
var t=_4.attr("target"),a=_4.attr("action");
_4.attr("target",_5);
try{
_6.appendTo("body");
_6.bind("load",cb);
_4[0].submit();
}
finally{
_4.attr("action",a);
t?_4.attr("target",t):_4.removeAttr("target");
}
var _7=10;
function cb(){
_6.unbind();
var _8=$("#"+_5).contents().find("body");
var _9=_8.html();
if(_9==""){
if(--_7){
setTimeout(cb,100);
return;
}
return;
}
var ta=_8.find(">textarea");
if(ta.length){
_9=ta.val();
}else{
var _a=_8.find(">pre");
if(_a.length){
_9=_a.html();
}
}
if(_3.success){
_3.success(_9);
}
setTimeout(function(){
_6.unbind();
_6.remove();
},100);
};
};
function _b(_c,_d){
if(!$.data(_c,"form")){
$.data(_c,"form",{options:$.extend({},$.fn.form.defaults)});
}
var _e=$.data(_c,"form").options;
if(typeof _d=="string"){
var _f={};
if(_e.onBeforeLoad.call(_c,_f)==false){
return;
}
$.ajax({url:_d,data:_f,dataType:"json",success:function(_10){
_11(_10);
},error:function(){
_e.onLoadError.apply(_c,arguments);
}});
}else{
_11(_d);
}
function _11(_12){
var _13=$(_c);
for(var _14 in _12){
var val=_12[_14];
$("input[name="+_14+"]",_13).val(val);
$("textarea[name="+_14+"]",_13).val(val);
$("select[name="+_14+"]",_13).val(val);
var cc=["combo","combobox","combotree","combogrid"];
for(var i=0;i<cc.length;i++){
_15(cc[i],_14,val);
}
}
_e.onLoadSuccess.call(_c,_12);
_1f(_c);
};
function _15(_16,_17,val){
var _18=$(_c);
var c=_18.find("."+_16+"-f[comboName="+_17+"]");
if(c.length&&c[_16]){
if(c[_16]("options").multiple){
c[_16]("setValues",val);
}else{
c[_16]("setValue",val);
}
}
};
};
function _19(_1a){
$("input,select,textarea",_1a).each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
});
if($.fn.combo){
$(".combo-f",_1a).combo("clear");
}
if($.fn.combobox){
$(".combobox-f",_1a).combobox("clear");
}
if($.fn.combotree){
$(".combotree-f",_1a).combotree("clear");
}
if($.fn.combogrid){
$(".combogrid-f",_1a).combogrid("clear");
}
};
function _1b(_1c){
var _1d=$.data(_1c,"form").options;
var _1e=$(_1c);
_1e.unbind(".form").bind("submit.form",function(){
setTimeout(function(){
_1(_1c,_1d);
},0);
return false;
});
};
function _1f(_20){
if($.fn.validatebox){
var box=$(".validatebox-text",_20);
if(box.length){
box.validatebox("validate");
box.trigger("blur");
var _21=$(".validatebox-invalid:first",_20).focus();
return _21.length==0;
}
}
return true;
};
$.fn.form=function(_22,_23){
if(typeof _22=="string"){
return $.fn.form.methods[_22](this,_23);
}
_22=_22||{};
return this.each(function(){
if(!$.data(this,"form")){
$.data(this,"form",{options:$.extend({},$.fn.form.defaults,_22)});
}
_1b(this);
});
};
$.fn.form.methods={submit:function(jq,_24){
return jq.each(function(){
_1(this,$.extend({},$.fn.form.defaults,_24||{}));
});
},load:function(jq,_25){
return jq.each(function(){
_b(this,_25);
});
},clear:function(jq){
return jq.each(function(){
_19(this);
});
},validate:function(jq){
return _1f(jq[0]);
}};
$.fn.form.defaults={url:null,onSubmit:function(){
},success:function(_26){
},onBeforeLoad:function(_27){
},onLoadSuccess:function(_28){
},onLoadError:function(){
}};
})(jQuery);

