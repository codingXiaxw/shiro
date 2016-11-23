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
var _3=$.data(_2,"accordion").options;
var _4=$.data(_2,"accordion").panels;
var cc=$(_2);
if(_3.fit==true){
var p=cc.parent();
_3.width=p.width();
_3.height=p.height();
}
if(_3.width>0){
cc.width($.boxModel==true?(_3.width-(cc.outerWidth()-cc.width())):_3.width);
}
var _5="auto";
if(_3.height>0){
cc.height($.boxModel==true?(_3.height-(cc.outerHeight()-cc.height())):_3.height);
var _6=_4.length?_4[0].panel("header").css("height",null).outerHeight():"auto";
var _5=cc.height()-(_4.length-1)*_6;
}
for(var i=0;i<_4.length;i++){
var _7=_4[i];
var _8=_7.panel("header");
_8.height($.boxModel==true?(_6-(_8.outerHeight()-_8.height())):_6);
_7.panel("resize",{width:cc.width(),height:_5});
}
};
function _9(_a){
var _b=$.data(_a,"accordion").panels;
for(var i=0;i<_b.length;i++){
var _c=_b[i];
if(_c.panel("options").collapsed==false){
return _c;
}
}
return null;
};
function _d(_e,_f,_10){
var _11=$.data(_e,"accordion").panels;
for(var i=0;i<_11.length;i++){
var _12=_11[i];
if(_12.panel("options").title==_f){
if(_10){
_11.splice(i,1);
}
return _12;
}
}
return null;
};
function _13(_14){
var cc=$(_14);
cc.addClass("accordion");
if(cc.attr("border")=="false"){
cc.addClass("accordion-noborder");
}else{
cc.removeClass("accordion-noborder");
}
if(cc.find(">div[selected=true]").length==0){
cc.find(">div:first").attr("selected","true");
}
var _15=[];
cc.find(">div").each(function(){
var pp=$(this);
_15.push(pp);
_18(_14,pp,{});
});
cc.bind("_resize",function(e,_16){
var _17=$.data(_14,"accordion").options;
if(_17.fit==true||_16){
_1(_14);
}
return false;
});
return {accordion:cc,panels:_15};
};
function _18(_19,pp,_1a){
pp.panel($.extend({},_1a,{collapsible:false,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:pp.attr("selected")!="true",tools:[{iconCls:"accordion-collapse",handler:function(){
var _1b=$.data(_19,"accordion").options.animate;
if(pp.panel("options").collapsed){
pp.panel("expand",_1b);
}else{
pp.panel("collapse",_1b);
}
return false;
}}],onBeforeExpand:function(){
var _1c=_9(_19);
if(_1c){
var _1d=$(_1c).panel("header");
_1d.removeClass("accordion-header-selected");
_1d.find(".accordion-collapse").triggerHandler("click");
}
var _1d=pp.panel("header");
_1d.addClass("accordion-header-selected");
_1d.find("div.accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
var _1e=$.data(_19,"accordion").options;
_1e.onSelect.call(_19,pp.panel("options").title);
},onBeforeCollapse:function(){
var _1f=pp.panel("header");
_1f.removeClass("accordion-header-selected");
_1f.find("div.accordion-collapse").addClass("accordion-expand");
}}));
pp.panel("body").addClass("accordion-body");
pp.panel("header").addClass("accordion-header").click(function(){
$(this).find(".accordion-collapse").triggerHandler("click");
return false;
});
};
function _20(_21,_22){
var _23=$.data(_21,"accordion").options;
var _24=$.data(_21,"accordion").panels;
var _25=_9(_21);
if(_25&&_25.panel("options").title==_22){
return;
}
var _26=_d(_21,_22);
if(_26){
_26.panel("header").triggerHandler("click");
}else{
if(_25){
_25.panel("header").addClass("accordion-header-selected");
_23.onSelect.call(_21,_25.panel("options").title);
}
}
};
function add(_27,_28){
var _29=$.data(_27,"accordion").options;
var _2a=$.data(_27,"accordion").panels;
var pp=$("<div></div>").appendTo(_27);
_2a.push(pp);
_18(_27,pp,_28);
_1(_27);
_29.onAdd.call(_27,_28.title);
_20(_27,_28.title);
};
function _2b(_2c,_2d){
var _2e=$.data(_2c,"accordion").options;
var _2f=$.data(_2c,"accordion").panels;
if(_2e.onBeforeRemove.call(_2c,_2d)==false){
return;
}
var _30=_d(_2c,_2d,true);
if(_30){
_30.panel("destroy");
if(_2f.length){
_1(_2c);
var _31=_9(_2c);
if(!_31){
_20(_2c,_2f[0].panel("options").title);
}
}
}
_2e.onRemove.call(_2c,_2d);
};
$.fn.accordion=function(_32,_33){
if(typeof _32=="string"){
return $.fn.accordion.methods[_32](this,_33);
}
_32=_32||{};
return this.each(function(){
var _34=$.data(this,"accordion");
var _35;
if(_34){
_35=$.extend(_34.options,_32);
_34.opts=_35;
}else{
_35=$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_32);
var r=_13(this);
$.data(this,"accordion",{options:_35,accordion:r.accordion,panels:r.panels});
}
_1(this);
_20(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},getSelected:function(jq){
return _9(jq[0]);
},getPanel:function(jq,_36){
return _d(jq[0],_36);
},select:function(jq,_37){
return jq.each(function(){
_20(this,_37);
});
},add:function(jq,_38){
return jq.each(function(){
add(this,_38);
});
},remove:function(jq,_39){
return jq.each(function(){
_2b(this,_39);
});
}};
$.fn.accordion.parseOptions=function(_3a){
var t=$(_3a);
return {width:(parseInt(_3a.style.width)||undefined),height:(parseInt(_3a.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)};
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,onSelect:function(_3b){
},onAdd:function(_3c){
},onBeforeRemove:function(_3d){
},onRemove:function(_3e){
}};
})(jQuery);

