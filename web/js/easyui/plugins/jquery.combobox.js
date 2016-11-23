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
var _4=$(_2).combo("panel");
var _5=_4.find("div.combobox-item[value="+_3+"]");
if(_5.length){
if(_5.position().top<=0){
var h=_4.scrollTop()+_5.position().top;
_4.scrollTop(h);
}else{
if(_5.position().top+_5.outerHeight()>_4.height()){
var h=_4.scrollTop()+_5.position().top+_5.outerHeight()-_4.height();
_4.scrollTop(h);
}
}
}
};
function _6(_7){
var _8=$(_7).combo("panel");
var _9=$(_7).combo("getValues");
var _a=_8.find("div.combobox-item[value="+_9.pop()+"]");
if(_a.length){
var _b=_a.prev(":visible");
if(_b.length){
_a=_b;
}
}else{
_a=_8.find("div.combobox-item:visible:last");
}
var _c=_a.attr("value");
_d(_7,[_c]);
_1(_7,_c);
};
function _e(_f){
var _10=$(_f).combo("panel");
var _11=$(_f).combo("getValues");
var _12=_10.find("div.combobox-item[value="+_11.pop()+"]");
if(_12.length){
var _13=_12.next(":visible");
if(_13.length){
_12=_13;
}
}else{
_12=_10.find("div.combobox-item:visible:first");
}
var _14=_12.attr("value");
_d(_f,[_14]);
_1(_f,_14);
};
function _15(_16,_17){
var _18=$.data(_16,"combobox").options;
var _19=$.data(_16,"combobox").data;
if(_18.multiple){
var _1a=$(_16).combo("getValues");
for(var i=0;i<_1a.length;i++){
if(_1a[i]==_17){
return;
}
}
_1a.push(_17);
_d(_16,_1a);
}else{
_d(_16,[_17]);
}
for(var i=0;i<_19.length;i++){
if(_19[i][_18.valueField]==_17){
_18.onSelect.call(_16,_19[i]);
return;
}
}
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"combobox").options;
var _1f=$.data(_1c,"combobox").data;
var _20=$(_1c).combo("getValues");
for(var i=0;i<_20.length;i++){
if(_20[i]==_1d){
_20.splice(i,1);
_d(_1c,_20);
break;
}
}
for(var i=0;i<_1f.length;i++){
if(_1f[i][_1e.valueField]==_1d){
_1e.onUnselect.call(_1c,_1f[i]);
return;
}
}
};
function _d(_21,_22,_23){
var _24=$.data(_21,"combobox").options;
var _25=$.data(_21,"combobox").data;
var _26=$(_21).combo("panel");
_26.find("div.combobox-item-selected").removeClass("combobox-item-selected");
var vv=[],ss=[];
for(var i=0;i<_22.length;i++){
var v=_22[i];
var s=v;
for(var j=0;j<_25.length;j++){
if(_25[j][_24.valueField]==v){
s=_25[j][_24.textField];
break;
}
}
vv.push(v);
ss.push(s);
_26.find("div.combobox-item[value="+v+"]").addClass("combobox-item-selected");
}
$(_21).combo("setValues",vv);
if(!_23){
$(_21).combo("setText",ss.join(_24.separator));
}
};
function _27(_28){
var _29=$.data(_28,"combobox").options;
var _2a=[];
$(">option",_28).each(function(){
var _2b={};
_2b[_29.valueField]=$(this).attr("value")||$(this).html();
_2b[_29.textField]=$(this).html();
_2b["selected"]=$(this).attr("selected");
_2a.push(_2b);
});
return _2a;
};
function _2c(_2d,_2e,_2f){
var _30=$.data(_2d,"combobox").options;
var _31=$(_2d).combo("panel");
$.data(_2d,"combobox").data=_2e;
var _32=$(_2d).combobox("getValues");
_31.empty();
for(var i=0;i<_2e.length;i++){
var v=_2e[i][_30.valueField];
var s=_2e[i][_30.textField];
var _33=$("<div class=\"combobox-item\"></div>").appendTo(_31);
_33.attr("value",v);
if(_30.formatter){
_33.html(_30.formatter.call(_2d,_2e[i]));
}else{
_33.html(s);
}
if(_2e[i]["selected"]){
(function(){
for(var i=0;i<_32.length;i++){
if(v==_32[i]){
return;
}
}
_32.push(v);
})();
}
}
if(_30.multiple){
_d(_2d,_32,_2f);
}else{
if(_32.length){
_d(_2d,[_32[_32.length-1]],_2f);
}else{
_d(_2d,[],_2f);
}
}
_30.onLoadSuccess.call(_2d,_2e);
$(".combobox-item",_31).hover(function(){
$(this).addClass("combobox-item-hover");
},function(){
$(this).removeClass("combobox-item-hover");
}).click(function(){
var _34=$(this);
if(_30.multiple){
if(_34.hasClass("combobox-item-selected")){
_1b(_2d,_34.attr("value"));
}else{
_15(_2d,_34.attr("value"));
}
}else{
_15(_2d,_34.attr("value"));
$(_2d).combo("hidePanel");
}
});
};
function _35(_36,url,_37,_38){
var _39=$.data(_36,"combobox").options;
if(url){
_39.url=url;
}
if(!_39.url){
return;
}
_37=_37||{};
$.ajax({url:_39.url,dataType:"json",data:_37,success:function(_3a){
_2c(_36,_3a,_38);
},error:function(){
_39.onLoadError.apply(this,arguments);
}});
};
function _3b(_3c,q){
var _3d=$.data(_3c,"combobox").options;
if(_3d.multiple&&!q){
_d(_3c,[],true);
}else{
_d(_3c,[q],true);
}
if(_3d.mode=="remote"){
_35(_3c,null,{q:q},true);
}else{
var _3e=$(_3c).combo("panel");
_3e.find("div.combobox-item").hide();
var _3f=$.data(_3c,"combobox").data;
for(var i=0;i<_3f.length;i++){
if(_3d.filter.call(_3c,q,_3f[i])){
var v=_3f[i][_3d.valueField];
var s=_3f[i][_3d.textField];
var _40=_3e.find("div.combobox-item[value="+v+"]");
_40.show();
if(s==q){
_d(_3c,[v],true);
_40.addClass("combobox-item-selected");
}
}
}
}
};
function _41(_42){
var _43=$.data(_42,"combobox").options;
$(_42).addClass("combobox-f");
$(_42).combo($.extend({},_43,{onShowPanel:function(){
$(_42).combo("panel").find("div.combobox-item").show();
_1(_42,$(_42).combobox("getValue"));
_43.onShowPanel.call(_42);
}}));
};
$.fn.combobox=function(_44,_45){
if(typeof _44=="string"){
var _46=$.fn.combobox.methods[_44];
if(_46){
return _46(this,_45);
}else{
return this.combo(_44,_45);
}
}
_44=_44||{};
return this.each(function(){
var _47=$.data(this,"combobox");
if(_47){
$.extend(_47.options,_44);
_41(this);
}else{
_47=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_44)});
_41(this);
_2c(this,_27(this));
}
if(_47.options.data){
_2c(this,_47.options.data);
}
_35(this);
});
};
$.fn.combobox.methods={options:function(jq){
return $.data(jq[0],"combobox").options;
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_48){
return jq.each(function(){
_d(this,_48);
});
},setValue:function(jq,_49){
return jq.each(function(){
_d(this,[_49]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combo("clear");
var _4a=$(this).combo("panel");
_4a.find("div.combobox-item-selected").removeClass("combobox-item-selected");
});
},loadData:function(jq,_4b){
return jq.each(function(){
_2c(this,_4b);
});
},reload:function(jq,url){
return jq.each(function(){
_35(this,url);
});
},select:function(jq,_4c){
return jq.each(function(){
_15(this,_4c);
});
},unselect:function(jq,_4d){
return jq.each(function(){
_1b(this,_4d);
});
}};
$.fn.combobox.parseOptions=function(_4e){
var t=$(_4e);
return $.extend({},$.fn.combo.parseOptions(_4e),{valueField:t.attr("valueField"),textField:t.attr("textField"),mode:t.attr("mode"),url:t.attr("url")});
};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",mode:"local",url:null,data:null,keyHandler:{up:function(){
_6(this);
},down:function(){
_e(this);
},enter:function(){
var _4f=$(this).combobox("getValues");
$(this).combobox("setValues",_4f);
$(this).combobox("hidePanel");
},query:function(q){
_3b(this,q);
}},filter:function(q,row){
var _50=$(this).combobox("options");
return row[_50.textField].indexOf(q)==0;
},formatter:function(row){
var _51=$(this).combobox("options");
return row[_51.textField];
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_52){
},onUnselect:function(_53){
}});
})(jQuery);

