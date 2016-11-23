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
$(_2).appendTo("body");
$(_2).addClass("menu-top");
var _3=[];
_4($(_2));
var _5=null;
for(var i=0;i<_3.length;i++){
var _6=_3[i];
_7(_6);
_6.children("div.menu-item").each(function(){
_10(_2,$(this));
});
_6.bind("mouseenter",function(){
if(_5){
clearTimeout(_5);
_5=null;
}
}).bind("mouseleave",function(){
_5=setTimeout(function(){
_18(_2);
},100);
});
}
function _4(_8){
_3.push(_8);
_8.find(">div").each(function(){
var _9=$(this);
var _a=_9.find(">div");
if(_a.length){
_a.insertAfter(_2);
_9[0].submenu=_a;
_4(_a);
}
});
};
function _7(_b){
_b.addClass("menu").find(">div").each(function(){
var _c=$(this);
if(_c.hasClass("menu-sep")){
_c.html("&nbsp;");
}else{
var _d=_c.addClass("menu-item").html();
_c.empty().append($("<div class=\"menu-text\"></div>").html(_d));
var _e=_c.attr("iconCls")||_c.attr("icon");
if(_e){
$("<div class=\"menu-icon\"></div>").addClass(_e).appendTo(_c);
}
if(_c[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_c);
}
if($.boxModel==true){
var _f=_c.height();
_c.height(_f-(_c.outerHeight()-_c.height()));
}
}
});
_b.hide();
};
};
function _10(_11,_12){
_12.click(function(){
if(!this.submenu){
_18(_11);
var _13=$(this).attr("href");
if(_13){
location.href=_13;
}
}
var _14=$(_11).menu("getItem",this);
$.data(_11,"menu").options.onClick.call(_11,_14);
});
_12.hover(function(){
_12.siblings().each(function(){
if(this.submenu){
_1b(this.submenu);
}
$(this).removeClass("menu-active");
});
_12.addClass("menu-active");
var _15=_12[0].submenu;
if(_15){
var _16=_12.offset().left+_12.outerWidth()-2;
if(_16+_15.outerWidth()>$(window).width()){
_16=_12.offset().left-_15.outerWidth()+2;
}
_1f(_15,{left:_16,top:_12.offset().top-3});
}
},function(e){
_12.removeClass("menu-active");
var _17=_12[0].submenu;
if(_17){
if(e.pageX>=parseInt(_17.css("left"))){
_12.addClass("menu-active");
}else{
_1b(_17);
}
}else{
_12.removeClass("menu-active");
}
});
_12.unbind(".menu").bind("mousedown.menu",function(){
return false;
});
};
function _18(_19){
var _1a=$.data(_19,"menu").options;
_1b($(_19));
$(document).unbind(".menu");
_1a.onHide.call(_19);
return false;
};
function _1c(_1d,pos){
var _1e=$.data(_1d,"menu").options;
if(pos){
_1e.left=pos.left;
_1e.top=pos.top;
}
_1f($(_1d),{left:_1e.left,top:_1e.top},function(){
$(document).unbind(".menu").bind("mousedown.menu",function(){
_18(_1d);
$(document).unbind(".menu");
return false;
});
_1e.onShow.call(_1d);
});
};
function _1f(_20,pos,_21){
if(!_20){
return;
}
if(pos){
_20.css(pos);
}
_20.show(0,function(){
if(!_20[0].shadow){
_20[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_20);
}
_20[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:_20.css("left"),top:_20.css("top"),width:_20.outerWidth(),height:_20.outerHeight()});
_20.css("z-index",$.fn.menu.defaults.zIndex++);
if(_21){
_21();
}
});
};
function _1b(_22){
if(!_22){
return;
}
_23(_22);
_22.find("div.menu-item").each(function(){
if(this.submenu){
_1b(this.submenu);
}
$(this).removeClass("menu-active");
});
function _23(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _24(_25,_26){
var _27=null;
var tmp=$("<div></div>");
function _28(_29){
_29.children("div.menu-item").each(function(){
var _2a=$(_25).menu("getItem",this);
var s=tmp.empty().html(_2a.text).text();
if(_26==$.trim(s)){
_27=_2a;
}else{
if(this.submenu&&!_27){
_28(this.submenu);
}
}
});
};
_28($(_25));
tmp.remove();
return _27;
};
function _2b(_2c,_2d){
var _2e=$(_2c);
if(_2d.parent){
_2e=_2d.parent.submenu;
}
var _2f=$("<div class=\"menu-item\"></div>").appendTo(_2e);
$("<div class=\"menu-text\"></div>").html(_2d.text).appendTo(_2f);
if(_2d.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_2d.iconCls).appendTo(_2f);
}
if(_2d.id){
_2f.attr("id",_2d.id);
}
if(_2d.href){
_2f.attr("href",_2d.href);
}
if(_2d.onclick){
_2f.attr("onclick",_2d.onclick);
}
_10(_2c,_2f);
};
function _30(_31,_32){
function _33(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_33(this);
});
var _34=el.submenu[0].shadow;
if(_34){
_34.remove();
}
el.submenu.remove();
}
$(el).remove();
};
_33(_32);
};
function _35(_36){
$(_36).children("div.menu-item").each(function(){
_30(_36,this);
});
if(_36.shadow){
_36.shadow.remove();
}
$(_36).remove();
};
$.fn.menu=function(_37,_38){
if(typeof _37=="string"){
return $.fn.menu.methods[_37](this,_38);
}
_37=_37||{};
return this.each(function(){
var _39=$.data(this,"menu");
if(_39){
$.extend(_39.options,_37);
}else{
_39=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,_37)});
_1(this);
}
$(this).css({left:_39.options.left,top:_39.options.top});
});
};
$.fn.menu.methods={show:function(jq,pos){
return jq.each(function(){
_1c(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_18(this);
});
},destroy:function(jq){
return jq.each(function(){
_35(this);
});
},setText:function(jq,_3a){
return jq.each(function(){
$(_3a.target).children("div.menu-text").html(_3a.text);
});
},setIcon:function(jq,_3b){
return jq.each(function(){
var _3c=$(this).menu("getItem",_3b.target);
if(_3c.iconCls){
$(_3c.target).children("div.menu-icon").removeClass(_3c.iconCls).addClass(_3b.iconCls);
}else{
$("<div class=\"menu-icon\"></div>").addClass(_3b.iconCls).appendTo(_3b.target);
}
});
},getItem:function(jq,_3d){
var _3e={target:_3d,id:$(_3d).attr("id"),text:$.trim($(_3d).children("div.menu-text").html()),href:$(_3d).attr("href"),onclick:$(_3d).attr("onclick")};
var _3f=$(_3d).children("div.menu-icon");
if(_3f.length){
var cc=[];
var aa=_3f.attr("class").split(" ");
for(var i=0;i<aa.length;i++){
if(aa[i]!="menu-icon"){
cc.push(aa[i]);
}
}
_3e.iconCls=cc.join(" ");
}
return _3e;
},findItem:function(jq,_40){
return _24(jq[0],_40);
},appendItem:function(jq,_41){
return jq.each(function(){
_2b(this,_41);
});
},removeItem:function(jq,_42){
return jq.each(function(){
_30(this,_42);
});
}};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,onShow:function(){
},onHide:function(){
},onClick:function(_43){
}};
})(jQuery);

