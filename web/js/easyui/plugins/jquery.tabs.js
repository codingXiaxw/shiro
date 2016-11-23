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
var _3=$(">div.tabs-header",_2);
var _4=0;
$("ul.tabs li",_3).each(function(){
_4+=$(this).outerWidth(true);
});
var _5=$("div.tabs-wrap",_3).width();
var _6=parseInt($("ul.tabs",_3).css("padding-left"));
return _4-_5+_6;
};
function _7(_8){
var _9=$.data(_8,"tabs").options;
var _a=$(_8).children("div.tabs-header");
var _b=_a.children("div.tabs-tool");
var _c=_a.children("div.tabs-scroller-left");
var _d=_a.children("div.tabs-scroller-right");
var _e=_a.children("div.tabs-wrap");
var _f=($.boxModel==true?(_a.outerHeight()-(_b.outerHeight()-_b.height())):_a.outerHeight());
if(_9.plain){
_f-=2;
}
_b.height(_f);
var _10=0;
$("ul.tabs li",_a).each(function(){
_10+=$(this).outerWidth(true);
});
var _11=_a.width()-_b.outerWidth();
if(_10>_11){
_c.show();
_d.show();
_b.css("right",_d.outerWidth());
_e.css({marginLeft:_c.outerWidth(),marginRight:_d.outerWidth()+_b.outerWidth(),left:0,width:_11-_c.outerWidth()-_d.outerWidth()});
}else{
_c.hide();
_d.hide();
_b.css("right",0);
_e.css({marginLeft:0,marginRight:_b.outerWidth(),left:0,width:_11});
_e.scrollLeft(0);
}
};
function _12(_13){
var _14=$.data(_13,"tabs").options;
var _15=$(_13).children("div.tabs-header");
var _16=_15.children("div.tabs-tool");
_16.remove();
if(_14.tools){
_16=$("<div class=\"tabs-tool\"></div>").appendTo(_15);
for(var i=0;i<_14.tools.length;i++){
var _17=$("<a href=\"javascript:void(0);\"></a>").appendTo(_16);
_17[0].onclick=eval(_14.tools[i].handler||function(){
});
_17.linkbutton($.extend({},_14.tools[i],{plain:true}));
}
}
};
function _18(_19){
var _1a=$.data(_19,"tabs").options;
var cc=$(_19);
if(_1a.fit==true){
var p=cc.parent();
_1a.width=p.width();
_1a.height=p.height();
}
cc.width(_1a.width).height(_1a.height);
var _1b=$(">div.tabs-header",_19);
if($.boxModel==true){
_1b.width(_1a.width-(_1b.outerWidth()-_1b.width()));
}else{
_1b.width(_1a.width);
}
_7(_19);
var _1c=$(">div.tabs-panels",_19);
var _1d=_1a.height;
if(!isNaN(_1d)){
if($.boxModel==true){
var _1e=_1c.outerHeight()-_1c.height();
_1c.css("height",(_1d-_1b.outerHeight()-_1e)||"auto");
}else{
_1c.css("height",_1d-_1b.outerHeight());
}
}else{
_1c.height("auto");
}
var _1f=_1a.width;
if(!isNaN(_1f)){
if($.boxModel==true){
_1c.width(_1f-(_1c.outerWidth()-_1c.width()));
}else{
_1c.width(_1f);
}
}else{
_1c.width("auto");
}
};
function _20(_21){
var _22=$.data(_21,"tabs").options;
var tab=_23(_21);
if(tab){
var _24=$(_21).find(">div.tabs-panels");
var _25=_22.width=="auto"?"auto":_24.width();
var _26=_22.height=="auto"?"auto":_24.height();
tab.panel("resize",{width:_25,height:_26});
}
};
function _27(_28){
var cc=$(_28);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_28);
var _29=[];
var _2a=$(">div.tabs-header",_28);
$(">div.tabs-panels>div",_28).each(function(){
var pp=$(this);
_29.push(pp);
_38(_28,pp);
});
$(".tabs-scroller-left, .tabs-scroller-right",_2a).hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_2b){
var _2c=$.data(_28,"tabs").options;
if(_2c.fit==true||_2b){
_18(_28);
_20(_28);
}
return false;
});
return _29;
};
function _2d(_2e){
var _2f=$.data(_2e,"tabs").options;
var _30=$(">div.tabs-header",_2e);
var _31=$(">div.tabs-panels",_2e);
if(_2f.plain==true){
_30.addClass("tabs-header-plain");
}else{
_30.removeClass("tabs-header-plain");
}
if(_2f.border==true){
_30.removeClass("tabs-header-noborder");
_31.removeClass("tabs-panels-noborder");
}else{
_30.addClass("tabs-header-noborder");
_31.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_30).unbind(".tabs").bind("click.tabs",function(){
var _32=$(".tabs-wrap",_30);
var pos=_32.scrollLeft()-_2f.scrollIncrement;
_32.animate({scrollLeft:pos},_2f.scrollDuration);
});
$(".tabs-scroller-right",_30).unbind(".tabs").bind("click.tabs",function(){
var _33=$(".tabs-wrap",_30);
var pos=Math.min(_33.scrollLeft()+_2f.scrollIncrement,_1(_2e));
_33.animate({scrollLeft:pos},_2f.scrollDuration);
});
var _34=$.data(_2e,"tabs").tabs;
for(var i=0,len=_34.length;i<len;i++){
var _35=_34[i];
var tab=_35.panel("options").tab;
var _36=_35.panel("options").title;
tab.unbind(".tabs").bind("click.tabs",{title:_36},function(e){
_46(_2e,e.data.title);
}).bind("contextmenu.tabs",{title:_36},function(e){
_2f.onContextMenu.call(_2e,e,e.data.title);
});
tab.find("a.tabs-close").unbind(".tabs").bind("click.tabs",{title:_36},function(e){
_37(_2e,e.data.title);
return false;
});
}
};
function _38(_39,pp,_3a){
_3a=_3a||{};
pp.panel($.extend({},{selected:pp.attr("selected")=="true"},_3a,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_3a.icon?_3a.icon:undefined),onLoad:function(){
$.data(_39,"tabs").options.onLoad.call(_39,pp);
}}));
var _3b=pp.panel("options");
var _3c=$(">div.tabs-header",_39);
var _3d=$("ul.tabs",_3c);
var tab=$("<li></li>").appendTo(_3d);
var _3e=$("<a href=\"javascript:void(0)\" class=\"tabs-inner\"></a>").appendTo(tab);
var _3f=$("<span class=\"tabs-title\"></span>").html(_3b.title).appendTo(_3e);
var _40=$("<span class=\"tabs-icon\"></span>").appendTo(_3e);
if(_3b.closable){
_3f.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}
if(_3b.iconCls){
_3f.addClass("tabs-with-icon");
_40.addClass(_3b.iconCls);
}
_3b.tab=tab;
};
function _41(_42,_43){
var _44=$.data(_42,"tabs").options;
var _45=$.data(_42,"tabs").tabs;
var pp=$("<div></div>").appendTo($(">div.tabs-panels",_42));
_45.push(pp);
_38(_42,pp,_43);
_44.onAdd.call(_42,_43.title);
_7(_42);
_2d(_42);
_46(_42,_43.title);
};
function _47(_48,_49){
var _4a=$.data(_48,"tabs").selectHis;
var pp=_49.tab;
var _4b=pp.panel("options").title;
pp.panel($.extend({},_49.options,{iconCls:(_49.options.icon?_49.options.icon:undefined)}));
var _4c=pp.panel("options");
var tab=_4c.tab;
tab.find("span.tabs-icon").attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
tab.find("span.tabs-title").html(_4c.title);
if(_4c.closable){
tab.find("span.tabs-title").addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
tab.find("span.tabs-title").removeClass("tabs-closable");
}
if(_4c.iconCls){
tab.find("span.tabs-title").addClass("tabs-with-icon");
tab.find("span.tabs-icon").addClass(_4c.iconCls);
}else{
tab.find("span.tabs-title").removeClass("tabs-with-icon");
}
if(_4b!=_4c.title){
for(var i=0;i<_4a.length;i++){
if(_4a[i]==_4b){
_4a[i]=_4c.title;
}
}
}
_2d(_48);
$.data(_48,"tabs").options.onUpdate.call(_48,_4c.title);
};
function _37(_4d,_4e){
var _4f=$.data(_4d,"tabs").options;
var _50=$.data(_4d,"tabs").tabs;
var _51=$.data(_4d,"tabs").selectHis;
if(!_52(_4d,_4e)){
return;
}
if(_4f.onBeforeClose.call(_4d,_4e)==false){
return;
}
var tab=_53(_4d,_4e,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_4f.onClose.call(_4d,_4e);
_7(_4d);
for(var i=0;i<_51.length;i++){
if(_51[i]==_4e){
_51.splice(i,1);
i--;
}
}
var _54=_51.pop();
if(_54){
_46(_4d,_54);
}else{
if(_50.length){
_46(_4d,_50[0].panel("options").title);
}
}
};
function _53(_55,_56,_57){
var _58=$.data(_55,"tabs").tabs;
for(var i=0;i<_58.length;i++){
var tab=_58[i];
if(tab.panel("options").title==_56){
if(_57){
_58.splice(i,1);
}
return tab;
}
}
return null;
};
function _23(_59){
var _5a=$.data(_59,"tabs").tabs;
for(var i=0;i<_5a.length;i++){
var tab=_5a[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _5b(_5c){
var _5d=$.data(_5c,"tabs").tabs;
for(var i=0;i<_5d.length;i++){
var tab=_5d[i];
if(tab.panel("options").selected){
_46(_5c,tab.panel("options").title);
return;
}
}
if(_5d.length){
_46(_5c,_5d[0].panel("options").title);
}
};
function _46(_5e,_5f){
var _60=$.data(_5e,"tabs").options;
var _61=$.data(_5e,"tabs").tabs;
var _62=$.data(_5e,"tabs").selectHis;
if(_61.length==0){
return;
}
var _63=_53(_5e,_5f);
if(!_63){
return;
}
var _64=_23(_5e);
if(_64){
_64.panel("close");
_64.panel("options").tab.removeClass("tabs-selected");
}
_63.panel("open");
var tab=_63.panel("options").tab;
tab.addClass("tabs-selected");
var _65=$(_5e).find(">div.tabs-header div.tabs-wrap");
var _66=tab.position().left+_65.scrollLeft();
var _67=_66-_65.scrollLeft();
var _68=_67+tab.outerWidth();
if(_67<0||_68>_65.innerWidth()){
var pos=Math.min(_66-(_65.width()-tab.width())/2,_1(_5e));
_65.animate({scrollLeft:pos},_60.scrollDuration);
}else{
var pos=Math.min(_65.scrollLeft(),_1(_5e));
_65.animate({scrollLeft:pos},_60.scrollDuration);
}
_20(_5e);
_62.push(_5f);
_60.onSelect.call(_5e,_5f);
};
function _52(_69,_6a){
return _53(_69,_6a)!=null;
};
$.fn.tabs=function(_6b,_6c){
if(typeof _6b=="string"){
return $.fn.tabs.methods[_6b](this,_6c);
}
_6b=_6b||{};
return this.each(function(){
var _6d=$.data(this,"tabs");
var _6e;
if(_6d){
_6e=$.extend(_6d.options,_6b);
_6d.options=_6e;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_6b),tabs:_27(this),selectHis:[]});
}
_12(this);
_2d(this);
_18(this);
var _6f=this;
setTimeout(function(){
_5b(_6f);
},0);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_18(this);
_20(this);
});
},add:function(jq,_70){
return jq.each(function(){
_41(this,_70);
});
},close:function(jq,_71){
return jq.each(function(){
_37(this,_71);
});
},getTab:function(jq,_72){
return _53(jq[0],_72);
},getSelected:function(jq){
return _23(jq[0]);
},select:function(jq,_73){
return jq.each(function(){
_46(this,_73);
});
},exists:function(jq,_74){
return _52(jq[0],_74);
},update:function(jq,_75){
return jq.each(function(){
_47(this,_75);
});
}};
$.fn.tabs.parseOptions=function(_76){
var t=$(_76);
return {width:(parseInt(_76.style.width)||undefined),height:(parseInt(_76.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),plain:(t.attr("plain")?t.attr("plain")=="true":undefined)};
};
$.fn.tabs.defaults={width:"auto",height:"auto",plain:false,fit:false,border:true,tools:null,scrollIncrement:100,scrollDuration:400,onLoad:function(_77){
},onSelect:function(_78){
},onBeforeClose:function(_79){
},onClose:function(_7a){
},onAdd:function(_7b){
},onUpdate:function(_7c){
},onContextMenu:function(e,_7d){
}};
})(jQuery);

