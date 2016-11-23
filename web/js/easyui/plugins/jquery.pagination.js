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
var _3=$.data(_2,"pagination").options;
var _4=$(_2).addClass("pagination").empty();
var t=$("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>").appendTo(_4);
var tr=$("tr",t);
if(_3.showPageList){
var ps=$("<select class=\"pagination-page-list\"></select>");
for(var i=0;i<_3.pageList.length;i++){
$("<option></option>").text(_3.pageList[i]).attr("selected",_3.pageList[i]==_3.pageSize?"selected":"").appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
_3.pageSize=parseInt(ps.val());
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}
$("<td><a href=\"javascript:void(0)\" icon=\"pagination-first\"></a></td>").appendTo(tr);
$("<td><a href=\"javascript:void(0)\" icon=\"pagination-prev\"></a></td>").appendTo(tr);
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
$("<span style=\"padding-left:6px;\"></span>").html(_3.beforePageText).wrap("<td></td>").parent().appendTo(tr);
$("<td><input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\"></td>").appendTo(tr);
$("<span style=\"padding-right:6px;\"></span>").wrap("<td></td>").parent().appendTo(tr);
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
$("<td><a href=\"javascript:void(0)\" icon=\"pagination-next\"></a></td>").appendTo(tr);
$("<td><a href=\"javascript:void(0)\" icon=\"pagination-last\"></a></td>").appendTo(tr);
if(_3.showRefresh){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
$("<td><a href=\"javascript:void(0)\" icon=\"pagination-load\"></a></td>").appendTo(tr);
}
if(_3.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
for(var i=0;i<_3.buttons.length;i++){
var _5=_3.buttons[i];
if(_5=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
$("<a href=\"javascript:void(0)\"></a>").addClass("l-btn").css("float","left").text(_5.text||"").attr("icon",_5.iconCls||"").bind("click",eval(_5.handler||function(){
})).appendTo(td).linkbutton({plain:true});
}
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_4);
$("<div style=\"clear:both;\"></div>").appendTo(_4);
$("a[icon^=pagination]",_4).linkbutton({plain:true});
_4.find("a[icon=pagination-first]").unbind(".pagination").bind("click.pagination",function(){
if(_3.pageNumber>1){
_a(_2,1);
}
});
_4.find("a[icon=pagination-prev]").unbind(".pagination").bind("click.pagination",function(){
if(_3.pageNumber>1){
_a(_2,_3.pageNumber-1);
}
});
_4.find("a[icon=pagination-next]").unbind(".pagination").bind("click.pagination",function(){
var _6=Math.ceil(_3.total/_3.pageSize);
if(_3.pageNumber<_6){
_a(_2,_3.pageNumber+1);
}
});
_4.find("a[icon=pagination-last]").unbind(".pagination").bind("click.pagination",function(){
var _7=Math.ceil(_3.total/_3.pageSize);
if(_3.pageNumber<_7){
_a(_2,_7);
}
});
_4.find("a[icon=pagination-load]").unbind(".pagination").bind("click.pagination",function(){
if(_3.onBeforeRefresh.call(_2,_3.pageNumber,_3.pageSize)!=false){
_a(_2,_3.pageNumber);
_3.onRefresh.call(_2,_3.pageNumber,_3.pageSize);
}
});
_4.find("input.pagination-num").unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _8=parseInt($(this).val())||1;
_a(_2,_8);
}
});
_4.find(".pagination-page-list").unbind(".pagination").bind("change.pagination",function(){
_3.pageSize=$(this).val();
_3.onChangePageSize.call(_2,_3.pageSize);
var _9=Math.ceil(_3.total/_3.pageSize);
_a(_2,_3.pageNumber);
});
};
function _a(_b,_c){
var _d=$.data(_b,"pagination").options;
var _e=Math.ceil(_d.total/_d.pageSize)||1;
var _f=_c;
if(_c<1){
_f=1;
}
if(_c>_e){
_f=_e;
}
_d.onSelectPage.call(_b,_f,_d.pageSize);
_d.pageNumber=_f;
_10(_b);
};
function _10(_11){
var _12=$.data(_11,"pagination").options;
var _13=Math.ceil(_12.total/_12.pageSize)||1;
var num=$(_11).find("input.pagination-num");
num.val(_12.pageNumber);
num.parent().next().find("span").html(_12.afterPageText.replace(/{pages}/,_13));
var _14=_12.displayMsg;
_14=_14.replace(/{from}/,_12.pageSize*(_12.pageNumber-1)+1);
_14=_14.replace(/{to}/,Math.min(_12.pageSize*(_12.pageNumber),_12.total));
_14=_14.replace(/{total}/,_12.total);
$(_11).find(".pagination-info").html(_14);
$("a[icon=pagination-first],a[icon=pagination-prev]",_11).linkbutton({disabled:(_12.pageNumber==1)});
$("a[icon=pagination-next],a[icon=pagination-last]",_11).linkbutton({disabled:(_12.pageNumber==_13)});
if(_12.loading){
$(_11).find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
}else{
$(_11).find("a[icon=pagination-load]").find(".pagination-load").removeClass("pagination-loading");
}
};
function _15(_16,_17){
var _18=$.data(_16,"pagination").options;
_18.loading=_17;
if(_18.loading){
$(_16).find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
}else{
$(_16).find("a[icon=pagination-load]").find(".pagination-load").removeClass("pagination-loading");
}
};
$.fn.pagination=function(_19,_1a){
if(typeof _19=="string"){
return $.fn.pagination.methods[_19](this,_1a);
}
_19=_19||{};
return this.each(function(){
var _1b;
var _1c=$.data(this,"pagination");
if(_1c){
_1b=$.extend(_1c.options,_19);
}else{
_1b=$.extend({},$.fn.pagination.defaults,_19);
$.data(this,"pagination",{options:_1b});
}
_1(this);
_10(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_15(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_15(this,false);
});
}};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,onSelectPage:function(_1d,_1e){
},onBeforeRefresh:function(_1f,_20){
},onRefresh:function(_21,_22){
},onChangePageSize:function(_23){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items"};
})(jQuery);

